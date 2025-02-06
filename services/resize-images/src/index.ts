import { Hono } from 'hono'
import { HmacSHA256, enc } from 'crypto-js'

const app = new Hono()

// Function to get the signing key
function getSignatureKey(key: string, dateStamp: string, region: string, service: string) {
  const kDate = HmacSHA256(dateStamp, 'AWS4' + key)
  const kRegion = HmacSHA256(region, kDate)
  const kService = HmacSHA256(service, kRegion)
  const kSigning = HmacSHA256('aws4_request', kService)
  return kSigning
}

// Function to Base64 encode a string for Cloudflare Workers
function base64Encode(str: string): string {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  return btoa(String.fromCharCode(...data))
}

// Function to get the presigned URL
function getPresignedUrl(region: string, bucketName: string, expirationTime: number, keyId: string, secret: string) {
  const fileName = `${Date.now()}.jpg`
  const date = new Date()
  const amzDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const dateStamp = amzDate.slice(0, 8)
  const credentialScope = `${dateStamp}/${region}/s3/aws4_request`
  const algorithm = 'AWS4-HMAC-SHA256'
  const host = `${bucketName}.s3.${region}.amazonaws.com`

  const policy = {
    expiration: new Date(Date.now() + expirationTime * 1000).toISOString(),
    conditions: [
      { bucket: bucketName },
      { key: fileName },
      { 'x-amz-algorithm': algorithm },
      { 'x-amz-credential': `${keyId}/${credentialScope}` },
      { 'x-amz-date': amzDate },
      { 'x-amz-expires': expirationTime.toString() },
      ['content-length-range', 0, 10485760] // Max file size 10MB
    ]
  }

  // Base64 encode the policy string
  const policyBase64 = base64Encode(JSON.stringify(policy))

  // Generate the signing key and signature
  const signatureKey = getSignatureKey(secret, dateStamp, region, 's3')
  const signature = HmacSHA256(policyBase64, signatureKey).toString(enc.Hex)

  // Construct the presigned URL
  const presignedUrl = `https://${host}/${fileName}?X-Amz-Algorithm=${algorithm}&X-Amz-Credential=${keyId}/${credentialScope}&X-Amz-Date=${amzDate}&X-Amz-Expires=${expirationTime}&X-Amz-Signature=${signature}&X-Amz-SignedHeaders=host`

  return presignedUrl
}

app.get('/get-presigned-url', async (c) => {
  // Fetch environment variables from Cloudflare Workers bindings
  const AWS_REGION = (c.env as any).AWS_REGION as string
  const AWS_BUCKET_NAME = (c.env as any).AWS_BUCKET_NAME as string
  const AWS_EXPIRATION_TIME = 900 // 15 minutes
  const AWS_KEY_ID = (c.env as any).AWS_KEY_ID as string
  const AWS_SECRET_KEY = (c.env as any).AWS_SECRET_KEY as string

  if (!AWS_REGION || !AWS_BUCKET_NAME || !AWS_KEY_ID || !AWS_SECRET_KEY) {
    return c.json({ error: 'Missing required environment variables' }, 400)
  }

  const url = getPresignedUrl(AWS_REGION, AWS_BUCKET_NAME, AWS_EXPIRATION_TIME, AWS_KEY_ID, AWS_SECRET_KEY)
  return c.json({ url })
})

export default app

import { enc, HmacSHA256 } from "crypto-js"

export class AWSSignatureV4 {
    private keyId: string
    private secretKey: string
    private region: string
    private service: string

    constructor(keyId: string, secretKey: string, region: string, service: string = 's3') {
        this.keyId = keyId
        this.secretKey = secretKey
        this.region = region
        this.service = service
    }

    private base64Encode(str: string): string {
        const encoder = new TextEncoder()
        const data = encoder.encode(str)
        return btoa(String.fromCharCode.apply(null, Array.from(data)));
    }

    private hmacSHA256(key: string | CryptoJS.lib.WordArray, data: string) {
        return HmacSHA256(data, key);
    }

    private getSigningKey(dateStamp: string) {
        const kDate = this.hmacSHA256('AWS4' + this.secretKey, dateStamp)
        const kRegion = this.hmacSHA256(kDate, this.region)
        const kService = this.hmacSHA256(kRegion, this.service)
        const kSigning = this.hmacSHA256(kService, 'aws4_request')
        return kSigning
    }

    generatePreSignedUrl(bucketName: string, fileName: string, expirationTime: number = 900) : {url : string, fields: Record<string, string>} {
        const date = new Date();
        const amzDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        const dateStamp = amzDate.slice(0, 8)
        const credentialScope = `${dateStamp}/${this.region}/${this.service}/aws4_request`
        const algorithm = 'AWS4-HMAC-SHA256'
        const host = `${bucketName}.s3.${this.region}.amazonaws.com`

        const policy = {
            expiration: new Date(Date.now() + expirationTime * 1000).toISOString(),
                conditions: [
                { bucket: bucketName },
                ['starts-with', '$key', fileName],
                { 'x-amz-algorithm': algorithm },
                { 'x-amz-credential': `${this.keyId}/${credentialScope}` },
                { 'x-amz-date': amzDate },
                ['content-length-range', 0, 10 * 1024 * 1024], // 10MB max
            ]
        }

        const policyBase64 = this.base64Encode(JSON.stringify(policy))

        const signingKey = this.getSigningKey(dateStamp)
        const signature = HmacSHA256(policyBase64, signingKey).toString(enc.Hex)

        const fields = {
            'x-amz-algorithm': algorithm,
            'x-amz-credential': `${this.keyId}/${credentialScope}`,
            'x-amx-date': amzDate,
            'x-amz-signature': signature,
            'policy': policyBase64
        }

        const url = `https://${host}`

        return {url, fields}

    }

}
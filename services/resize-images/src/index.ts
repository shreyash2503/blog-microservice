import { Hono } from 'hono'
import { AWSSignatureV4 } from './aws-signature'


const app = new Hono()

app.get('/', c => c.text("Image Resizer online, Upload images to resize and upload"))

app.get('/get-presigned-url', async (c) => {
  try {
    const AWS_REGION = (c.env as any).AWS_REGION as string
    const AWS_BUCKET_NAME = (c.env as any).AWS_BUCKET_NAME as string
    const AWS_KEY_ID = (c.env as any).AWS_KEY_ID as string
    const AWS_SECRET_KEY = (c.env as any).AWS_SECRET_KEY as string

    if (!AWS_REGION || !AWS_BUCKET_NAME || !AWS_KEY_ID || !AWS_SECRET_KEY) {
      return c.json({ error: 'Missing required environment variables' }, 400)
    }

    const fileName = `uploads/${Date.now()}.jpg`

    const awsSigner = new AWSSignatureV4(
      AWS_KEY_ID, 
      AWS_SECRET_KEY, 
      AWS_REGION
    )

    const { url, fields } = awsSigner.generatePreSignedUrl(
      AWS_BUCKET_NAME, 
      fileName
    )

    return c.json({ 
      url, 
      fields,
      fileName 
    })
  } catch (error) {
    console.error('Presigned URL generation error:', error)
    return c.json({ error: 'Failed to generate presigned URL' }, 500)
  }
})

export default app
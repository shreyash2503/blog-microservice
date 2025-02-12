import { Hono } from 'hono'
import { AWSSignatureV4 } from './aws-signature'


const app = new Hono()

app.get('/', c => c.text("Image Resizer online, Upload images to resize and upload"))

app.post('/upload-image', async (c) => {
  try {
    console.log(c)

    const contentType = c.req.header('content-type')
    console.log(contentType)
    if (!contentType?.includes('multipart/form-data')) {
      console.log(contentType)
      return c.json({
        error : "Content should be multipart/form-data"
      }, 400)
    }

    const AWS_REGION = (c.env as any).AWS_REGION as string
    const AWS_BUCKET_NAME = (c.env as any).AWS_BUCKET_NAME as string
    const AWS_KEY_ID = (c.env as any).AWS_KEY_ID as string
    const AWS_SECRET_KEY = (c.env as any).AWS_SECRET_KEY as string

    const body = await c.req.parseBody(); 
    const file = body.file as File;

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
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    })
    formData.append('key', fileName);
    formData.append('file', file, fileName);
    const uploadResponse = await fetch(url, {
      method: "POST",
      body: formData

    })
    if (uploadResponse.status === 204) {
      return c.json({ 
        message : "success",
        fileName
      }, 200);
    } else {
      return c.json({
        message: "failure"
      }, 500)
    }

  } catch (error) {
    console.error('Presigned URL generation error:', error)
    return c.json({ error: 'Failed to generate presigned URL' }, 500)
  }
})

export default app
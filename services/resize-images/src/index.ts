import { Hono } from 'hono'
import { AWSSignatureV4 } from './aws-signature'
import { compressImage } from './utils'
import { cors } from "hono/cors"

const app = new Hono()
app.use(cors())

app.get('/', c => c.text("Image Resizer online, Upload images to resize and upload"))

app.post('/upload-image', async (c) => {
  try {
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
    const AWS_CLOUDFRONT_URL = (c.env as any).AWS_CLOUDFRONT_URL as string

    const body = await c.req.formData()
    const files = body.getAll('file')

    if (files.length > 1) {
      return c.json({
        message: "Multiple files upload not allowewd"
      }, 400)
    }
    const file = files[0] as File

    if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg") {
      return c.json({
        message : "Wrong file type"
      }, 400)
    }

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
    // const compressedImageBuffer = await compressImage(file);
    // const compressedBlob = new Blob([compressedImageBuffer], { type: 'image/jpeg' });
    formData.append('file', file, fileName);
    const uploadResponse = await fetch(url, {
      method: "POST",
      body: formData

    })
    if (uploadResponse.status === 204) {
      return c.json({ 
        message : "success",
        fileName,
        url: AWS_CLOUDFRONT_URL + fileName
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
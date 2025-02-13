
export async function compressImage(image: File) {
    const imageUrl = URL.createObjectURL(image)

    const compressedImageResponse = await fetch(imageUrl, {
        cf : {
            image : {
                quality: 75,
                format: 'jpeg',
                fit: 'scale-down',
                width:  1920,
                height: 1080,
                metadata: 'none',
            }
        }
    })
    if (!compressedImageResponse.ok) {
        throw new Error('Failed to compress image')
    }

    return await compressedImageResponse.arrayBuffer()
}
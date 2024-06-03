import sharp from "sharp"
import fs from "node:fs/promises"

export type SaveImageCommand = {
    image: File | undefined
    folder: string
    oldImageName?: string
    changed?: boolean
}

export const saveImage = async (command : SaveImageCommand): Promise<string> => {

    const { changed, image, folder, oldImageName } = command

    if(!changed) {
        return oldImageName ?? ''
    }

    if(oldImageName) {
        await deleteImage(oldImageName, folder)
    }

    if(image && image.size > 0) {
        const imageName = image.name 
        const buffer = await image.arrayBuffer()

        const filePath = `./public/uploads/${folder}/${imageName}`

        await sharp(buffer, { failOnError: false }).toFile(filePath)
        return encodeURIComponent(imageName)
    }

    return ''
}

const deleteImage = async (fileName: string | null, folder: string): Promise<void> => {
    if(fileName) {
        const filePath = `./public/uploads/${folder}/${fileName}`
        try {
            await fs.access(filePath);
            await fs.rm(filePath)
        } catch (error: any) {
            console.log(error)
        }
    }
}
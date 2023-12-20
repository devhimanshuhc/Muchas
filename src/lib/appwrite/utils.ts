import { ID } from "appwrite"
import { appwriteConfig, storage } from "./config"

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.offersBucket,
            ID.unique(),
            file
        )

        return uploadedFile
    } catch (error) {
        console.log(error)
        return error
    }

}

export async function getFilePreview(fileId: string, width: number, height: number) {
    try {
        const fileUrl = await storage.getFilePreview(
            appwriteConfig.offersBucket,
            fileId,
            width,
            height,
            "top",
            100
        )

        if (!fileUrl) throw Error

        return fileUrl
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.offersBucket, fileId)
        return { status: "ok" }
    } catch (error) {
        console.log(error)
        return error
    }
}
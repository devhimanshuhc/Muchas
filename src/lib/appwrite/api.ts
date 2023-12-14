import { ID, Query } from "appwrite";
import { MerchantAcFormDataTyp, SessionCredsTyp } from "../types";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createMerchantAc(merchant: MerchantAcFormDataTyp) {
    try {
        const newMerchantAc = await account.create(
            ID.unique(),
            merchant.email,
            merchant.password,
            merchant.username
        )

        if (!newMerchantAc) throw Error

        const avatar = avatars.getInitials(merchant.username, 60, 60)

        // lets add merchant to the usersColl
        if (typeof merchant.location === "string") {

            const merchantAc = await databases.createDocument(
                appwriteConfig.dbId,
                appwriteConfig.usersColl,
                ID.unique(),
                {
                    accountId: newMerchantAc.$id,
                    username: newMerchantAc.name,
                    email: newMerchantAc.email,
                    location: [merchant.location],
                    avatar: avatar,
                    phNo: merchant.phNo,
                    isMerchant: true,
                })

            return merchantAc
        }

        const merchantAc = await databases.createDocument(
            appwriteConfig.dbId,
            appwriteConfig.usersColl,
            ID.unique(),
            {
                accountId: newMerchantAc.$id,
                username: newMerchantAc.name,
                email: newMerchantAc.email,
                location: merchant.location,
                avatar: avatar,
                phNo: merchant.phNo,
                isMerchant: true,
            })

        return merchantAc

    } catch (error) {
        console.error(error);
        return error
    }
}

export async function createEmailSession(sessionCreds: SessionCredsTyp) {
    try {
        const session = await account.createEmailSession(sessionCreds.email, sessionCreds.password)
        return session
    } catch (error) {
        console.error(error)
        return error
    }
}

export async function getCurrentUser() {
    try {
        const currentUser = await account.get()
        if (!currentUser) throw Error

        const currentUserDoc = await databases.listDocuments(
            appwriteConfig.dbId,
            appwriteConfig.usersColl,
            [Query.equal("accountId", currentUser.$id)]
        )

        if (!currentUserDoc) throw Error

        return currentUserDoc.documents[0]

    } catch (error) {
        console.error(error)
        return error
    }
}



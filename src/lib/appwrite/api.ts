import { ID, Query } from "appwrite";
import { MerchantAcFormDataTyp, OfferTyp, SessionCredsTyp, OfferTyp4Tsinference } from "../types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { deleteFile, getFilePreview, uploadFile } from "./utils";

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
        return null
    }
}

export async function createEmailSession(sessionCreds: SessionCredsTyp) {
    try {
        const session = await account.createEmailSession(sessionCreds.email, sessionCreds.password)
        return session
    } catch (error) {
        console.error(error)
        return null
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
        return null
    }
}

export async function createOffer(offer: OfferTyp) {

    try {
        const uploadedBanner = await uploadFile(offer.offerBanner[0]) as OfferTyp4Tsinference
        
        if (!uploadedBanner) throw Error

        const offerBannerUrl = await getFilePreview(uploadedBanner.$id, 1000, 1000) as any
        
        if (!offerBannerUrl) {
            await deleteFile(uploadedBanner.$id)
            throw Error
        }

        const offerDoc = await databases.createDocument(
            appwriteConfig.dbId,
            appwriteConfig.offersColl,
            ID.unique(),
            {
                offerCreator: offer.creator,
                offerBanner: offerBannerUrl,
                offerDescription: offer.offerDescription,
                offerBannerID: uploadedBanner.$id,
            },

        )

        console.log(offerDoc)

        if (!offerDoc) {
            await deleteFile(uploadedBanner.$id)
            throw Error
        }

        return offerDoc   
    } catch (error) {
        console.error(error)
        return null
    }

    /* 
     WORKFLOW: 
     ✅ upload the offerBanner from the offer.
     ✅ get the uploaded file preview to be included inside the document thats gon be created raft.
     ✅ create a document in the offersColl and return.
    */
}

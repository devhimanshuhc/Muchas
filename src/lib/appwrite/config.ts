import {
    Client,
    Account,
    Databases,
    Storage,
    Avatars,
} from "appwrite"

export const appwriteConfig = {
    projectEndpoint: import.meta.env.VITE_PROJECT_ENDPOINT,
    projectId: import.meta.env.VITE_PROJECT_ID,
    dbId: import.meta.env.VITE_MUCHAS_DB,
    usersColl: import.meta.env.VITE_USERS_COLL,
    offersColl: import.meta.env.VITE_OFFERS_COLL,
    offersBucket: import.meta.env.VITE_OFFERS_BUCKET,
}

export const client = new Client()
    .setEndpoint(appwriteConfig.projectEndpoint)
    .setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)
export const storage = new Storage(client)

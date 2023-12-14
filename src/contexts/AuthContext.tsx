import { createContext, useState } from "react";
import { getCurrentUser } from "@/lib/appwrite/api";

const initVal = {
    username: "",
    phNo: undefined,
    location: [],
    email: "",
    avatar: "",
    isMerchant: false,
    accountId: ""
}

const initState = {
    user: initVal,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkUserAuth: async () => false as boolean,
}

const authContext = createContext(initState)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(initVal)


    async function checkUserAuth() {

        try {

            // the document will contain props more than the props in initVal. but thats the whole case
            // Ts looks for the subset of the props defined in the assertion.
            const userDoc = await getCurrentUser() as typeof initVal

            if(!userDoc) return false

            setUser({
                username: userDoc.username,
                phNo: userDoc.phNo,
                location: userDoc.location,
                email: userDoc.email,
                avatar: userDoc.avatar,
                isMerchant: userDoc.isMerchant,
                accountId: userDoc.accountId,
            })

        } catch (error) {
            console.error(error)
            return false
        }

    }

    const authDataStore = {
        user: ,
        isLoading: ,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated,
        checkUserAuth,
    }

    return (
        <authContext.Provider value={authDataStore}>
            {children}
        </authContext.Provider >

    )
}

/*  
 NOTE: 
 1. a user state is required. cuz when we update profiles we upload the changes and whatever document is returned we'll put em inside the user state for consumers.
 2. 

*/


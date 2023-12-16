export type MerchantAcFormDataTyp = {
    username: string,
    email: string,
    phNo: number,
    location: string[] | string,
    password: string,
}

export type SessionCredsTyp = {
    email: string,
    password: string,
}

export type GlobalUserAc = {
    username: string,
    phNo?: number,
    email: string,
    avatar: string,
    isMerchant?: boolean,
    accountId: string,
    location: string[],
}
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

//  DEFAULTS:  this is the universal or global type.
// [ Merchant Ac , User Ac ] these're pruned types derieved from this base type.
export type GlobalUserAc = {
    username: string,
    phNo?: number,
    email: string,
    avatar: string,
    isMerchant?: boolean,
    accountId: string,
    location: string[],
}


export type OfferTyp = {
    creator: string,
    offerBanner: string,
    offerDescription: string,
}



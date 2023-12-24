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
    offerBanner: File[],
    offerDescription: string,
}

/* 
 NOTE: 
 this type is just for TSC to infer and let the programmer go.
*/
export type OfferTyp4Tsinference = {
    $id: string,
    creator: string,
    offerBanner: File[],
    offerDescription: string,
}

// this enum reprs the set of transport modes available to reach at a specific destn.
export enum TransportModes {
    scooter = "scooter",
    bicycle = "bicycle",
    taxi = "taxi",
    bus = "bus",
    privateBus = "privateBus",
    car = "car",
    truck = "truck",
    pedestrian = "pedestrian",

}

export type RouteInputTyp = {
    origin: string,
    destination: string,
    transportMode: TransportModes,
}

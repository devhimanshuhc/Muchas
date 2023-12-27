import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MerchantAcFormDataTyp, OfferTyp, RouteInputTyp, SessionCredsTyp } from "../types";
import { createEmailSession, createMerchantAc, createOffer, getCurrentUser } from "../appwrite/api";
import { queryKeys } from "./queryKeys";
import getRoute from "../HERE/api";

export function useCreateMerchantAcMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (merchant: MerchantAcFormDataTyp) => (createMerchantAc(merchant)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.CREATE_MERCHANT_AC],
            })
        }
    })
}

export function useCreateUserSessionMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (sessionCreds: SessionCredsTyp) => (createEmailSession(sessionCreds)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.CREATE_EMAIL_SESSION]
            })
        }
    })
}

export function useGetCurrentUser() {
    return useQuery({
        queryKey: [queryKeys.GET_CURRENT_USER],
        queryFn: getCurrentUser,
    })
}

export function useCreateOffersMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (offer: OfferTyp) => (createOffer(offer)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_OFFERS]
            })
        }
    })

    /*
    WORKFLOW: 
    ✅ we gon create a offer.
    ✅ cuz we've just created a offer, we need to revalidate the query to display the newly created offer in the profile and wherever its used.
    */
}

export function useGetRoute() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (options: RouteInputTyp) => (getRoute(options)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_ROUTE]
            })
        }
    })
}

 

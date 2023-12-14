import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MerchantAcFormDataTyp, SessionCredsTyp } from "../types";
import { createEmailSession, createMerchantAc, getCurrentUser } from "../appwrite/api";
import { queryKeys } from "./queryKeys";

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
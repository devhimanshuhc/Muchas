import { useCreateOffersMutation } from '@/lib/query/queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const offerSchema = z.object({
    offerDescription: z.string().max(1500, { message: "Hey merchant! Keep your offer description under 1500 characters." }),
    offerBanner: z.string().url().min(1, { message: "Merchant, kindly include a banner for the offer." }),
})

type offerFormData = z.infer<typeof offerSchema>

export default function CreateOffer() {

    const form = useForm<offerFormData>({
        resolver: zodResolver(offerSchema),
        defaultValues: {
            offerDescription: "",
            offerBanner: "",
        }
    })

    const {mutateAsync: createOffer, isPending: isCreatingOffer} = useCreateOffersMutation()

    async function handleSubmit(formData: offerFormData) {
        const await createOffer
    }



    return (

        /* 
         TODO: 
         lay down the tsx portion to fill the form to create an offers.
        */

    )

}

/* 
 WORKFLOW: 
  ✅ create a form schema for validation using zod.
  ✅ define your form using useForm hook from react-hook-form.
  lay down your tsx using shad-cn components.
  handle submit using onSubmit in your form defination and put it on appwrite cloud.
*/
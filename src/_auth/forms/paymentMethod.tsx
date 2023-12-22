import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CreditCard } from "lucide-react"
import paypal from "../../../public/assets/icons/paypal.svg"
import amazonPay from "../../../public/assets/icons/amazonpay.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const paymentMethodSchema = z.object({
    paymentMethod: z.enum(["card", "amazonPay", "paypal"]),
    name: z.string().min(2, { message: "name is required." }),
    cardNumber: z.number().max(16, { message: "your card number got to be exactly 16 digits long." }),
    expires: z.string().min(2, { message: "expiry date is required." }),
    year: z.number().min(2, { message: "year is required." }),
    cvc: z.number().min(2, { message: "cvc is required." }),
})

type paymentMethodFormDataTyp = z.infer<typeof paymentMethodSchema>

export default function PaymentMethodsCard() {

    const form = useForm({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            paymentMethod: "card",
            name: "",
            cardNumber: undefined,
            // expires: "",
            // year: undefined,
            // cvc: undefined,
        }
    })

    function onSubmit(formData: paymentMethodFormDataTyp) {
        console.log(formData)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose a payment option first.</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-3 gap-4"
                                >
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="card" id="card" className="sr-only" />
                                        </FormControl>
                                        <Label
                                            htmlFor="card"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <CreditCard className="w-[48px] h-[24px]" />
                                            Card
                                        </Label>
                                    </FormItem>

                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                                        </FormControl>
                                        <Label
                                            htmlFor="paypal"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <img src={paypal} alt="paypal card" className="w-[48px] h-[24px]" />
                                            paypal
                                        </Label>
                                    </FormItem>

                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="amazonPay" id="amazonPay" className="sr-only" />
                                        </FormControl>
                                        <Label
                                            htmlFor="amazonPay"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <img src={amazonPay} alt="amazon pay card" className="w-[48px] h-[24px]" />
                                            amazon pay
                                        </Label>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                enter your name as per the card.
                            </FormLabel>
                            <FormControl>
                                <Input type="text" />
                            </FormControl>
                        </FormItem>
                    )}
                />


                <FormField
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Card Number
                            </FormLabel>
                            <FormControl>
                                <Input type="number" />
                            </FormControl>

                        </FormItem>
                    )}
                />

                {/* <FormField 
                 name="expries"
                 render={({field}) => (

                 )}
                /> */}


                <Button variant="outline" type="submit">Submit</Button>


            </form>
        </Form>
    )
}


/* 
 WORKFLOW: 
 ✅ create form schema.
 ✅ call RFH.
 3. laydown your tsx.
 4. connect with the api.ts.
*/
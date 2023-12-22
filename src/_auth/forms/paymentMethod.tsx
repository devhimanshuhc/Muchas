import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const paymentMethodSchema = z.object({
    paymentMethod: z.enum(["card", "amazonPay", "paypal"]),
    name: z.string().min(2, { message: "name is required." }),
    cardNumber: z.coerce.number(),
    expires: z.coerce.number().min(2, { message: "expiry date is required." }),
    year: z.string().min(2, { message: "year is required." }),
    cvc: z.coerce.number().min(2, { message: "cvc is required." }),
})

type paymentMethodFormDataTyp = z.infer<typeof paymentMethodSchema>

export default function PaymentMethodsCard() {

    const form = useForm<paymentMethodFormDataTyp>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            paymentMethod: "card",
            name: "",
            cardNumber: undefined,
            expires: undefined,
            year: undefined,
            cvc: undefined,
        }
    })

    function onSubmit(formData: paymentMethodFormDataTyp) {
        console.log(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[80%] sm:w-[35%]">
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
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <img src={amazonPay} alt="amazon pay card" className="w-[48px] h-[24px]" />
                                            amazon pay
                                        </Label>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mt-2">
                            <FormLabel>
                                enter your name as per the card.
                            </FormLabel>
                            <FormControl>
                                <Input type="text" {...field}  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem className="mt-2">
                            <FormLabel>
                                Card Number
                            </FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="grid gap-2">
                        <FormField
                            name="expires"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Expiry Date</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">January</SelectItem>
                                            <SelectItem value="2">February</SelectItem>
                                            <SelectItem value="3">March</SelectItem>
                                            <SelectItem value="4">April</SelectItem>
                                            <SelectItem value="5">May</SelectItem>
                                            <SelectItem value="6">June</SelectItem>
                                            <SelectItem value="7">July</SelectItem>
                                            <SelectItem value="8">August</SelectItem>
                                            <SelectItem value="9">September</SelectItem>
                                            <SelectItem value="10">October</SelectItem>
                                            <SelectItem value="11">November</SelectItem>
                                            <SelectItem value="12">December</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from({ length: 10 }, (_, i) => (
                                                <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                                                    {new Date().getFullYear() + i}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormField 
                        name="cvc"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="CVC" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>

                <Button variant="outline" type="submit" className="mt-4 px-6 text-xl font-bold" >Submit</Button>
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
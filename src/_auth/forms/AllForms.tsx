import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import paypal from "../../../public/assets/icons/paypal.svg";
import cred from "../../../public/assets/icons/credit-card.svg";
import amazonPay from "../../../public/assets/icons/amazonpay.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { Card, CardContent } from "@/components/ui/card";

const allFormSchema = z.object({
  //   paymentMethod: z.enum(["card", "amazonPay", "paypal"]),
  fruit: z.string().min(2, { message: "fruit is required." }),
  username: z
    .string()
    .min(8, { message: "password must be atleast 8 characters." }),
  name: z.string().min(2, { message: "name is required." }),
  paymentMethod: z.enum(["card", "amazonpay", "paypal"]),
});

type allFormDataTyp = z.infer<typeof allFormSchema>;
export default function AllForms() {
  const form = useForm<allFormDataTyp>({
    resolver: zodResolver(allFormSchema),
    defaultValues: {
      fruit: undefined,
      username: "",
      name: "",
      paymentMethod: "card",
    },
  });

  // function handleSheetSubmit(event: React.FormEvent) {
  //   event.preventDefault();
  //   const formData = form.getValues();
  //   const { name, username } = formData;

  //   form.setValue("name", name);
  //   form.setValue("username", username);

  //   form.trigger();
  // }

  function onSubmit(formData: allFormDataTyp) {
    console.log(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[80%] sm:w-[35%] mx-auto"
      >
        <FormField
          name="fruit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Select a fruit</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* <Sheet key="bottom">
          <SheetTrigger asChild className="my-4 w-[80%]">
            <Button variant="outline">open to add name and username</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  key={"name"}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-right">
                        Name
                      </FormLabel>
                      <Input
                        type="string"
                        placeholder="Your Name"
                        {...field}
                        className="col-span-3 w-48"
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  key={"username"}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        type="string"
                        placeholder="Your username"
                        {...field}
                        className="col-span-3 w-48"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleSheetSubmit}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet> */}
        <br />
        <FormField
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col mt-5 animate-fade-right animate-thrice animate-duration-[1200ms] animate-delay-0">
                <FormLabel>Choose a payment option first.</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-5 my-5"
                  >
                    <FormItem>
                      <div>
                        <FormControl>
                          <RadioGroupItem
                            value="card"
                            id="card"
                            className="peer sr-only"
                          />
                        </FormControl>

                        <Label
                          htmlFor="card"
                          className="flex flex-col w-24  items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-gray-50 peer-data-[state=checked]:bg-opacity-20 [&:has([data-state=checked])]:border-primary"
                        >
                          <img
                            src={cred}
                            alt="credit card"
                            className="w-[48px] h-[22px] my-2"
                          />
                          Card
                        </Label>
                      </div>
                    </FormItem>

                    <FormItem>
                      <div>
                        <FormControl>
                          <RadioGroupItem
                            value="paypal"
                            id="paypal"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <Label
                          htmlFor="paypal"
                          className="flex flex-col w-24 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-gray-50 peer-data-[state=checked]:bg-opacity-20 [&:has([data-state=checked])]:border-primary"
                        >
                          <img
                            src={paypal}
                            alt="paypal card"
                            className="w-[48px] h-[22px] my-2"
                          />
                          Paypal
                        </Label>
                      </div>
                    </FormItem>

                    <FormItem>
                      <div>
                        <FormControl>
                          <RadioGroupItem
                            value="amazonpay"
                            id="amazonpay"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <Label
                          htmlFor="amazonpay"
                          className="flex flex-col w-24 text-center items-center  justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-gray-50 peer-data-[state=checked]:bg-opacity-20 [&:has([data-state=checked])]:border-primary"
                        >
                          <img
                            src={amazonPay}
                            alt="amazon pay"
                            className="w-[48px] h-[22px] my-2"
                          />
                          AmazonPay
                        </Label>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        {/* <Carousel className="w-[80%] mx-auto max-w-xs">
          <CarouselContent>
            <CarouselItem>
              <div>
                <Card>
                  <CardContent className="flex aspect-auto items-center justify-center p-6">
                    <img
                      src={amazonPay}
                      alt="amazon pay"
                      className="w-[48px] h-[22px] my-2"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Card>
                  <CardContent className="flex aspect-auto items-center justify-center p-6">
                    <img
                      src={amazonPay}
                      alt="amazon pay"
                      className="w-[48px] h-[22px] my-2"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Card>
                  <CardContent className="flex aspect-auto items-center justify-center p-6">
                    <img
                      src={amazonPay}
                      alt="amazon pay"
                      className="w-[48px] h-[22px] my-2"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Card>
                  <CardContent className="flex aspect-auto items-center justify-center p-6">
                    <img
                      src={amazonPay}
                      alt="amazon pay"
                      className="w-[48px] h-[22px] my-2"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Card>
                  <CardContent className="flex aspect-auto items-center justify-center p-6">
                    <img
                      src={amazonPay}
                      alt="amazon pay"
                      className="w-[48px] h-[22px] my-2"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}

        <Button
          variant="outline"
          type="submit"
          className="mt-4 px-6 text-xl font-bold"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

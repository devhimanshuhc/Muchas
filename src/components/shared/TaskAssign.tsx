import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const pickupSchema = z.object({
  username: z.string().min(5, { message: "username is required." }),
  phNo: z.coerce
    .number()
    .min(10, { message: "phone number got to be atleast 10 digits long." }),
  location: z.union([
    z.string().array().max(2),
    z.string({ required_error: "address is required." }),
  ]),
});

const destinationSchema = z.object({
  desusername: z.string().min(5, { message: "username is required." }),
  desphNo: z.coerce
    .number()
    .min(10, { message: "phone number got to be atleast 10 digits long." }),
  deslocation: z.string().min(5, { message: "address is required." }),
  deslocation2: z.string().min(5, { message: "second address is required." }),
});

const nextdestinationSchema = z.object({
  des2username: z.string().min(5, { message: "username is required." }),
  des2phNo: z.coerce
    .number()
    .min(10, { message: "phone number got to be atleast 10 digits long." }),
  des2location: z.string().min(5, { message: "address is required." }),
  des2location2: z.string().min(5, { message: "second address is required." }),
});

type pickupDataTyp = z.infer<typeof pickupSchema>;
type destinationDataTyp = z.infer<typeof destinationSchema>;
type nextdestinationDataTyp = z.infer<typeof nextdestinationSchema>;

export const TaskAssign = () => {
  const pickupform = useForm<pickupDataTyp>({
    resolver: zodResolver(pickupSchema),
    defaultValues: {
      username: "",
      phNo: undefined,
      location: "currentLocation",
    },
  });

  const destinationform = useForm<destinationDataTyp>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      desusername: "",
      desphNo: undefined,
      deslocation: "",
      deslocation2: "",
    },
  });

  const nextdestinationform = useForm<nextdestinationDataTyp>({
    resolver: zodResolver(nextdestinationSchema),
    defaultValues: {
      des2username: "",
      des2phNo: undefined,
      des2location: "",
      des2location2: "",
    },
  });

  function pickupSubmit(formData: pickupDataTyp) {
    console.log(formData);
  }

  function destinationSubmit(formData: destinationDataTyp) {
    console.log(formData);
  }

  function nextdestinationSubmit(formData: nextdestinationDataTyp) {
    console.log(formData);
  }

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">
            Pickup Point Details
          </AccordionTrigger>
          <AccordionContent>
            <Form {...pickupform}>
              <form onSubmit={pickupform.handleSubmit(pickupSubmit)}>
                <FormField
                  key={"username"}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Username</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key={"phNo"}
                  name="phNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key={"location"}
                  name="location"
                  control={pickupform.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Location</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your preferred location type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="currentLocation">
                              Use Current Location
                            </SelectItem>
                            <SelectItem value="address">
                              Enter Address
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {field.value !== "currentLocation" && (
                        <>
                          <FormControl>
                            <Input
                              placeholder="Enter your address"
                              type="string"
                              onChange={(e) => field.onChange(e)}
                            />
                          </FormControl>
                          <FormMessage />
                        </>
                      )}
                    </FormItem>
                  )}
                />

                <Button
                  variant="outline"
                  className="mt-4 mx-auto font-bold text-xl"
                  type="submit"
                >
                  Done
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-bold">
            Destination Point Details
          </AccordionTrigger>
          <AccordionContent>
            <Form {...destinationform}>
              <form onSubmit={destinationform.handleSubmit(destinationSubmit)}>
                <FormField
                  key={"desusername"}
                  name="desusername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Username</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key={"desphNo"}
                  name="desphNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  key={"deslocation"}
                  name="deslocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Address</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key={"deslocation2"}
                  name="deslocation2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        Alternate Address
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="outline"
                  className="mt-4 mx-auto font-bold text-xl"
                  type="submit"
                >
                  Done
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-bold">
            Next Destination Point Details
          </AccordionTrigger>
          <AccordionContent>
            <Form {...nextdestinationform}>
              <form
                onSubmit={nextdestinationform.handleSubmit(
                  nextdestinationSubmit
                )}
              >
                <FormField
                  key={"des2username"}
                  name="des2username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Username</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key={"des2phNo"}
                  name="des2phNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="string" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  key={"des2location"}
                  name="des2location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Address</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key={"des2location2"}
                  name="des2location2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        Alternate Address
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="outline"
                  className="mt-4 mx-auto font-bold text-xl"
                  type="submit"
                >
                  Done
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

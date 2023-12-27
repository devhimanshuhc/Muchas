import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import manager from "../../../public/assets/icons/manager.svg";
import restro from "../../../public/assets/icons/restaurant.svg";
import member from "../../../public/assets/icons/delivery.png";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  Select,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const onBoardSchema = z.object({
  userType: z.enum(["restaurant", "manager", "member"]),
  username: z.string().min(5, { message: "username is required." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters." }),
  phNo: z.coerce
    .number()
    .min(10, { message: "phone number got to be atleast 10 digits long." }),
  location: z.union([
    z.string().array().max(2),
    z.string({ required_error: "address is required." }),
  ]),
});

type onBoardDataTyp = z.infer<typeof onBoardSchema>;

export const OnBoard = () => {
  const form = useForm<onBoardDataTyp>({
    resolver: zodResolver(onBoardSchema),
    defaultValues: {
      userType: "restaurant",
      username: "",
      email: "",
      password: "",
      phNo: undefined,
      location: "currentLocation",
    },
  });

  function onSubmit(formData: onBoardDataTyp) {
    console.log(formData);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[80%] sm:w-[35%] mx-auto"
      >
        <FormField
          name="userType"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col mt-5 animate-fade-right text-md animate-thrice animate-duration-[1200ms] animate-delay-0">
                <FormLabel className="font-bold text-xl">
                  Choose the user type.
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-5 lg:gap-10 my-5 mx-auto"
                  >
                    <FormItem>
                      <div>
                        <FormControl>
                          <RadioGroupItem
                            value="restaurant"
                            id="restaurant"
                            className="peer sr-only"
                          />
                        </FormControl>

                        <Label
                          htmlFor="restaurant"
                          className="flex flex-col w-24 h-28 lg:w-32 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-gray-50 peer-data-[state=checked]:bg-opacity-20 [&:has([data-state=checked])]:border-primary"
                        >
                          <img
                            src={restro}
                            alt="restaurant"
                            className="w-[48px] h-[40px] my-2"
                          />
                          <p className="">Restaurants</p>
                        </Label>
                      </div>
                    </FormItem>

                    <FormItem>
                      <div>
                        <FormControl>
                          <RadioGroupItem
                            value="manager"
                            id="manager"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <Label
                          htmlFor="manager"
                          className="flex flex-col w-24 h-28 lg:w-32 items-center text-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-gray-50 peer-data-[state=checked]:bg-opacity-20 [&:has([data-state=checked])]:border-primary"
                        >
                          <img
                            src={manager}
                            alt="fleet manager"
                            className="w-[48px] h-[30px] my-2"
                          />
                          Fleet Manager
                        </Label>
                      </div>
                    </FormItem>

                    <FormItem>
                      <div>
                        <FormControl>
                          <RadioGroupItem
                            value="member"
                            id="member"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <Label
                          htmlFor="member"
                          className="flex flex-col w-24 h-28 lg:w-32 text-center items-center  justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-gray-50 peer-data-[state=checked]:bg-opacity-20 [&:has([data-state=checked])]:border-primary"
                        >
                          <img
                            src={member}
                            alt="amazon pay"
                            className="w-[35px] h-[35px] my-2"
                          />
                          Fleet member
                        </Label>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormField
          key={"username"}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          key={"email"}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
              <FormLabel className="text-lg">Phone Number</FormLabel>
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
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Location</FormLabel>
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
                    <SelectItem value="address">Enter Address</SelectItem>
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

        <FormField
          key={"password"}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
          On Board
        </Button>
      </form>
    </Form>
  );
};

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useCreateMerchantAcMutation,
  useCreateUserSessionMutation,
} from "@/lib/query/queries";
import { Link, useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { useUserContext } from "@/contexts/AuthContext";

// => whats my formData looks like and how to know whether its valid or not.
const formSchema = z.object({
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

// => how the whole form management works.
/* 
 NOTE: 
 zodResolver is a f() that helps us to integrate zod with react-form-hook.
*/

type merchantFormData = z.infer<typeof formSchema>;

export default function MerchantSignup() {
  const navigate = useNavigate();

  const form = useForm<merchantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phNo: undefined,
      location: "currentLocation",
    },
  });

  // use this toast f() to provide the description of the message you want to notify.
  const { toast } = useToast();

  const { mutateAsync: createMerchantAc, isPending: isCreatingMerchant } =
    useCreateMerchantAcMutation();
  const { mutateAsync: createEmailSession, isPending: isCreatingSession } =
    useCreateUserSessionMutation();
  const { checkUserAuth } = useUserContext();

  async function onSubmit(formData: merchantFormData) {
    /* 
         WORKFLOW: 
         1. we gon init a variable named ac and populate depending on the location prop.
         2. then make ac go throught all of the checkpoints globally.
        */

    let ac: unknown;

    if (formData.location === "currentLocation") {
      async function successCall(position: GeolocationPosition) {
        const { latitude: lat, longitude: lng } = position.coords;
        formData.location = [String(lng), String(lat)];
        ac = await createMerchantAc({
          ...formData,
        });
      }

      function errorCall(error: GeolocationPositionError) {
        console.error(error);
      }

      navigator.geolocation.getCurrentPosition(successCall, errorCall);
    } else {
      ac = await createMerchantAc({
        ...formData,
      });
    }

    if (!ac) {
      toast({
        title: "🚨 Something went wrong!!",
        description:
          "make sure you re connected to internet and 've entered correct info.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return null;
    }

    // since we've created an Ac, next we got to signin into the newly created Ac.
    const session = await createEmailSession({
      email: formData.email,
      password: formData.password,
    });

    if (!session) {
      toast({
        title: "🚨 Something went wrong!!",
        description:
          "make sure you re connected to internet and 've entered correct info.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return null;
    }

    let userAuthStatus = await checkUserAuth();

    if (userAuthStatus) {
      toast({
        title: "Merchant Account created 😃",
        description: "Go ahead and create offers ⭐ to attract more customers.",
        action: (
          <ToastAction altText="Create an offer">Create an Offer</ToastAction>
        ),
      });
      form.reset;
      navigate("/");
    } else {
      toast({
        title: "Oops, login snag!😫",
        description:
          "There seems to be a hiccup with your username or password. Please double-check and try again.",
      });
      return null;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[80%] sm:w-[35%]"
      >
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
          {isCreatingMerchant || isCreatingSession ? "Creating..." : "Signup"}
        </Button>
        <p className="mt-2 text-sm font-thin">
          Already 've got a Merchant Account?
          <Link
            to="/signin"
            className="text-green-600 text-xl ml-2 underline font-semibold"
          >
            Signin
          </Link>
        </p>
      </form>
    </Form>
  );
}

/* 
 WORKFLOW: 
 ✅ create a form schema for validation using zod.
 ✅ define your form using useForm hook from react-hook-form.
 ✅ lay down your tsx using shad-cn components.
 ✅ handle submit using onSubmit in your form defination and put it on appwrite cloud.
*/

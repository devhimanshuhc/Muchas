import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Models } from "appwrite";

import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/shared/FileUploader";
import { Textarea } from "@/components/ui/textarea";
import add from "../../../public/assets/icons/gallery-add.svg";
import { OfferTyp } from "@/lib/types";
import { useUserContext } from "@/contexts/AuthContext";
import { useCreateOffersMutation } from "@/lib/query/queries";
import { useToast } from "@/components/ui/use-toast";

const offerSchema = z.object({
  offerDescription: z
    .string()
    .max(1500, {
      message:
        "Hey merchant! Keep your offer description under 1500 characters.",
    }),
  offerBanner: z.custom<File[]>(),
});

type CreateOfferProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

type CreateOfferFormDataTyp = z.infer<typeof offerSchema>;

export default function CreateOffer({ post, action }: CreateOfferProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();

  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offerDescription: "",
      offerBanner: [],
    },
  });

  const { mutateAsync: createOffer, isPending: isCreatingOffer } =
    useCreateOffersMutation();

  async function handleSubmit(formData: CreateOfferFormDataTyp) {
    const offer: OfferTyp = {
      creator: user.accountId,
      offerBanner: formData.offerBanner,
      offerDescription: formData.offerDescription,
    };

    let res = null;
    if (action === "Create") {
      res = await createOffer(offer);
      console.log(res);
    }

    if (!res) {
      toast({
        title: "🚨 There was a snag creating your offer 🚨",
        description:
          "We ran into a glitch creating your offer. Please try again or contact support.",
      });
    } else {
      toast({
        title: "✨Success! Your offer is now available to customers",
        description:
          "Your awesome offer is now out there, ready to attract customers! ",
      });

      navigate("/");
    }
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full mt-10 md:mt-0">
          <div className="flex flex-row justify-start items-start mb-5">
            <img src={add} width={40} height={30} alt="add" loading="lazy" />
            <h2 className="h3-bold md:h2-bold text-left justify-center w-full text-4xl pl-2">
              Create Offer
            </h2>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-9 w-full  max-w-5xl"
            >
              <FormField
                control={form.control}
                name="offerDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="offerBanner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Add Photos</FormLabel>
                    <FormControl>
                      <FileUploader
                        fieldChange={field.onChange}
                        mediaUrl={post?.imageUrl}
                      />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-center justify-end">
                <Button type="button" variant="outline" className="">
                  Cancel
                </Button>
                <Button type="submit" variant="outline">
                  {isCreatingOffer ? "Creating Offer..." : "Create Offer"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

/* 
 WORKFLOW: 
  ✅ create a form schema for validation using zod.
  ✅ define your form using useForm hook from react-hook-form.
  ✅ lay down your tsx using shad-cn components.
  ✅ handle submit using onSubmit in your form defination and put it on appwrite cloud.
*/

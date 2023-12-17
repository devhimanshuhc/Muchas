import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Models } from "appwrite";

import { useNavigate } from "react-router-dom";
// import { offerSchema } from "@/lib/validation";
// import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/shared/FileUploader";
import { Textarea } from "@/components/ui/textarea";
import add from "../../../public/assets/icons/gallery-add.svg";

const offerSchema = z.object({
  offerDescription: z.string().max(1500, {
    message: "Hey merchant! Keep your offer description under 1500 characters.",
  }),
  offerBanner: z
    .string()
    .url()
    .min(1, { message: "Merchant, kindly include a banner for the offer." }),
});

type CreateOfferProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

export default function CreateOffer({ post, action }: CreateOfferProps) {
  //   const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offerDescription: "",
      offerBanner: "",
    },
  });

  /*
  TODO
  */
  const handleSubmit = async (value: z.infer<typeof offerSchema>) => {};
  // ACTION = UPDATE;
  // if (post && action === "Update") {
  //   const updatedPost = await updatePost({
  //     ...value,
  //     postId: post.$id,
  //     imageId: post.imageId,
  //     imgUrl: post.imageUrl,
  //   });

  //   if (!updatedPost) {
  //     toast({
  //       title: `${action} post failed. Please try again.`,
  //     });
  //   }
  //   return navigate(`/posts/${post.$id}`);
  // }

  // // ACTION = CREATE
  // const newPost = await createPost({
  //   ...value,
  //   userId: usr.id,
  // });

  //     if (!newPost) {
  //       toast({
  //         title: `${action} post failed. Please try again.`,
  //       });
  //     }
  //     navigate("/");
  //   };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full mt-10 md:mt-0">
          <div className="flex flex-row justify-start items-start mb-5">
            <img src={add} width={40} height={30} alt="add" loading="lazy" />
            <h2 className="h3-bold md:h2-bold text-left justify-center w-full text-4xl pl-2">
              Create Post
            </h2>
          </div>

          <Form {...form}>
            <form
              //   onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-9 w-full  max-w-5xl"
            >
              <FormField
                control={form.control}
                name="offerDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md bg-[#0d0d0d]">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea className="bg-[#0d0d0d]" {...field} />
                    </FormControl>
                    <FormMessage className="" />
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
              {/* <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Add Location</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          /> */}
              {/* <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Add Tags (separated by comma " , ")
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Art, Expression, Learn"
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          /> */}

              {/*TODO */}

              <div className="flex gap-4 items-center justify-end">
                <Button
                  type="button"
                  className=""
                  //   onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className=" whitespace-nowrap"
                  //   disabled={isLoadingCreate || isLoadingUpdate}
                >
                  {/* {(isLoadingCreate || isLoadingUpdate) && <ButtonLoader />} */}
                  {/* {action} */}
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
    /* 
         TODO: 
         lay down the tsx portion to fill the form to create an offers.
        */
  );
}

/* 
 WORKFLOW: 
  ✅ create a form schema for validation using zod.
  ✅ define your form using useForm hook from react-hook-form.
  lay down your tsx using shad-cn components.
  handle submit using onSubmit in your form defination and put it on appwrite cloud.
*/

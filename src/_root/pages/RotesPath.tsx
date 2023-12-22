import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import bicycle from "../../../public/assets/icons/bicycle.svg";
import car from "../../../public/assets/icons/car.svg";
import pedestrian from "../../../public/assets/icons/pedestrian.svg";
import bus from "../../../public/assets/icons/bus.svg";
import scooter from "../../../public/assets/icons/scooter.svg";
import truck from "../../../public/assets/icons/truck.svg";
import taxi from "../../../public/assets/icons/taxi.svg";
import { Button } from "@/components/ui/button";

const routesPathSchema = z.object({
  transport: z.enum([
    "bicycle",
    "bus",
    "car",
    "pedestrian",
    "scooter",
    "taxi",
    "truck",
  ]),
  source: z.string().min(2, { message: "Source is required." }),
  destination: z.string().min(2, { message: "Destination is required." }),
});

type routesPathForm = z.infer<typeof routesPathSchema>;

export default function RoutesPath() {
  const form = useForm<routesPathForm>({
    resolver: zodResolver(routesPathSchema),
    defaultValues: {
      transport: "bicycle",
      source: "",
      destination: "",
    },
  });
  function onSubmit(formData: routesPathForm) {
    console.log(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[80%] sm:w-[35%] mx-auto"
      >
        <FormField
          name="source"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Enter your Source Place.</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="destination"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Enter your Destination Place.</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="transport"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Transport Mode.</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex overflow-x-scroll min-h-[80px] gap-2"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="bicycle"
                        id="bicycle"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="bicycle"
                      className="flex flex-col w-20 items-center grow justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <img
                        src={bicycle}
                        alt="bicycle"
                        className="w-[48px] h-[24px]"
                      />
                      Bicycle
                    </Label>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="bus"
                        id="bus"
                        className="sr-only "
                      />
                    </FormControl>
                    <Label
                      htmlFor="bus"
                      className="flex flex-col w-20 items-center grow justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <img
                        src={bus}
                        alt="paypal card"
                        className="w-[48px] h-[24px]"
                      />
                      Bus
                    </Label>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="car"
                        id="car"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="car"
                      className="flex flex-col w-20 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <img src={car} alt="car" className="w-[48px] h-[24px]" />
                      Car
                    </Label>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="scooter"
                        id="scooter"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="scooter"
                      className="flex flex-col w-20 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <img
                        src={scooter}
                        alt="scooter"
                        className="w-[48px] h-[24px]"
                      />
                      Scooter
                    </Label>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="taxi"
                        id="taxi"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="taxi"
                      className="flex flex-col w-20 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <img
                        src={taxi}
                        alt="taxi"
                        className="w-[48px] h-[24px]"
                      />
                      Taxi
                    </Label>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="truck"
                        id="truck"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="truck"
                      className="flex flex-col w-20 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <img
                        src={truck}
                        alt="truck"
                        className="w-[48px] h-[24px]"
                      />
                      Truck
                    </Label>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="pedestrian"
                        id="pedestrian"
                        className="sr-only"
                      />
                    </FormControl>
                    <Label
                      htmlFor="pedestrian"
                      className="flex flex-col w-20 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <img
                        src={pedestrian}
                        alt="pedestrian"
                        className="w-[48px] h-[24px]"
                      />
                      Pedestrian
                    </Label>
                  </FormItem>
                </RadioGroup>
                {/* </div> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          type="submit"
          className="mt-4 px-6 text-xl font-bold"
        >
          Search Path
        </Button>
      </form>
    </Form>
  );
}

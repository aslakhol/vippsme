import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";

export const Vipps = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  return (
    <div>
      <h1>Lag din egen vipps-lenke</h1>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ditt telefonnummer</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hvor mange kroner?</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Melding?</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Denne blir lagt til i vippsen, men kan endres.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
    </div>
  );
};

const formSchema = z.object({
  phone: z.string().min(4, "Må ha et telefonnummer").optional(),
  amount: z.coerce.number().min(0, "Må være et positivt tall?").optional(),
  message: z
    .string()
    .max(50, "Vipps tillater ikke meldinger lengre en 50 tegn")
    .optional(),
});
//TODO Check if + 47 works

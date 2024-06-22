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
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

export const Vipps = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    shouldFocusError: false,
  });

  const handleChange = (data: z.infer<typeof formSchema>) => {
    const messagePart = data.message
      ? `&m=${encodeURIComponent(data.message)}`
      : "";
    const amountPart = data.amount ? `&a=${data.amount * 100}` : "";
    const vippsLink = `https://qr.vipps.no/28/2/01/031/${data.phone}?v=1${messagePart}${amountPart}`;
    navigator.clipboard.writeText(vippsLink);

    toast.success("Lenke kopiert", { description: vippsLink });
  };

  return (
    <div>
      <h1>Lag din egen vipps-lenke</h1>

      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(handleChange, (errors) => {
            const errorMessage = Object.values(errors)[0]?.message;

            toast.error("Feil ved kopiering av lenke", {
              description: errorMessage,
            });
          })}
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ditt telefonnummer</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} required />
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
          <Button type="submit">Kopier lenke</Button>
        </form>
      </Form>
      <Toaster richColors theme="light" />
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

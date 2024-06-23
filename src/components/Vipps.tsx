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
  const defaultPhone = window.localStorage.getItem("phone");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: {
      phone: defaultPhone || "",
    },
  });

  const handleChange = (data: z.infer<typeof formSchema>) => {
    const messagePart = data.message
      ? `&m=${encodeURIComponent(data.message)}`
      : "";
    const amountPart = data.amount ? `&a=${data.amount * 100}` : "";
    const vippsLink = `https://qr.vipps.no/28/2/01/031/${data.phone}?v=1${messagePart}${amountPart}`;
    navigator.clipboard.writeText(vippsLink);
    window.localStorage.setItem("phone", data.phone);

    toast.success("Lenke kopiert", { description: vippsLink });
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Lag din egen Vipps-lenke
      </h1>
      <p className="leading-6 text-sm mt-6 mb-1">
        Lenken fyller ut nummeret, beløp og meldingen, men de kan endres.
      </p>
      <p className="leading-6 text-sm  mb-6">
        OBS: Lenken må brukes på mobil, i en vanlig nettleser (ikke inne i
        Messenger e.l.)
      </p>
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
                <FormLabel>Hva gjelder det?</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Blir lagt til som melding i vippsen.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-[#ff5b24] w-full">
            Kopier Vipps-lenke
          </Button>
        </form>
      </Form>
      <Toaster richColors />
    </div>
  );
};

const formSchema = z.object({
  phone: z
    .string()
    .refine((v) => {
      return !v.includes("+") && !v.startsWith("00");
    }, "Ikke bruk landskode (f.eks. +47).")
    .refine((v) => {
      return !isNaN(+v);
    }, "Må være bare tall.")
    .refine((v) => {
      return v.length === 8;
    }, "Må være 8 siffer."),
  amount: z.coerce
    .number()
    .min(0, "Må være et positivt tall.")
    .max(99000, "Vipps tillater ikke beløp over 99 000 kr.")
    .optional(),
  message: z
    .string()
    .max(50, "Vipps tillater ikke meldinger lengre en 50 tegn.")
    .optional(),
});

"use client";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { type z } from "zod";
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
import { api } from "../trpc/react";
import { formSchema } from "../lib/utils";

export const Vipps = () => {
  const createLinkMutation = api.link.create.useMutation({
    onSuccess: (response) => {
      toast.success("Lenke kopiert", { description: response.slug });
    },
  });

  const defaultPhone = window.localStorage.getItem("phone");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: {
      phone: defaultPhone ?? "",
    },
  });

  const handleChange = async (data: z.infer<typeof formSchema>) => {
    const messagePart = data.message
      ? `&m=${encodeURIComponent(data.message)}`
      : "";
    const amountPart = data.amount ? `&a=${data.amount * 100}` : "";
    const vippsLink = `https://qr.vipps.no/28/2/01/031/${data.phone}?v=1${messagePart}${amountPart}`;
    await navigator.clipboard.writeText(vippsLink);
    window.localStorage.setItem("phone", data.phone);

    createLinkMutation.mutate({
      phone: data.phone,
      amount: data.amount,
      message: data.message,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Lag din egen Vipps-lenke
      </h1>
      <p className="mb-1 mt-6 text-sm leading-6">
        Lenken fyller ut nummeret, beløp og meldingen, men de kan endres.
      </p>
      <p className="mb-6 text-sm  leading-6">
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
                  <Input type="tel" {...field} required className="text-md" />
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
                  <Input type="number" {...field} className="text-md" />
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
                  <Input {...field} className="text-md" />
                </FormControl>
                <FormDescription>
                  Blir lagt til som melding i vippsen.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[#ff5b24]">
            Kopier Vipps-lenke
          </Button>
        </form>
      </Form>
      <Toaster richColors />
    </div>
  );
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
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

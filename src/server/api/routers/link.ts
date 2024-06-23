import { createTRPCRouter, publicProcedure } from "../trpc";
import { links } from "../../db/schema";
import { formSchema } from "../../../lib/utils";

export const linkRouter = createTRPCRouter({
  create: publicProcedure.input(formSchema).mutation(async ({ ctx, input }) => {
    const messagePart = input.message
      ? `&m=${encodeURIComponent(input.message)}`
      : "";
    const amountPart = input.amount ? `&a=${input.amount * 100}` : "";
    const slug = ctx.nanoId();

    await ctx.db.insert(links).values({
      slug: slug,
      phone: input.phone,
      message: input.message,
      amount: input.amount,
      vipps: `vipps://qr.vipps.no/28/2/01/031/${input.phone}?v=1${messagePart}${amountPart}`,
      https: `https://qr.vipps.no/28/2/01/031/${input.phone}?v=1${messagePart}${amountPart}`,
    });

    return { slug };
  }),
});

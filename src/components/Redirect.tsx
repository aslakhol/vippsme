"use client";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { formSchema } from "../lib/utils";
import { ZodError } from "zod";

type Props = { phone: string; amount?: number; message?: string };

export const Redirect = ({ phone, amount, message }: Props) => {
  const { https, vipps, error } = getLinks({ phone, amount, message });
  const router = useRouter();

  const handleManualRedirect = () => {
    if (!https) {
      return;
    }
    router.push(https);
  };

  useEffectOnce(() => {
    if (!vipps) {
      return;
    }
    router.replace(vipps);
  });

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Sender deg videre til Vipps!
      </h1>
      <p className="text-sm">PS: Lenken fungerer bare på mobil.</p>

      {(!https || error) && (
        <p className="text-sm">
          Finner ikke vipps-lenken, har du kopiert riktig?
        </p>
      )}

      {https && (
        <Button className="w-full bg-[#ff5b24]" onClick={handleManualRedirect}>
          Send meg videre manuelt
        </Button>
      )}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
export function useEffectOnce(effect: () => Promise<any> | any): void {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      effect();
    }
    // eslint-disable-next-line
  }, []);
}

const getLinks = (params: Props) => {
  try {
    console.log(params);
    const parsed = formSchema.parse(params);

    const messagePart = parsed.message ? `&m=${parsed.message}` : "";
    const amountPart = parsed.amount ? `&a=${parsed.amount}` : "";

    return {
      https: `https://qr.vipps.no/28/2/01/031/${parsed.phone}?v=1${messagePart}${amountPart}`,
      vipps: `vipps://qr.vipps.no/28/2/01/031/${parsed.phone}?v=1${messagePart}${amountPart}`,
      error: undefined,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        https: undefined,
        vipps: undefined,
        error: error,
      };
    }
    throw new Error("Ugyldig link data, kopierte du riktig?");
  }
};

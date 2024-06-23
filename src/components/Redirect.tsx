"use client";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

type Props = { slug: string };

export const Redirect = ({ slug }: Props) => {
  const redirectUrl = `https://qr.vipps.no/28/2/01/031/${slug}?v=1`;

  const handleManualRedirect = () => {
    window.open(redirectUrl);
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Sender deg videre til Vipps!
      </h1>
      <p>PS: Lenken fungerer bare på mobil.</p>
      <LoaderCircle className="animate-spin self-center" size={32} />
      <Button className="w-full bg-[#ff5b24]" onClick={handleManualRedirect}>
        Send meg videre manuelt
      </Button>
    </>
  );
};

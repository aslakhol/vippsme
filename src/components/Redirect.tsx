"use client";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "../trpc/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { slug: string };

export const Redirect = ({ slug }: Props) => {
  const linkQuery = api.link.get.useQuery({ slug });

  const router = useRouter();

  const handleManualRedirect = () => {
    if (!linkQuery.data?.https) {
      return;
    }

    router.push(linkQuery.data.https);
  };

  useEffect(() => {
    if (!linkQuery.data) {
      return;
    }

    router.replace(linkQuery.data.vipps);
  }, [linkQuery.data, router]);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Sender deg videre til Vipps!
      </h1>
      <p className="text-sm">PS: Lenken fungerer bare på mobil.</p>

      {linkQuery.isLoading && (
        <>
          <LoaderCircle className="animate-spin self-center" size={32} />
        </>
      )}

      {!linkQuery.data && !linkQuery.isLoading && (
        <p className="text-sm">
          Finner ikke vipps-lenken, har du kopiert riktig?
        </p>
      )}

      {linkQuery.data && (
        <Button
          className="w-full bg-[#ff5b24]"
          onClick={handleManualRedirect}
          disabled={linkQuery.isLoading || !linkQuery.data}
        >
          Send meg videre manuelt
        </Button>
      )}
    </>
  );
};

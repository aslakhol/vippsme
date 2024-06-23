"use client";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "../trpc/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = { slug: string };

export const Redirect = ({ slug }: Props) => {
  const linkQuery = api.link.get.useQuery({ slug });
  const incrementClicksMutation = api.link.incrementClicks.useMutation({
    onSuccess: (result) => {
      if (!result[0]?.vipps) {
        return;
      }

      router.replace(result[0].vipps);
    },
  });

  const router = useRouter();

  const handleManualRedirect = () => {
    if (!linkQuery.data?.https) {
      return;
    }

    router.push(linkQuery.data.https);
  };

  useEffectOnce(async () => {
    void incrementClicksMutation.mutateAsync({ slug });
  });

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

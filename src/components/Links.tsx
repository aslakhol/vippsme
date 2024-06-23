"use client";
import { Copy } from "lucide-react";
import { api } from "../trpc/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { env } from "../env";

export const Links = () => {
  const linkSlugs = getLocalLinks();

  if (!linkSlugs?.length) {
    return null;
  }

  return (
    <div>
      <h2 className="pb-4 text-2xl font-bold tracking-tight">Mine lenker</h2>
      <Table>
        <TableCaption>Lenker du har laget fra denne nettleseren</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Link</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">Copy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {linkSlugs.map((slug) => (
            <Link key={slug} slug={slug} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

type LinkProps = { slug: string };

const Link = ({ slug }: LinkProps) => {
  const linkQuery = api.link.get.useQuery({ slug });

  const copyLink = async () => {
    if (!linkQuery.data?.https) {
      return;
    }
    const redirectUrl = `${env.NEXT_PUBLIC_HOST}/s/${slug}`;

    await navigator.clipboard.writeText(redirectUrl);

    toast.success("Lenke kopiert", {
      description: redirectUrl,
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{slug}</TableCell>
      <TableCell className="text-right">{linkQuery.data?.clicks}</TableCell>
      <TableCell className="text-right">
        <Button onClick={copyLink} variant="outline" size="icon">
          <Copy className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const getLocalLinks = () => {
  if (typeof window !== "undefined") {
    const links = window.localStorage.getItem("links")?.split(",");
    return links ?? [];
  }
  return [];
};

export default Links;

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const Links = () => {
  const linkSlugs = getLocalLinks().reverse();

  if (!linkSlugs?.length) {
    return null;
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Mine lenker</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Created</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Copy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {linkSlugs.map((slug) => (
                <Link key={slug} slug={slug} />
              ))}
            </TableBody>
            <TableCaption>
              Lenker du har laget fra denne nettleseren
            </TableCaption>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
      <TableCell className="">
        {linkQuery.data?.createdAt.toLocaleString("en-GB", {
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </TableCell>
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

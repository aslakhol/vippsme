"use client";
import { Copy } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const Links = () => {
  const links = getLocalLinks().reverse();

  if (!links?.length) {
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
                <TableHead className="">Link</TableHead>
                <TableHead className="text-right">Copy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <Link key={link} link={link} />
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

type LinkProps = { link: string };

const Link = ({ link }: LinkProps) => {
  const copyLink = async () => {
    if (!link) {
      return;
    }

    await navigator.clipboard.writeText(link);
    toast.success("Lenke kopiert", {
      description: link,
    });
  };

  return (
    <TableRow>
      <TableCell className="">{link}</TableCell>
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

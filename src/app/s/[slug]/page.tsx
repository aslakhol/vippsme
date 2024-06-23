import { Redirect } from "../../../components/Redirect";

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="mx-auto flex h-screen max-w-sm flex-col items-start gap-8 py-20">
      <Redirect slug={params.slug} />
    </main>
  );
}

import { Redirect } from "../../components/Redirect";

export default async function SlugPage({
  searchParams,
}: {
  searchParams: { p: string; a: string; m: string };
}) {
  return (
    <main className="mx-auto flex h-screen max-w-sm flex-col items-start gap-8 px-4 py-20">
      {
        <Redirect
          phone={searchParams.p}
          amount={!!searchParams.a ? +searchParams.a : undefined}
          message={searchParams.m}
        />
      }
    </main>
  );
}

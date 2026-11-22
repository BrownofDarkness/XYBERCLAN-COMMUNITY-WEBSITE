import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ground text-ink">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <Link href="/" className="underline underline-offset-4">
        Back to Xyberclan
      </Link>
    </main>
  );
}

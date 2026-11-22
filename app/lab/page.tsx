import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <main className="bg-ground p-8 text-ink">
      <h1 className="text-3xl font-semibold">Lab</h1>
      <p className="mt-2">
        Component playground. Every component and motion utility gets a live
        demo here.
      </p>
    </main>
  );
}

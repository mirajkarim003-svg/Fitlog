import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-5 py-28 text-center sm:px-8">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        That route isn&apos;t part of the library. Head back and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-canvas"
      >
        <ArrowLeft className="h-4 w-4" /> Back to workouts
      </Link>
    </div>
  );
}

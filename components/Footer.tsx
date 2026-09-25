import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-5 py-6 text-sm sm:flex-row sm:px-8">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="h-6 w-auto object-contain"
          />
          <span className="font-display font-bold tracking-wide text-ink">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Search } from "lucide-react";
import { useApp } from "@/context/AppContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-accent" strokeWidth={2.5} />
          <span className="font-display text-xl font-bold tracking-wide text-ink">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/my-plan"
            className="tag-pill bg-accent text-[12px] text-canvas"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="tag-pill border border-line text-[12px] text-ink"
          >
            Saved {saved.length}
          </Link>
          <button
            type="button"
            aria-label="Search"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink sm:flex"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-6 border-t border-line px-5 py-2.5 md:hidden">
        {links.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

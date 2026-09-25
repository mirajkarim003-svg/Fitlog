"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import { useApp } from "@/context/AppContext";
import { SortKey } from "@/lib/types";

export default function HomePage() {
  const { workouts, loading, error } = useApp();
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const visibleWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((g) => g.toLowerCase().includes(q))
        )
      : workouts;
    return [...filtered].sort((a, b) => a[sortKey] - b[sortKey]);
  }, [workouts, sortKey, query]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-ink">
              The Library
            </h2>
            <p className="mt-1 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
              <Search className="h-4 w-4 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or tag"
                className="w-40 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none sm:w-56"
              />
            </div>
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        </div>

        {error && (
          <p className="mt-10 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted">
            {error}
          </p>
        )}

        {loading && !error && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-xl border border-line bg-surface"
              />
            ))}
          </div>
        )}

        {!loading && !error && (
          <>
            {visibleWorkouts.length === 0 ? (
              <p className="mt-10 text-sm text-muted">
                No workouts match &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

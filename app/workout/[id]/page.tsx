"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, BookmarkCheck, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";

const SPEC_LABELS: { key: "equipment" | "difficulty" | "sets" | "reps" | "duration" | "caloriesBurned" | "rating"; label: string; suffix?: string }[] = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration", suffix: " min" },
  { key: "caloriesBurned", label: "Calories", suffix: " kcal" },
  { key: "rating", label: "Rating" },
];

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { workouts, loading, getWorkout, addToPlan, addToSaved, isInPlan, isSaved } =
    useApp();

  const id = Number(params.id);
  const workout = getWorkout(id);

  if (loading) {
    return (
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="h-96 animate-pulse rounded-xl border border-line bg-surface" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-2xl font-bold uppercase text-ink">
          Workout not found
        </h1>
        <p className="mt-2 text-sm text-muted">
          That lift isn&apos;t in the library.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-canvas"
        >
          <ArrowLeft className="h-4 w-4" /> Back to workouts
        </Link>
      </div>
    );
  }

  const planned = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mx-auto max-w-content px-5 py-10 sm:px-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="tag-pill bg-white/10 uppercase text-ink"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-line">
            {SPEC_LABELS.map((spec, i) => (
              <div
                key={spec.key}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-surface" : "bg-surface2"
                }`}
              >
                <span className="text-muted">{spec.label}</span>
                <span className="font-semibold text-ink">
                  {workout[spec.key]}
                  {spec.suffix ?? ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase text-ink">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-surface2 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout.id)}
              disabled={planned}
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-canvas transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              {planned ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout.id)}
              disabled={saved}
              className="flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-bold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

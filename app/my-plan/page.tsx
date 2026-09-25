"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PlanItem, Workout } from "@/lib/types";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    workouts,
    loading,
    plan,
    saved,
    removeFromPlan,
    toggleDone,
    removeFromSaved,
    addToPlan,
  } = useApp();
  const [tab, setTab] = useState<Tab>("plan");

  const planWorkouts = useMemo(
    () =>
      plan
        .map((p) => ({ item: p, workout: workouts.find((w) => w.id === p.id) }))
        .filter((row): row is { item: PlanItem; workout: Workout } => !!row.workout),
    [plan, workouts]
  );

  const savedWorkouts = useMemo(
    () => saved.map((id) => workouts.find((w) => w.id === id)).filter(Boolean) as Workout[],
    [saved, workouts]
  );

  const totalMinutes = planWorkouts.reduce((sum, row) => sum + row.workout.duration, 0);
  const totalCalories = planWorkouts.reduce(
    (sum, row) => sum + row.workout.caloriesBurned,
    0
  );

  return (
    <div className="mx-auto max-w-content px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-surface">
        <Stat label="Exercises" value={planWorkouts.length} />
        <Stat label="Minutes" value={totalMinutes} />
        <Stat label="Calories" value={totalCalories} />
      </div>

      <div className="mt-8 flex gap-2 border-b border-line">
        <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
          Today&apos;s Plan
        </TabButton>
        <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
          Saved
        </TabButton>
      </div>

      <div className="mt-6">
        {loading && <p className="text-sm text-muted">Loading workouts…</p>}

        {!loading && tab === "plan" && (
          <PlanList
            rows={planWorkouts}
            onRemove={removeFromPlan}
            onToggleDone={toggleDone}
          />
        )}

        {!loading && tab === "saved" && (
          <SavedList
            workouts={savedWorkouts}
            onRemove={removeFromSaved}
            onAddToPlan={addToPlan}
          />
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4 py-5 text-center sm:px-6">
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? "border-accent text-ink"
          : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-line bg-surface px-6 py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase text-accent">
        Nothing here yet
      </h3>
      <p className="mt-2 max-w-xs text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-bold text-canvas"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function WorkoutRow({
  workout,
  children,
}: {
  workout: Workout;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full flex-none overflow-hidden rounded-lg sm:h-16 sm:w-24">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h4 className="font-display text-base font-bold uppercase text-ink">
          {workout.name}
        </h4>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-1.5 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-2">{children}</div>
    </div>
  );
}

function PlanList({
  rows,
  onRemove,
  onToggleDone,
}: {
  rows: { item: PlanItem; workout: Workout }[];
  onRemove: (id: number) => void;
  onToggleDone: (id: number) => void;
}) {
  if (rows.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col gap-3">
      {rows.map(({ item, workout }) => (
        <WorkoutRow key={workout.id} workout={workout}>
          <Link
            href={`/workout/${workout.id}`}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink hover:border-accent/60"
          >
            View Details
          </Link>
          <button
            onClick={() => onToggleDone(workout.id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold ${
              item.done ? "bg-white/10 text-muted" : "bg-accent text-canvas"
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
            {item.done ? "Done" : "Mark as Done"}
          </button>
          <button
            onClick={() => onRemove(workout.id)}
            aria-label="Remove from plan"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </WorkoutRow>
      ))}
    </div>
  );
}

function SavedList({
  workouts,
  onRemove,
  onAddToPlan,
}: {
  workouts: Workout[];
  onRemove: (id: number) => void;
  onAddToPlan: (id: number) => void;
}) {
  if (workouts.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col gap-3">
      {workouts.map((workout) => (
        <WorkoutRow key={workout.id} workout={workout}>
          <Link
            href={`/workout/${workout.id}`}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink hover:border-accent/60"
          >
            View Details
          </Link>
          <button
            onClick={() => onAddToPlan(workout.id)}
            className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-canvas"
          >
            Add to plan
          </button>
          <button
            onClick={() => onRemove(workout.id)}
            aria-label="Remove from saved"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </WorkoutRow>
      ))}
    </div>
  );
}

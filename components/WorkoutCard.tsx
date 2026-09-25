import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

const TAG_STYLES: Record<string, string> = {
  Chest: "bg-orange-400/15 text-orange-300",
  Arms: "bg-lime-400/15 text-lime-300",
  Back: "bg-sky-400/15 text-sky-300",
  Legs: "bg-rose-400/15 text-rose-300",
  Core: "bg-violet-400/15 text-violet-300",
  Shoulders: "bg-cyan-400/15 text-cyan-300",
  "Full Body": "bg-pink-400/15 text-pink-300",
};

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`tag-pill uppercase ${
                TAG_STYLES[tag] ?? "bg-white/10 text-ink"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold uppercase leading-tight text-ink">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
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
    </Link>
  );
}

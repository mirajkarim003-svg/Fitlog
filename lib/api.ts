import { Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load workouts");
  return res.json();
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Workout not found");
  return res.json();
}

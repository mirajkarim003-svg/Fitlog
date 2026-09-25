"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { getWorkouts } from "@/lib/api";
import { PlanItem, Workout } from "@/lib/types";

const PLAN_CAP = 5;
const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";

interface AppContextValue {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  plan: PlanItem[];
  saved: number[];
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  toggleDone: (id: number) => void;
  addToSaved: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  getWorkout: (id: number) => Workout | undefined;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    getWorkouts()
      .then((data) => {
        if (!cancelled) {
          setWorkouts(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't load the workout library. Try refreshing.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPlan(readStorage<PlanItem[]>(PLAN_KEY, []));
    setSaved(readStorage<number[]>(SAVED_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const showToast = useCallback((message: string) => {
    toast(message);
  }, []);

  const isInPlan = useCallback(
    (id: number) => plan.some((p) => p.id === id),
    [plan],
  );

  const isSaved = useCallback(
    (id: number) => saved.includes(id),
    [saved],
  );

  const addToPlan = useCallback(
    (id: number) => {
      if (isInPlan(id)) {
        showToast("Already in today's plan");
        return;
      }

      if (plan.length >= PLAN_CAP) {
        showToast(`Today's plan is full (${PLAN_CAP}/${PLAN_CAP})`);
        return;
      }

      setPlan((prev) => [...prev, { id, done: false }]);

      showToast("Added to today's plan");
    },
    [plan, isInPlan, showToast],
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setPlan((prev) => prev.filter((p) => p.id !== id));

      showToast("Removed from today's plan");
    },
    [showToast],
  );

  const toggleDone = useCallback(
    (id: number) => {
      setPlan((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, done: !p.done } : p,
        ),
      );

      showToast("Workout marked as done");
    },
    [showToast],
  );

  const addToSaved = useCallback(
    (id: number) => {
      if (isSaved(id)) {
        showToast("Already saved for later");
        return;
      }

      setSaved((prev) => [...prev, id]);

      showToast("Saved for later");
    },
    [isSaved, showToast],
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setSaved((prev) => prev.filter((s) => s !== id));

      showToast("Removed from saved");
    },
    [showToast],
  );

  const getWorkout = useCallback(
    (id: number) => workouts.find((w) => w.id === id),
    [workouts],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      workouts,
      loading,
      error,
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      toggleDone,
      addToSaved,
      removeFromSaved,
      isInPlan,
      isSaved,
      getWorkout,
      showToast,
    }),
    [
      workouts,
      loading,
      error,
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      toggleDone,
      addToSaved,
      removeFromSaved,
      isInPlan,
      isSaved,
      getWorkout,
      showToast,
    ],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }

  return ctx;
}

export const PLAN_LIMIT = PLAN_CAP;

# FitLog — Workout Library

A dark, no-nonsense gym companion. Browse a library of lifts, open a workout to
see full instructions and stats, then lock it into today's plan or save it for
later — all tracked live in the navbar.

## Technologies used

- **Next.js 14** (App Router) — routing, layouts, client components
- **TypeScript** — typed components, context and API layer
- **Tailwind CSS** — styling and responsive layout
- **lucide-react** — icon set
- **Workout data** served from `https://api.abcz.workers.dev/api/fitlog`

## Features

1. **Responsive workout library** — a 3‑column grid on desktop that collapses
   to 2 and then 1 column on tablet/mobile, with sort (Duration / Calories /
   Rating) and a name/tag search.
2. **Workout detail pages** — dynamic route per lift with specs table,
   step‑by‑step instructions, and Add to Plan / Save for Later actions.
3. **Live navbar badges** — "Plan" and "Saved" pill counters update instantly
   and link straight to `/my-plan`.
4. **My Plan dashboard** — Exercises / Minutes / Calories summary, Today's
   Plan vs Saved tabs, mark‑as‑done, remove, and a 5‑lift daily cap.
5. **Persistent state & polish** — plan/saved data is stored in
   `localStorage` so it survives a reload, with toast notifications, loading
   states, and a themed 404 page for unknown routes.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
```

## Project structure

```
app/                 routes (home, workout/[id], my-plan, not-found)
components/           Navbar, Hero, Footer, WorkoutCard, SortDropdown
context/AppContext.tsx  workout data, plan/saved state, toasts
lib/                  API helper + shared types
```

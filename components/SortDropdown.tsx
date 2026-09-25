"use client";

import { ChevronDown } from "lucide-react";
import { SortKey } from "@/lib/types";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink">
      <span className="text-muted">Sort By</span>
      <div className="relative flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none bg-transparent pr-5 font-semibold text-ink focus:outline-none"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key} className="bg-surface text-ink">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-muted" />
      </div>
    </label>
  );
}

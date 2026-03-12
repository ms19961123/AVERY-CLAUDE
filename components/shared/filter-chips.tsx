"use client";

import { cn } from "@/lib/utils";

interface FilterChipsProps {
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

export function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
            selected === option.value
              ? "bg-navy-700 text-white shadow-sm"
              : "bg-navy-50 text-navy-500 hover:bg-navy-100"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

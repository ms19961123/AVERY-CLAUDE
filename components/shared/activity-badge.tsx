"use client";

import { getCategoryColor } from "@/lib/utils";
import { ActivityCategory } from "@/types";
import { cn } from "@/lib/utils";

interface ActivityBadgeProps {
  category: ActivityCategory;
  className?: string;
}

export function ActivityBadge({ category, className }: ActivityBadgeProps) {
  const label =
    category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        getCategoryColor(category),
        className
      )}
    >
      {label}
    </span>
  );
}

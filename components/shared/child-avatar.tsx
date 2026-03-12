"use client";

import { cn } from "@/lib/utils";

interface ChildAvatarProps {
  name: string;
  avatar: string;
  color: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

const colorClasses: Record<string, string> = {
  teal: "bg-teal-100 text-teal-700",
  navy: "bg-navy-100 text-navy-700",
  sage: "bg-sage-100 text-sage-600",
};

export function ChildAvatar({
  name,
  avatar,
  color,
  size = "md",
}: ChildAvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold",
        sizeClasses[size],
        colorClasses[color] || "bg-gray-100 text-gray-700"
      )}
      title={name}
    >
      {avatar}
    </div>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ActivityCategory } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryColor(category: ActivityCategory): string {
  const colors: Record<ActivityCategory, string> = {
    school: "bg-navy-100 text-navy-700 border-navy-200",
    sports: "bg-teal-100 text-teal-700 border-teal-200",
    music: "bg-purple-100 text-purple-700 border-purple-200",
    tutoring: "bg-blue-100 text-blue-700 border-blue-200",
    family: "bg-sage-100 text-sage-600 border-sage-200",
    appointment: "bg-amber-100 text-amber-700 border-amber-200",
    social: "bg-pink-100 text-pink-700 border-pink-200",
    free: "bg-cream-100 text-cream-500 border-cream-200",
  };
  return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
}

export function getCategoryDot(category: ActivityCategory): string {
  const colors: Record<ActivityCategory, string> = {
    school: "bg-navy-500",
    sports: "bg-teal-500",
    music: "bg-purple-500",
    tutoring: "bg-blue-500",
    family: "bg-sage-500",
    appointment: "bg-amber-500",
    social: "bg-pink-500",
    free: "bg-cream-400",
  };
  return colors[category] || "bg-gray-500";
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    low: "bg-amber-50 text-amber-700 border-amber-200",
    medium: "bg-orange-50 text-orange-700 border-orange-200",
    high: "bg-coral-400/10 text-coral-500 border-coral-400/30",
  };
  return colors[severity] || "bg-gray-100 text-gray-700";
}

export function getChildColor(childId: string): string {
  const colors: Record<string, string> = {
    child1: "bg-teal-500",
    child2: "bg-navy-500",
    child3: "bg-sage-500",
    family: "bg-cream-500",
  };
  return colors[childId] || "bg-gray-500";
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

export function getTimeDurationHours(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em - (sh * 60 + sm)) / 60;
}

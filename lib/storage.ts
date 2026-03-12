"use client";

import { AppState, Child, Activity, FamilySettings, ConflictStatus, FreeTimeStatus, OnboardingData, PlanningStyle } from "@/types";

const STORAGE_KEY = "family-flow-state";

const defaultOnboarding: OnboardingData = {
  completed: false,
  familyName: "",
  parentName: "",
  children: [],
  planningStyle: "balanced",
  preferredDowntimeHours: 2,
  travelBufferMinutes: 15,
  maxActivitiesPerDay: 3,
};

const defaultSettings: FamilySettings = {
  preferredDowntimeHours: 2,
  maxActivitiesPerDay: 3,
  travelBufferMinutes: 15,
  planningStyle: "balanced",
  notifyConflicts: true,
  notifyFreeTime: true,
  notifyWeeklyPlan: true,
  familyName: "The Johnsons",
  parentName: "Sarah",
};

export function getStoredState(): AppState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AppState;
  } catch {
    return null;
  }
}

export function saveState(state: Partial<AppState>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredState() || getDefaultState();
    const merged = { ...existing, ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage full or unavailable
  }
}

export function getDefaultState(): AppState {
  return {
    onboarding: defaultOnboarding,
    children: [],
    activities: [],
    settings: defaultSettings,
    conflictStatuses: {},
    freeTimeStatuses: {},
    savedSuggestions: [],
    tryThisWeekSuggestions: [],
  };
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function isOnboardingComplete(): boolean {
  const state = getStoredState();
  return state?.onboarding?.completed ?? false;
}

export function saveOnboarding(data: OnboardingData): void {
  saveState({ onboarding: data });
  if (data.completed) {
    saveState({
      onboarding: data,
      children: data.children,
      settings: {
        ...defaultSettings,
        familyName: data.familyName,
        parentName: data.parentName,
        planningStyle: data.planningStyle,
        preferredDowntimeHours: data.preferredDowntimeHours,
        travelBufferMinutes: data.travelBufferMinutes,
        maxActivitiesPerDay: data.maxActivitiesPerDay,
      },
    });
  }
}

export function saveChildren(children: Child[]): void {
  saveState({ children });
}

export function saveActivities(activities: Activity[]): void {
  saveState({ activities });
}

export function saveSettings(settings: FamilySettings): void {
  saveState({ settings });
}

export function saveConflictStatus(conflictId: string, status: ConflictStatus, chosenResolutionId?: string): void {
  const existing = getStoredState() || getDefaultState();
  const statuses = { ...existing.conflictStatuses, [conflictId]: { status, chosenResolutionId } };
  saveState({ conflictStatuses: statuses });
}

export function saveFreeTimeStatus(blockId: string, status: FreeTimeStatus): void {
  const existing = getStoredState() || getDefaultState();
  const statuses = { ...existing.freeTimeStatuses, [blockId]: status };
  saveState({ freeTimeStatuses: statuses });
}

export function toggleSavedSuggestion(suggestionId: string): void {
  const existing = getStoredState() || getDefaultState();
  const saved = existing.savedSuggestions.includes(suggestionId)
    ? existing.savedSuggestions.filter((id) => id !== suggestionId)
    : [...existing.savedSuggestions, suggestionId];
  saveState({ savedSuggestions: saved });
}

export function toggleTryThisWeek(suggestionId: string): void {
  const existing = getStoredState() || getDefaultState();
  const list = existing.tryThisWeekSuggestions.includes(suggestionId)
    ? existing.tryThisWeekSuggestions.filter((id) => id !== suggestionId)
    : [...existing.tryThisWeekSuggestions, suggestionId];
  saveState({ tryThisWeekSuggestions: list });
}

export function generateId(): string {
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

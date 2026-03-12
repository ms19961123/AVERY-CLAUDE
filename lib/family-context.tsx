"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Child,
  Activity,
  FamilySettings,
  Conflict,
  ConflictResolution,
  ConflictStatus,
  FreeTimeBlock,
  FreeTimeStatus,
  Suggestion,
  OnboardingData,
  DayOfWeek,
} from "@/types";
import {
  children as defaultChildren,
  activities as defaultActivities,
  freeTimeBlocks as defaultFreeTimeBlocks,
  suggestions as defaultSuggestions,
  familySettings as defaultFamilySettings,
} from "@/data/mock-data";
import {
  getStoredState,
  saveState,
  getDefaultState,
  saveOnboarding,
  saveChildren,
  saveActivities,
  saveSettings,
  saveConflictStatus,
  saveFreeTimeStatus,
  toggleSavedSuggestion,
  toggleTryThisWeek,
  clearAllData,
  generateId,
} from "@/lib/storage";
import { getTimeDurationHours } from "@/lib/utils";

interface FamilyContextValue {
  // Onboarding
  onboarding: OnboardingData;
  isOnboarded: boolean;
  completeOnboarding: (data: OnboardingData) => void;

  // Children
  children: Child[];
  addChild: (child: Omit<Child, "id">) => void;
  updateChild: (child: Child) => void;
  removeChild: (id: string) => void;

  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id">) => void;
  updateActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;

  // Settings
  settings: FamilySettings;
  updateSettings: (settings: FamilySettings) => void;

  // Conflicts
  conflicts: Conflict[];
  conflictStatuses: Record<string, { status: ConflictStatus; chosenResolutionId?: string }>;
  resolveConflict: (conflictId: string, resolutionId?: string) => void;
  reviewConflict: (conflictId: string) => void;

  // Free Time
  freeTimeBlocks: FreeTimeBlock[];
  freeTimeStatuses: Record<string, FreeTimeStatus>;
  setFreeTimeStatus: (blockId: string, status: FreeTimeStatus) => void;

  // Suggestions
  suggestions: Suggestion[];
  savedSuggestions: string[];
  tryThisWeekSuggestions: string[];
  toggleSaved: (id: string) => void;
  toggleTryWeek: (id: string) => void;

  // Helpers
  getChildName: (id: string) => string;
  resetData: () => void;
}

const FamilyContext = createContext<FamilyContextValue | null>(null);

export function FamilyProvider({ children: childrenProp }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [onboarding, setOnboarding] = useState<OnboardingData>(getDefaultState().onboarding);
  const [childrenData, setChildrenData] = useState<Child[]>(defaultChildren);
  const [activitiesData, setActivitiesData] = useState<Activity[]>(defaultActivities);
  const [settings, setSettings] = useState<FamilySettings>({
    ...defaultFamilySettings,
    familyName: "The Johnsons",
    parentName: "Sarah",
  });
  const [conflictStatuses, setConflictStatuses] = useState<Record<string, { status: ConflictStatus; chosenResolutionId?: string }>>({});
  const [freeTimeStatuses, setFreeTimeStatuses] = useState<Record<string, FreeTimeStatus>>({});
  const [savedSuggestionIds, setSavedSuggestionIds] = useState<string[]>([]);
  const [tryThisWeekIds, setTryThisWeekIds] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getStoredState();
    if (stored) {
      setOnboarding(stored.onboarding);
      if (stored.children.length > 0) setChildrenData(stored.children);
      if (stored.activities.length > 0) setActivitiesData(stored.activities);
      if (stored.settings) setSettings(stored.settings);
      if (stored.conflictStatuses) setConflictStatuses(stored.conflictStatuses);
      if (stored.freeTimeStatuses) setFreeTimeStatuses(stored.freeTimeStatuses);
      if (stored.savedSuggestions) setSavedSuggestionIds(stored.savedSuggestions);
      if (stored.tryThisWeekSuggestions) setTryThisWeekIds(stored.tryThisWeekSuggestions);
    }
    setIsLoaded(true);
  }, []);

  // Detect conflicts from activities
  const conflicts = React.useMemo(() => {
    return detectConflicts(activitiesData);
  }, [activitiesData]);

  const completeOnboarding = useCallback((data: OnboardingData) => {
    const completed = { ...data, completed: true };
    setOnboarding(completed);
    saveOnboarding(completed);
    if (data.children.length > 0) {
      setChildrenData(data.children);
    }
    setSettings((prev) => ({
      ...prev,
      familyName: data.familyName,
      parentName: data.parentName,
      planningStyle: data.planningStyle,
      preferredDowntimeHours: data.preferredDowntimeHours,
      travelBufferMinutes: data.travelBufferMinutes,
      maxActivitiesPerDay: data.maxActivitiesPerDay,
    }));
  }, []);

  const addChild = useCallback((child: Omit<Child, "id">) => {
    const newChild = { ...child, id: generateId() };
    setChildrenData((prev) => {
      const updated = [...prev, newChild];
      saveChildren(updated);
      return updated;
    });
  }, []);

  const updateChild = useCallback((child: Child) => {
    setChildrenData((prev) => {
      const updated = prev.map((c) => (c.id === child.id ? child : c));
      saveChildren(updated);
      return updated;
    });
  }, []);

  const removeChild = useCallback((id: string) => {
    setChildrenData((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveChildren(updated);
      return updated;
    });
  }, []);

  const addActivity = useCallback((activity: Omit<Activity, "id">) => {
    const newActivity = { ...activity, id: generateId() };
    setActivitiesData((prev) => {
      const updated = [...prev, newActivity];
      saveActivities(updated);
      return updated;
    });
  }, []);

  const updateActivity = useCallback((activity: Activity) => {
    setActivitiesData((prev) => {
      const updated = prev.map((a) => (a.id === activity.id ? activity : a));
      saveActivities(updated);
      return updated;
    });
  }, []);

  const removeActivity = useCallback((id: string) => {
    setActivitiesData((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveActivities(updated);
      return updated;
    });
  }, []);

  const updateSettingsFn = useCallback((newSettings: FamilySettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  }, []);

  const resolveConflict = useCallback((conflictId: string, resolutionId?: string) => {
    setConflictStatuses((prev) => {
      const updated = { ...prev, [conflictId]: { status: "resolved" as ConflictStatus, chosenResolutionId: resolutionId } };
      saveState({ conflictStatuses: updated });
      return updated;
    });
  }, []);

  const reviewConflict = useCallback((conflictId: string) => {
    setConflictStatuses((prev) => {
      const updated = { ...prev, [conflictId]: { status: "reviewed" as ConflictStatus } };
      saveState({ conflictStatuses: updated });
      return updated;
    });
  }, []);

  const setFreeTimeStatusFn = useCallback((blockId: string, status: FreeTimeStatus) => {
    setFreeTimeStatuses((prev) => {
      const updated = { ...prev, [blockId]: status };
      saveState({ freeTimeStatuses: updated });
      return updated;
    });
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedSuggestionIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveState({ savedSuggestions: updated });
      return updated;
    });
  }, []);

  const toggleTryWeek = useCallback((id: string) => {
    setTryThisWeekIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveState({ tryThisWeekSuggestions: updated });
      return updated;
    });
  }, []);

  const getChildNameFn = useCallback((id: string): string => {
    if (id === "family") return "Family";
    return childrenData.find((c) => c.id === id)?.name ?? "Unknown";
  }, [childrenData]);

  const resetData = useCallback(() => {
    clearAllData();
    setOnboarding(getDefaultState().onboarding);
    setChildrenData(defaultChildren);
    setActivitiesData(defaultActivities);
    setSettings({ ...defaultFamilySettings, familyName: "The Johnsons", parentName: "Sarah" });
    setConflictStatuses({});
    setFreeTimeStatuses({});
    setSavedSuggestionIds([]);
    setTryThisWeekIds([]);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-navy-400 text-sm">Loading Family Flow...</div>
      </div>
    );
  }

  return (
    <FamilyContext.Provider
      value={{
        onboarding,
        isOnboarded: onboarding.completed,
        completeOnboarding,
        children: childrenData,
        addChild,
        updateChild,
        removeChild,
        activities: activitiesData,
        addActivity,
        updateActivity,
        removeActivity,
        settings,
        updateSettings: updateSettingsFn,
        conflicts,
        conflictStatuses,
        resolveConflict,
        reviewConflict,
        freeTimeBlocks: defaultFreeTimeBlocks,
        freeTimeStatuses,
        setFreeTimeStatus: setFreeTimeStatusFn,
        suggestions: defaultSuggestions,
        savedSuggestions: savedSuggestionIds,
        tryThisWeekSuggestions: tryThisWeekIds,
        toggleSaved,
        toggleTryWeek,
        getChildName: getChildNameFn,
        resetData,
      }}
    >
      {childrenProp}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error("useFamily must be used within FamilyProvider");
  return ctx;
}

// Conflict detection engine
function detectConflicts(activities: Activity[]): Conflict[] {
  const conflicts: Conflict[] = [];
  const days: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  for (const day of days) {
    const dayActs = activities.filter((a) => a.day === day);
    for (let i = 0; i < dayActs.length; i++) {
      for (let j = i + 1; j < dayActs.length; j++) {
        const a = dayActs[i];
        const b = dayActs[j];
        if (a.childId === b.childId) continue; // same child can't be in two places, but that's expected
        if (a.category === "school" && b.category === "school") continue;

        // Check time overlap
        if (a.startTime < b.endTime && b.startTime < a.endTime) {
          // Check if both need a parent (different locations for different children)
          const bothNeedParent =
            a.childId !== b.childId &&
            a.childId !== "family" &&
            b.childId !== "family" &&
            a.location !== b.location;

          if (bothNeedParent || a.childId === b.childId) {
            const overlapMinutes = calculateOverlap(a.startTime, a.endTime, b.startTime, b.endTime);
            const severity = overlapMinutes > 60 ? "high" : overlapMinutes > 30 ? "medium" : "low";

            // Avoid duplicate conflicts
            const conflictKey = [a.id, b.id].sort().join("-");
            if (conflicts.some((c) => [c.activities[0].id, c.activities[1].id].sort().join("-") === conflictKey)) {
              continue;
            }

            conflicts.push({
              id: `conflict_${conflictKey}`,
              activities: [a, b],
              severity: severity as any,
              description: generateConflictDescription(a, b, overlapMinutes),
              suggestions: generateResolutions(a, b),
              status: "unresolved",
            });
          }
        }
      }
    }
  }

  return conflicts.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
}

function calculateOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): number {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const overlapStart = Math.max(toMin(aStart), toMin(bStart));
  const overlapEnd = Math.min(toMin(aEnd), toMin(bEnd));
  return Math.max(0, overlapEnd - overlapStart);
}

function generateConflictDescription(a: Activity, b: Activity, overlapMinutes: number): string {
  return `${a.title} and ${b.title} overlap by ${overlapMinutes} minutes on ${a.day}. Both activities are at different locations and require parent coordination.`;
}

function generateResolutions(a: Activity, b: Activity): ConflictResolution[] {
  const resolutions: ConflictResolution[] = [];

  resolutions.push({
    id: `res_${a.id}_${b.id}_1`,
    title: `Reschedule ${b.title}`,
    description: `Move ${b.title} to a different time slot to avoid the overlap with ${a.title}.`,
    type: "reschedule",
  });

  resolutions.push({
    id: `res_${a.id}_${b.id}_2`,
    title: "Split parent coverage",
    description: `One parent handles ${a.title} while the other manages ${b.title}.`,
    type: "delegate",
  });

  if (a.category === "sports" || b.category === "sports") {
    resolutions.push({
      id: `res_${a.id}_${b.id}_3`,
      title: "Arrange carpool",
      description: `Ask another family to help with drop-off for ${a.category === "sports" ? a.title : b.title}.`,
      type: "carpool",
    });
  }

  return resolutions;
}

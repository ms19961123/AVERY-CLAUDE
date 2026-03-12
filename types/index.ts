export type ActivityCategory =
  | "school"
  | "sports"
  | "music"
  | "tutoring"
  | "family"
  | "appointment"
  | "social"
  | "free";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ConflictSeverity = "low" | "medium" | "high";

export type EnergyLevel = "low" | "medium" | "high";

export type FreeTimeQuality =
  | "short-reset"
  | "family-window"
  | "creative-activity"
  | "outdoor-activity"
  | "leave-unscheduled";

export type PlanningStyle = "balanced" | "lightly-structured" | "growth-focused";

export interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  interests: string[];
  preferredDowntime: string;
  color: string;
}

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  childId: string | "family";
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  location?: string;
  recurring: boolean;
  notes?: string;
}

export interface Conflict {
  id: string;
  activities: [Activity, Activity];
  severity: ConflictSeverity;
  description: string;
  suggestions: ConflictResolution[];
}

export interface ConflictResolution {
  id: string;
  title: string;
  description: string;
  type: "reschedule" | "carpool" | "adjust" | "delegate";
}

export interface FreeTimeBlock {
  id: string;
  childId: string | "family";
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  quality: FreeTimeQuality;
  label: string;
  isProtected: boolean;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  idealTimeWindow: string;
  energyLevel: EnergyLevel;
  tags: string[];
  forChildId: string | "family";
  whyItFits: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: "parent" | "child";
}

export interface Family {
  id: string;
  name: string;
  members: FamilyMember[];
}

export interface WeeklyPlanDay {
  day: DayOfWeek;
  activities: Activity[];
  logistics: string[];
  conflictNotes: string[];
  freeTimeNotes: string[];
  downtimeReminder?: string;
}

export interface FamilySettings {
  preferredDowntimeHours: number;
  maxActivitiesPerDay: number;
  travelBufferMinutes: number;
  planningStyle: PlanningStyle;
  notifyConflicts: boolean;
  notifyFreeTime: boolean;
  notifyWeeklyPlan: boolean;
}

export interface DayLoad {
  day: DayOfWeek;
  hours: number;
  activities: number;
}

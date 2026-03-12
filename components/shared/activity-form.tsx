"use client";

import { useState, useEffect } from "react";
import { Activity, ActivityCategory, DayOfWeek } from "@/types";
import { Button } from "@/components/ui/button";
import { FormField, TextInput, SelectInput } from "@/components/shared/form-field";
import { useFamily } from "@/lib/family-context";
import { generateId } from "@/lib/storage";

const categories: { value: ActivityCategory; label: string }[] = [
  { value: "school", label: "School" },
  { value: "sports", label: "Sports" },
  { value: "music", label: "Music / Art" },
  { value: "tutoring", label: "Tutoring" },
  { value: "family", label: "Family" },
  { value: "appointment", label: "Appointment" },
  { value: "social", label: "Social" },
  { value: "free", label: "Free Time" },
];

const days: { value: DayOfWeek; label: string }[] = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

interface ActivityFormProps {
  activity?: Activity;
  onSave: (activity: Activity | Omit<Activity, "id">) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function ActivityForm({ activity, onSave, onCancel, onDelete }: ActivityFormProps) {
  const { children } = useFamily();
  const [title, setTitle] = useState(activity?.title ?? "");
  const [category, setCategory] = useState<ActivityCategory>(activity?.category ?? "family");
  const [childId, setChildId] = useState(activity?.childId ?? "family");
  const [day, setDay] = useState<DayOfWeek>(activity?.day ?? "Monday");
  const [startTime, setStartTime] = useState(activity?.startTime ?? "09:00");
  const [endTime, setEndTime] = useState(activity?.endTime ?? "10:00");
  const [location, setLocation] = useState(activity?.location ?? "");
  const [recurring, setRecurring] = useState(activity?.recurring ?? false);
  const [notes, setNotes] = useState(activity?.notes ?? "");

  const childOptions = [
    { value: "family", label: "Whole Family" },
    ...children.map((c) => ({ value: c.id, label: c.name })),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const data = {
      ...(activity ? { id: activity.id } : {}),
      title: title.trim(),
      category,
      childId,
      day,
      startTime,
      endTime,
      location: location.trim() || undefined,
      recurring,
      notes: notes.trim() || undefined,
    };

    onSave(data as any);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Activity Name">
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Soccer Practice"
          required
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category">
          <SelectInput
            value={category}
            onChange={(e) => setCategory(e.target.value as ActivityCategory)}
            options={categories}
          />
        </FormField>
        <FormField label="For">
          <SelectInput
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            options={childOptions}
          />
        </FormField>
      </div>

      <FormField label="Day">
        <SelectInput
          value={day}
          onChange={(e) => setDay(e.target.value as DayOfWeek)}
          options={days}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Start Time">
          <TextInput
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormField>
        <FormField label="End Time">
          <TextInput
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Location" hint="Optional">
        <TextInput
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Community Field"
        />
      </FormField>

      <FormField label="Notes" hint="Optional">
        <TextInput
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any extra details"
        />
      </FormField>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRecurring(!recurring)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border ${
            recurring
              ? "bg-teal-50 text-teal-700 border-teal-200"
              : "bg-white text-navy-500 border-navy-200 hover:bg-navy-50"
          }`}
        >
          <div
            className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors ${
              recurring ? "bg-teal-500 border-teal-500" : "border-navy-300"
            }`}
          >
            {recurring && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          Recurring weekly
        </button>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit">{activity ? "Save Changes" : "Add Activity"}</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        {activity && onDelete && (
          <Button
            type="button"
            variant="ghost"
            onClick={onDelete}
            className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}

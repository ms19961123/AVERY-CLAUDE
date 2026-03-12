"use client";

import { useState } from "react";
import { Child } from "@/types";
import { Button } from "@/components/ui/button";
import { FormField, TextInput, SelectInput } from "@/components/shared/form-field";
import { X } from "lucide-react";

const colorOptions = [
  { value: "teal", label: "Teal" },
  { value: "navy", label: "Navy" },
  { value: "sage", label: "Sage" },
];

const gradeOptions = [
  { value: "Pre-K", label: "Pre-K" },
  { value: "Kindergarten", label: "Kindergarten" },
  { value: "1st Grade", label: "1st Grade" },
  { value: "2nd Grade", label: "2nd Grade" },
  { value: "3rd Grade", label: "3rd Grade" },
  { value: "4th Grade", label: "4th Grade" },
  { value: "5th Grade", label: "5th Grade" },
  { value: "6th Grade", label: "6th Grade" },
  { value: "7th Grade", label: "7th Grade" },
  { value: "8th Grade", label: "8th Grade" },
  { value: "9th Grade", label: "9th Grade" },
  { value: "10th Grade", label: "10th Grade" },
  { value: "11th Grade", label: "11th Grade" },
  { value: "12th Grade", label: "12th Grade" },
];

interface ChildFormProps {
  child?: Child;
  onSave: (child: Child | Omit<Child, "id">) => void;
  onCancel: () => void;
}

export function ChildForm({ child, onSave, onCancel }: ChildFormProps) {
  const [name, setName] = useState(child?.name ?? "");
  const [age, setAge] = useState(child?.age ?? 6);
  const [grade, setGrade] = useState(child?.grade ?? "Kindergarten");
  const [color, setColor] = useState(child?.color ?? "teal");
  const [interests, setInterests] = useState<string[]>(child?.interests ?? []);
  const [newInterest, setNewInterest] = useState("");
  const [preferredDowntime, setPreferredDowntime] = useState(
    child?.preferredDowntime ?? ""
  );

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const data = {
      ...(child ? { id: child.id } : {}),
      name: name.trim(),
      age,
      grade,
      avatar: name.trim().charAt(0).toUpperCase(),
      color,
      interests,
      preferredDowntime: preferredDowntime.trim() || "Relaxing at home",
    };

    onSave(data as any);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Name">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Emma"
            required
          />
        </FormField>
        <FormField label="Age">
          <TextInput
            type="number"
            min={2}
            max={18}
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 6)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Grade">
          <SelectInput
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            options={gradeOptions}
          />
        </FormField>
        <FormField label="Color Theme">
          <SelectInput
            value={color}
            onChange={(e) => setColor(e.target.value)}
            options={colorOptions}
          />
        </FormField>
      </div>

      <FormField label="Interests">
        <div className="flex flex-wrap gap-2 mb-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200"
            >
              {interest}
              <button
                type="button"
                onClick={() => handleRemoveInterest(interest)}
                className="text-teal-400 hover:text-teal-600"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <TextInput
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddInterest();
              }
            }}
          />
          <Button type="button" variant="outline" size="sm" onClick={handleAddInterest}>
            Add
          </Button>
        </div>
      </FormField>

      <FormField label="Preferred Downtime" hint="How does this child prefer to relax?">
        <TextInput
          value={preferredDowntime}
          onChange={(e) => setPreferredDowntime(e.target.value)}
          placeholder="e.g. Reading quietly or drawing"
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit">{child ? "Save Changes" : "Add Child"}</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

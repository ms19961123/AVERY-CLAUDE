"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Clock,
  Bell,
  Palette,
  Users,
  Car,
  Target,
  Shield,
  Heart,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ChildAvatar } from "@/components/shared/child-avatar";
import { familySettings, children, family } from "@/data/mock-data";
import { PlanningStyle } from "@/types";

const planningStyles: {
  value: PlanningStyle;
  label: string;
  description: string;
}[] = [
  {
    value: "balanced",
    label: "Balanced",
    description:
      "A mix of structured activities and free time. Recommended for most families.",
  },
  {
    value: "lightly-structured",
    label: "Lightly Structured",
    description:
      "Prioritizes free time and downtime. Fewer activity suggestions.",
  },
  {
    value: "growth-focused",
    label: "Growth Focused",
    description:
      "More activity suggestions aligned with children's interests and development goals.",
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(familySettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Customize how Family Flow plans and recommends for your family."
        icon={Settings}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Planning Style */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} className="text-teal-600" />
                <h3 className="font-semibold text-navy-800">Planning Style</h3>
              </div>
              <div className="space-y-3">
                {planningStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() =>
                      setSettings({ ...settings, planningStyle: style.value })
                    }
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      settings.planningStyle === style.value
                        ? "border-teal-500 bg-teal-50/50"
                        : "border-navy-100 hover:border-navy-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-navy-800">
                        {style.label}
                      </span>
                      {settings.planningStyle === style.value && (
                        <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-navy-400 mt-1">
                      {style.description}
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={18} className="text-teal-600" />
                <h3 className="font-semibold text-navy-800">
                  Schedule Preferences
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-navy-700">
                        Preferred Daily Downtime
                      </p>
                      <p className="text-xs text-navy-400">
                        Minimum free hours per day for each child
                      </p>
                    </div>
                    <span className="text-sm font-bold text-teal-600">
                      {settings.preferredDowntimeHours} hrs
                    </span>
                  </div>
                  <Slider
                    value={[settings.preferredDowntimeHours]}
                    onValueChange={([v]) =>
                      setSettings({ ...settings, preferredDowntimeHours: v })
                    }
                    min={0.5}
                    max={4}
                    step={0.5}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-navy-700">
                        Max Activities Per Day
                      </p>
                      <p className="text-xs text-navy-400">
                        Alert when a child exceeds this
                      </p>
                    </div>
                    <span className="text-sm font-bold text-teal-600">
                      {settings.maxActivitiesPerDay}
                    </span>
                  </div>
                  <Slider
                    value={[settings.maxActivitiesPerDay]}
                    onValueChange={([v]) =>
                      setSettings({ ...settings, maxActivitiesPerDay: v })
                    }
                    min={1}
                    max={5}
                    step={1}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-navy-700">
                        Travel Buffer
                      </p>
                      <p className="text-xs text-navy-400">
                        Minutes between back-to-back activities
                      </p>
                    </div>
                    <span className="text-sm font-bold text-teal-600">
                      {settings.travelBufferMinutes} min
                    </span>
                  </div>
                  <Slider
                    value={[settings.travelBufferMinutes]}
                    onValueChange={([v]) =>
                      setSettings({ ...settings, travelBufferMinutes: v })
                    }
                    min={5}
                    max={30}
                    step={5}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell size={18} className="text-teal-600" />
                <h3 className="font-semibold text-navy-800">Notifications</h3>
              </div>

              <div className="space-y-4">
                <SettingToggle
                  label="Conflict Alerts"
                  description="Notify when schedule conflicts are detected"
                  checked={settings.notifyConflicts}
                  onChange={(v) =>
                    setSettings({ ...settings, notifyConflicts: v })
                  }
                />
                <SettingToggle
                  label="Free Time Suggestions"
                  description="Suggest activities for open time blocks"
                  checked={settings.notifyFreeTime}
                  onChange={(v) =>
                    setSettings({ ...settings, notifyFreeTime: v })
                  }
                />
                <SettingToggle
                  label="Weekly Plan Ready"
                  description="Notify when the weekly plan is generated"
                  checked={settings.notifyWeeklyPlan}
                  onChange={(v) =>
                    setSettings({ ...settings, notifyWeeklyPlan: v })
                  }
                />
              </div>
            </Card>
          </motion.div>

          {/* Save Button */}
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} size="lg">
              {saved ? (
                <>
                  <Check size={16} className="mr-2" />
                  Saved!
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
            <p className="text-xs text-navy-400">
              Changes will apply to future planning suggestions.
            </p>
          </div>
        </div>

        {/* Sidebar - Family Profile */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-teal-600" />
                <h3 className="font-semibold text-navy-800">Family Profile</h3>
              </div>
              <div className="text-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 mx-auto mb-3 shadow-md">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-bold text-navy-800">{family.name}</h4>
                <p className="text-xs text-navy-400">5 members</p>
              </div>
              <div className="space-y-3">
                {children.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center gap-3 p-2 rounded-xl bg-navy-50/50"
                  >
                    <ChildAvatar
                      name={child.name}
                      avatar={child.avatar}
                      color={child.color}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-medium text-navy-700">
                        {child.name}
                      </p>
                      <p className="text-[10px] text-navy-400">
                        {child.age}y · {child.grade}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={18} className="text-teal-600" />
                <h3 className="font-semibold text-navy-800">Current Plan</h3>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-sage-50 border border-teal-100">
                <p className="text-sm font-semibold text-navy-800 mb-1">
                  {
                    planningStyles.find(
                      (s) => s.value === settings.planningStyle
                    )?.label
                  }
                </p>
                <p className="text-xs text-navy-500">
                  {
                    planningStyles.find(
                      (s) => s.value === settings.planningStyle
                    )?.description
                  }
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-navy-400">Daily downtime goal</span>
                  <span className="font-medium text-navy-700">
                    {settings.preferredDowntimeHours} hrs
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-navy-400">Max activities/day</span>
                  <span className="font-medium text-navy-700">
                    {settings.maxActivitiesPerDay}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-navy-400">Travel buffer</span>
                  <span className="font-medium text-navy-700">
                    {settings.travelBufferMinutes} min
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-navy-700">{label}</p>
        <p className="text-xs text-navy-400">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

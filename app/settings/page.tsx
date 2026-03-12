"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Users,
  Clock,
  Bell,
  Palette,
  RotateCcw,
  Check,
  Shield,
  Heart,
  Moon,
  Car,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ChildAvatar } from "@/components/shared/child-avatar";
import { TextInput } from "@/components/shared/form-field";
import { useFamily } from "@/lib/family-context";
import { PlanningStyle } from "@/types";

export default function SettingsPage() {
  const { children, settings, updateSettings, resetData } = useFamily();

  const [familyName, setFamilyName] = useState(settings.familyName);
  const [parentName, setParentName] = useState(settings.parentName);
  const [planningStyle, setPlanningStyle] = useState(settings.planningStyle);
  const [downtime, setDowntime] = useState(settings.preferredDowntimeHours);
  const [maxActs, setMaxActs] = useState(settings.maxActivitiesPerDay);
  const [buffer, setBuffer] = useState(settings.travelBufferMinutes);
  const [notifyConflicts, setNotifyConflicts] = useState(settings.notifyConflicts);
  const [notifyFreeTime, setNotifyFreeTime] = useState(settings.notifyFreeTime);
  const [notifyWeekly, setNotifyWeekly] = useState(settings.notifyWeeklyPlan);
  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleSave = () => {
    updateSettings({
      ...settings,
      familyName,
      parentName,
      planningStyle,
      preferredDowntimeHours: downtime,
      maxActivitiesPerDay: maxActs,
      travelBufferMinutes: buffer,
      notifyConflicts,
      notifyFreeTime,
      notifyWeeklyPlan: notifyWeekly,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetData();
    setShowReset(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your family profile, planning preferences, and account."
        icon={Settings}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Family Profile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-navy-400" />
                <h3 className="text-sm font-semibold text-navy-700">
                  Family Profile
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-navy-600 mb-1.5 block">
                    Family Name
                  </label>
                  <TextInput
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    placeholder="e.g. The Johnsons"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy-600 mb-1.5 block">
                    Primary Parent
                  </label>
                  <TextInput
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Sarah"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Planning Style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-4 w-4 text-navy-400" />
                <h3 className="text-sm font-semibold text-navy-700">
                  Planning Style
                </h3>
              </div>
              <div className="space-y-3">
                {([
                  {
                    value: "balanced" as PlanningStyle,
                    label: "Balanced",
                    desc: "A healthy mix of activities and downtime.",
                  },
                  {
                    value: "lightly-structured" as PlanningStyle,
                    label: "Lightly Structured",
                    desc: "More free time, fewer suggestions.",
                  },
                  {
                    value: "growth-focused" as PlanningStyle,
                    label: "Growth Focused",
                    desc: "More activity suggestions and structured goals.",
                  },
                ]).map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setPlanningStyle(style.value)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                      planningStyle === style.value
                        ? "border-teal-500 bg-teal-50/50"
                        : "border-navy-100 hover:border-navy-200"
                    }`}
                  >
                    <p className="text-sm font-medium text-navy-700">
                      {style.label}
                    </p>
                    <p className="text-xs text-navy-400 mt-0.5">{style.desc}</p>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Schedule Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-navy-400" />
                <h3 className="text-sm font-semibold text-navy-700">
                  Schedule Preferences
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Moon size={14} className="text-navy-400" />
                      <span className="text-sm text-navy-600">
                        Preferred daily downtime
                      </span>
                    </div>
                    <span className="text-sm font-bold text-teal-600">
                      {downtime} hrs
                    </span>
                  </div>
                  <Slider
                    value={[downtime]}
                    onValueChange={([v]) => setDowntime(v)}
                    min={0.5}
                    max={4}
                    step={0.5}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-navy-400" />
                      <span className="text-sm text-navy-600">
                        Max activities per child per day
                      </span>
                    </div>
                    <span className="text-sm font-bold text-teal-600">
                      {maxActs}
                    </span>
                  </div>
                  <Slider
                    value={[maxActs]}
                    onValueChange={([v]) => setMaxActs(v)}
                    min={1}
                    max={5}
                    step={1}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Car size={14} className="text-navy-400" />
                      <span className="text-sm text-navy-600">
                        Travel buffer between activities
                      </span>
                    </div>
                    <span className="text-sm font-bold text-teal-600">
                      {buffer} min
                    </span>
                  </div>
                  <Slider
                    value={[buffer]}
                    onValueChange={([v]) => setBuffer(v)}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-4 w-4 text-navy-400" />
                <h3 className="text-sm font-semibold text-navy-700">
                  Notification Preferences
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-navy-700">Conflict alerts</p>
                    <p className="text-xs text-navy-400">
                      Get notified when new conflicts are detected
                    </p>
                  </div>
                  <Switch
                    checked={notifyConflicts}
                    onCheckedChange={setNotifyConflicts}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-navy-700">Free time opportunities</p>
                    <p className="text-xs text-navy-400">
                      Suggestions for open time blocks
                    </p>
                  </div>
                  <Switch
                    checked={notifyFreeTime}
                    onCheckedChange={setNotifyFreeTime}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-navy-700">Weekly plan summary</p>
                    <p className="text-xs text-navy-400">
                      Sunday evening recap of the week ahead
                    </p>
                  </div>
                  <Switch
                    checked={notifyWeekly}
                    onCheckedChange={setNotifyWeekly}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Data / Reset */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <RotateCcw className="h-4 w-4 text-navy-400" />
                <h3 className="text-sm font-semibold text-navy-700">
                  Data & Demo
                </h3>
              </div>
              <p className="text-xs text-navy-400 mb-3">
                Reset the demo to its original state. This clears all customizations,
                onboarding data, and saved preferences.
              </p>
              {showReset ? (
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleReset}
                  >
                    Confirm Reset
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowReset(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setShowReset(true)}
                >
                  <RotateCcw size={14} className="mr-1" />
                  Reset Demo Data
                </Button>
              )}
            </Card>
          </motion.div>

          {/* Save Button */}
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              className="bg-teal-500 hover:bg-teal-600 text-white"
              onClick={handleSave}
            >
              {saved ? (
                <>
                  <Check size={16} className="mr-2" />
                  Saved!
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-sage-600"
              >
                Your preferences have been updated.
              </motion.span>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Family Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-navy-700 mb-4">
                Family Members
              </h3>
              {children.length > 0 ? (
                <div className="space-y-3">
                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center gap-3 p-2 rounded-lg"
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
                        <p className="text-xs text-navy-400">
                          Age {child.age} · {child.grade}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-navy-400">No children added yet.</p>
              )}
              <Link href="/children">
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  Manage Children
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Current Plan */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-navy-700">
                  Current Plan
                </h3>
                <Badge className="bg-navy-50 text-navy-500 border-navy-200">
                  Free
                </Badge>
              </div>
              <p className="text-xs text-navy-400 mb-3">
                You&apos;re on the Free plan. Upgrade for unlimited children,
                smart conflict resolution, and weekly planning AI.
              </p>
              <Link href="/pricing">
                <Button
                  size="sm"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <CreditCard size={14} className="mr-1" />
                  View Plans
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Settings Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-navy-700 mb-3">
                Settings Summary
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-navy-400">Planning Style</span>
                  <span className="text-navy-700 font-medium capitalize">
                    {planningStyle.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-400">Daily Downtime</span>
                  <span className="text-navy-700 font-medium">{downtime} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-400">Max Activities</span>
                  <span className="text-navy-700 font-medium">{maxActs}/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-400">Travel Buffer</span>
                  <span className="text-navy-700 font-medium">{buffer} min</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

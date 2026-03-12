"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Clock,
  Star,
  BookOpen,
  Heart,
  Activity,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChildAvatar } from "@/components/shared/child-avatar";
import { ActivityBadge } from "@/components/shared/activity-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { children, activities, getActivitiesByChild } from "@/data/mock-data";
import { formatTimeRange, getTimeDurationHours } from "@/lib/utils";
import { Child } from "@/types";

function getWeeklyLoad(childId: string): number {
  const acts = activities.filter(
    (a) => a.childId === childId && a.category !== "school"
  );
  return acts.reduce(
    (total, a) => total + getTimeDurationHours(a.startTime, a.endTime),
    0
  );
}

function getScheduleStatus(childId: string): {
  label: string;
  color: string;
} {
  const load = getWeeklyLoad(childId);
  if (load > 10)
    return {
      label: "Heavily scheduled",
      color: "bg-coral-400/10 text-coral-500 border-coral-400/30",
    };
  if (load > 6)
    return {
      label: "Moderately busy",
      color: "bg-amber-50 text-amber-600 border-amber-200",
    };
  return {
    label: "Balanced week",
    color: "bg-sage-50 text-sage-600 border-sage-200",
  };
}

export default function ChildrenPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Children"
        description="Each child's profile, schedule summary, and weekly load."
        icon={Users}
      />

      <Tabs defaultValue={children[0].id} className="space-y-6">
        <TabsList className="w-full justify-start">
          {children.map((child) => (
            <TabsTrigger key={child.id} value={child.id} className="gap-2">
              <ChildAvatar
                name={child.name}
                avatar={child.avatar}
                color={child.color}
                size="sm"
              />
              <span>{child.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {children.map((child) => (
          <TabsContent key={child.id} value={child.id}>
            <ChildProfile child={child} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ChildProfile({ child }: { child: Child }) {
  const childActivities = activities.filter(
    (a) => a.childId === child.id && a.category !== "school"
  );
  const weeklyLoad = getWeeklyLoad(child.id);
  const status = getScheduleStatus(child.id);
  const hasRoom = weeklyLoad < 8;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <ChildAvatar
            name={child.name}
            avatar={child.avatar}
            color={child.color}
            size="lg"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-navy-800">{child.name}</h2>
              <Badge className={`text-xs ${status.color}`}>{status.label}</Badge>
            </div>
            <p className="text-sm text-navy-400 mb-3">
              Age {child.age} · {child.grade}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-navy-500">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-navy-400" />
                <span>{childActivities.length} activities/week</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-navy-400" />
                <span>{weeklyLoad.toFixed(1)} hrs scheduled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity size={14} className="text-navy-400" />
                <span>
                  {hasRoom ? "Room for something new" : "Schedule is full"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interests & Downtime */}
        <Card className="p-6">
          <h3 className="text-base font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Star size={16} className="text-amber-500" />
            Interests
          </h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {child.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200"
              >
                {interest}
              </span>
            ))}
          </div>

          <h3 className="text-base font-semibold text-navy-800 mb-3 flex items-center gap-2">
            <Heart size={16} className="text-coral-400" />
            Preferred Downtime
          </h3>
          <p className="text-sm text-navy-500 bg-navy-50 rounded-xl p-3">
            {child.preferredDowntime}
          </p>
        </Card>

        {/* Weekly Schedule Summary */}
        <Card className="p-6">
          <h3 className="text-base font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-navy-500" />
            Weekly Schedule
          </h3>
          <div className="space-y-2">
            {days.map((day) => {
              const dayActs = childActivities.filter((a) => a.day === day);
              if (dayActs.length === 0) return null;
              return (
                <div key={day} className="flex items-start gap-3">
                  <span className="text-xs font-medium text-navy-400 w-10 pt-1 shrink-0">
                    {day.slice(0, 3)}
                  </span>
                  <div className="flex-1 space-y-1">
                    {dayActs.map((act) => (
                      <div
                        key={act.id}
                        className="flex items-center gap-2 p-2 rounded-lg bg-navy-50/50"
                      >
                        <ActivityBadge category={act.category} />
                        <span className="text-xs font-medium text-navy-700">
                          {act.title}
                        </span>
                        <span className="text-[10px] text-navy-400 ml-auto">
                          {formatTimeRange(act.startTime, act.endTime)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Load Indicator */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-navy-800">
            Weekly Load
          </h3>
          <span className="text-sm font-semibold text-navy-700">
            {weeklyLoad.toFixed(1)} hrs
          </span>
        </div>
        <div className="h-3 bg-navy-50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              weeklyLoad > 10
                ? "bg-coral-400"
                : weeklyLoad > 6
                ? "bg-amber-400"
                : "bg-teal-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((weeklyLoad / 15) * 100, 100)}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-navy-400">Light</span>
          <span className="text-[10px] text-navy-400">Moderate</span>
          <span className="text-[10px] text-navy-400">Heavy</span>
        </div>
      </Card>
    </motion.div>
  );
}

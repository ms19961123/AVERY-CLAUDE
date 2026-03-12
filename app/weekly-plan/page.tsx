"use client";

import { motion } from "framer-motion";
import {
  FileText,
  MapPin,
  AlertTriangle,
  Clock,
  Shield,
  Sun,
  ChevronRight,
  Calendar,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActivityBadge } from "@/components/shared/activity-badge";
import { weeklyPlan, getChildName } from "@/data/mock-data";
import { formatTimeRange } from "@/lib/utils";

export default function WeeklyPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Plan"
        description="Your AI-generated family schedule summary and planning guide."
        icon={FileText}
      />

      {/* Narrative Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-r from-navy-700 via-navy-800 to-navy-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-teal-300" />
              <span className="text-teal-300 text-sm font-medium">
                Weekly Overview
              </span>
            </div>
            <p className="text-lg leading-relaxed text-navy-100 max-w-2xl">
              This week is moderately busy.{" "}
              <span className="text-coral-400 font-medium">
                Thursday is your tightest day
              </span>{" "}
              with 7 activities across all three children.{" "}
              <span className="text-teal-300 font-medium">
                Saturday afternoon remains open
              </span>{" "}
              for family time or a low-pressure activity. Sunday is intentionally
              light — perfect for recovery.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge className="bg-teal-500/20 text-teal-200 border-teal-500/30">
                <Calendar size={12} className="mr-1" />
                33 activities total
              </Badge>
              <Badge className="bg-coral-400/20 text-coral-300 border-coral-400/30">
                <AlertTriangle size={12} className="mr-1" />4 conflicts detected
              </Badge>
              <Badge className="bg-sage-400/20 text-sage-200 border-sage-400/30">
                <Clock size={12} className="mr-1" />
                12 free time blocks
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Day Cards */}
      <div className="space-y-5">
        {weeklyPlan.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.05 }}
          >
            <Card className="overflow-hidden">
              {/* Day Header */}
              <div className="px-6 py-4 bg-navy-50/50 border-b border-navy-100/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-navy-100 shadow-sm">
                      <span className="text-sm font-bold text-navy-700">
                        {day.day.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800">
                        {day.day}
                      </h3>
                      <p className="text-xs text-navy-400">
                        {day.activities.length} activities
                      </p>
                    </div>
                  </div>
                  {day.conflictNotes.length > 0 && (
                    <Badge className="bg-coral-400/10 text-coral-500 border-coral-400/20 text-[10px]">
                      <AlertTriangle size={10} className="mr-1" />
                      {day.conflictNotes.length} conflict
                      {day.conflictNotes.length > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Activities */}
                  <div>
                    <h4 className="text-sm font-semibold text-navy-700 mb-3 flex items-center gap-1.5">
                      <Calendar size={14} className="text-navy-400" />
                      Schedule
                    </h4>
                    <div className="space-y-1.5">
                      {day.activities
                        .filter((a) => a.category !== "school")
                        .sort((a, b) =>
                          a.startTime.localeCompare(b.startTime)
                        )
                        .map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-navy-50/50 transition-colors"
                          >
                            <span className="text-[10px] font-medium text-navy-400 w-20 shrink-0">
                              {formatTimeRange(
                                activity.startTime,
                                activity.endTime
                              )}
                            </span>
                            <div className="flex items-center gap-2 min-w-0">
                              <ActivityBadge category={activity.category} />
                              <span className="text-xs font-medium text-navy-700 truncate">
                                {activity.title}
                              </span>
                              <span className="text-[10px] text-navy-400 shrink-0">
                                {getChildName(activity.childId)}
                              </span>
                            </div>
                          </div>
                        ))}
                      {day.activities.filter((a) => a.category !== "school")
                        .length === 0 && (
                        <p className="text-xs text-navy-400 italic p-2">
                          No extra activities — a lighter day.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Notes & Logistics */}
                  <div className="space-y-4">
                    {/* Logistics */}
                    {day.logistics.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
                          <MapPin size={14} className="text-navy-400" />
                          Logistics
                        </h4>
                        <ul className="space-y-1.5">
                          {day.logistics.map((note, i) => (
                            <li
                              key={i}
                              className="text-xs text-navy-500 flex items-start gap-2"
                            >
                              <ChevronRight
                                size={10}
                                className="text-navy-300 mt-1 shrink-0"
                              />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Conflicts */}
                    {day.conflictNotes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-coral-500 mb-2 flex items-center gap-1.5">
                          <AlertTriangle size={14} />
                          Conflict Notes
                        </h4>
                        <ul className="space-y-1.5">
                          {day.conflictNotes.map((note, i) => (
                            <li
                              key={i}
                              className="text-xs text-coral-500/80 flex items-start gap-2 p-2 rounded-lg bg-coral-400/5"
                            >
                              <ChevronRight
                                size={10}
                                className="text-coral-400 mt-1 shrink-0"
                              />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Free Time */}
                    {day.freeTimeNotes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-sage-600 mb-2 flex items-center gap-1.5">
                          <Sun size={14} />
                          Free Time
                        </h4>
                        <ul className="space-y-1.5">
                          {day.freeTimeNotes.map((note, i) => (
                            <li
                              key={i}
                              className="text-xs text-sage-600 flex items-start gap-2 p-2 rounded-lg bg-sage-50"
                            >
                              <ChevronRight
                                size={10}
                                className="text-sage-400 mt-1 shrink-0"
                              />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Downtime Reminder */}
                    {day.downtimeReminder && (
                      <div className="p-3 rounded-xl bg-navy-50 border border-navy-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Shield size={12} className="text-navy-400" />
                          <span className="text-xs font-semibold text-navy-600">
                            Downtime Reminder
                          </span>
                        </div>
                        <p className="text-xs text-navy-500 italic">
                          {day.downtimeReminder}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 text-center bg-cream-50 border-cream-200">
          <p className="text-sm text-navy-600 font-medium">
            &ldquo;Plans work best when they leave room for life to happen.&rdquo;
          </p>
          <p className="text-xs text-navy-400 mt-1">
            This plan is a guide, not a mandate. Adjust as your week unfolds.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

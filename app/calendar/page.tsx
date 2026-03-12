"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Filter, ChevronRight, MapPin, Clock as ClockIcon, X } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterChips } from "@/components/shared/filter-chips";
import { ActivityBadge } from "@/components/shared/activity-badge";
import { ChildAvatar } from "@/components/shared/child-avatar";
import { activities, children, getChildName, getChildById } from "@/data/mock-data";
import { formatTimeRange, getCategoryDot } from "@/lib/utils";
import { Activity, DayOfWeek, ActivityCategory } from "@/types";

const days: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const childFilters = [
  { value: "all", label: "All" },
  ...children.map((c) => ({ value: c.id, label: c.name })),
  { value: "family", label: "Family" },
];

const categoryFilters = [
  { value: "all", label: "All Categories" },
  { value: "school", label: "School" },
  { value: "sports", label: "Sports" },
  { value: "music", label: "Music/Art" },
  { value: "tutoring", label: "Tutoring" },
  { value: "family", label: "Family" },
  { value: "appointment", label: "Appointments" },
  { value: "social", label: "Social" },
];

const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

export default function CalendarPage() {
  const [childFilter, setChildFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Activity | null>(null);
  const [view, setView] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("Monday");

  const filtered = activities.filter((a) => {
    if (childFilter !== "all" && a.childId !== childFilter) return false;
    if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
    return true;
  });

  const displayDays = view === "week" ? days : [selectedDay];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="Your family's weekly schedule at a glance. Tap any event for details."
        icon={CalendarIcon}
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Filter size={14} />
            <span className="font-medium">Filter by child:</span>
          </div>
          <FilterChips
            options={childFilters}
            selected={childFilter}
            onSelect={setChildFilter}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-3">
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Filter size={14} />
            <span className="font-medium">Category:</span>
          </div>
          <FilterChips
            options={categoryFilters}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setView("week")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === "week"
                ? "bg-navy-700 text-white"
                : "bg-navy-50 text-navy-500 hover:bg-navy-100"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView("day")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === "day"
                ? "bg-navy-700 text-white"
                : "bg-navy-50 text-navy-500 hover:bg-navy-100"
            }`}
          >
            Day
          </button>
          {view === "day" && (
            <div className="flex gap-1 ml-2">
              {days.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    selectedDay === d
                      ? "bg-teal-500 text-white"
                      : "bg-navy-50 text-navy-400 hover:bg-navy-100"
                  }`}
                >
                  {d.slice(0, 3)}
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden">
          <div className={`grid ${view === "week" ? "grid-cols-7" : "grid-cols-1"} divide-x divide-navy-100`}>
            {displayDays.map((day) => {
              const dayEvents = filtered
                .filter((a) => a.day === day)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

              return (
                <div key={day} className="min-h-[400px]">
                  <div className="sticky top-0 bg-navy-50/80 backdrop-blur-sm border-b border-navy-100 px-3 py-3 text-center">
                    <p className="text-xs font-medium text-navy-400 uppercase">
                      {view === "week" ? day.slice(0, 3) : day}
                    </p>
                  </div>
                  <div className="p-2 space-y-1.5">
                    {dayEvents.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-xs text-navy-300">No events</p>
                      </div>
                    )}
                    {dayEvents.map((event) => {
                      const child = getChildById(event.childId);
                      return (
                        <button
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className="w-full text-left group"
                        >
                          <div className="rounded-xl border border-navy-100/50 bg-white p-2.5 hover:shadow-md hover:border-navy-200 transition-all cursor-pointer">
                            <div className="flex items-center gap-1.5 mb-1">
                              <div
                                className={`h-2 w-2 rounded-full ${getCategoryDot(
                                  event.category
                                )}`}
                              />
                              <span className="text-[10px] font-medium text-navy-400">
                                {formatTimeRange(
                                  event.startTime,
                                  event.endTime
                                )}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-navy-700 leading-tight mb-1">
                              {event.title}
                            </p>
                            <p className="text-[10px] text-navy-400">
                              {getChildName(event.childId)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-navy-100 p-6"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-navy-50 text-navy-400"
              >
                <X size={16} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-3 w-3 rounded-full ${getCategoryDot(selectedEvent.category)}`} />
                <h3 className="text-lg font-bold text-navy-800">
                  {selectedEvent.title}
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <ClockIcon size={14} className="text-navy-400" />
                  <span>
                    {selectedEvent.day},{" "}
                    {formatTimeRange(selectedEvent.startTime, selectedEvent.endTime)}
                  </span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-sm text-navy-600">
                    <MapPin size={14} className="text-navy-400" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-navy-500">For:</span>
                  <span className="text-sm font-medium text-navy-700">
                    {getChildName(selectedEvent.childId)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-navy-500">Category:</span>
                  <ActivityBadge category={selectedEvent.category} />
                </div>
                {selectedEvent.notes && (
                  <div className="p-3 rounded-xl bg-navy-50 border border-navy-100">
                    <p className="text-sm text-navy-600">{selectedEvent.notes}</p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      selectedEvent.recurring
                        ? "bg-teal-50 text-teal-700 border-teal-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {selectedEvent.recurring ? "Recurring" : "One-time"}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

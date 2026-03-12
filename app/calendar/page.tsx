"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Filter,
  MapPin,
  Clock as ClockIcon,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterChips } from "@/components/shared/filter-chips";
import { ActivityBadge } from "@/components/shared/activity-badge";
import { Modal } from "@/components/shared/modal";
import { ActivityForm } from "@/components/shared/activity-form";
import { useFamily } from "@/lib/family-context";
import { formatTimeRange, getCategoryDot } from "@/lib/utils";
import { Activity, DayOfWeek } from "@/types";

const days: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

export default function CalendarPage() {
  const {
    children,
    activities,
    addActivity,
    updateActivity,
    removeActivity,
    getChildName,
  } = useFamily();

  const [childFilter, setChildFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Activity | null>(null);
  const [view, setView] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("Monday");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Activity | null>(null);
  const [addForDay, setAddForDay] = useState<DayOfWeek | null>(null);

  const childFilters = useMemo(
    () => [
      { value: "all", label: "All" },
      ...children.map((c) => ({ value: c.id, label: c.name })),
      { value: "family", label: "Family" },
    ],
    [children]
  );

  const filtered = activities.filter((a) => {
    if (childFilter !== "all" && a.childId !== childFilter) return false;
    if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
    return true;
  });

  const displayDays = view === "week" ? days : [selectedDay];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Calendar"
          description="Your family's weekly schedule at a glance. Tap any event to view or edit."
          icon={CalendarIcon}
        />
        <Button
          onClick={() => {
            setAddForDay(null);
            setShowAddModal(true);
          }}
          className="bg-teal-500 hover:bg-teal-600 text-white shrink-0"
        >
          <Plus size={16} className="mr-1.5" />
          Add Event
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Filter size={14} />
            <span className="font-medium">Child:</span>
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
          <div
            className={`grid ${
              view === "week" ? "grid-cols-7" : "grid-cols-1"
            } divide-x divide-navy-100`}
          >
            {displayDays.map((day) => {
              const dayEvents = filtered
                .filter((a) => a.day === day)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

              return (
                <div key={day} className="min-h-[400px]">
                  <div className="sticky top-0 bg-navy-50/80 backdrop-blur-sm border-b border-navy-100 px-3 py-3 flex items-center justify-between">
                    <p className="text-xs font-medium text-navy-400 uppercase">
                      {view === "week" ? day.slice(0, 3) : day}
                    </p>
                    <button
                      onClick={() => {
                        setAddForDay(day);
                        setShowAddModal(true);
                      }}
                      className="p-1 rounded-md hover:bg-navy-100 text-navy-300 hover:text-teal-500 transition-colors"
                      title={`Add event on ${day}`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="p-2 space-y-1.5">
                    {dayEvents.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-xs text-navy-300">No events</p>
                        <button
                          onClick={() => {
                            setAddForDay(day);
                            setShowAddModal(true);
                          }}
                          className="text-xs text-teal-500 hover:text-teal-600 mt-1"
                        >
                          + Add one
                        </button>
                      </div>
                    )}
                    {dayEvents.map((event) => (
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
                              {formatTimeRange(event.startTime, event.endTime)}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-navy-700 leading-tight mb-1">
                            {event.title}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] text-navy-400">
                              {getChildName(event.childId)}
                            </p>
                            {event.recurring && (
                              <span className="text-[9px] text-teal-500 font-medium">
                                ↻
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Event Detail Modal */}
      <Modal
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title ?? ""}
      >
        {selectedEvent && (
          <div className="space-y-4">
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
            <div className="flex gap-2 pt-2 border-t border-navy-100">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingEvent(selectedEvent);
                  setSelectedEvent(null);
                }}
              >
                <Pencil size={14} className="mr-1" /> Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  removeActivity(selectedEvent.id);
                  setSelectedEvent(null);
                }}
              >
                <Trash2 size={14} className="mr-1" /> Remove
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Activity Modal */}
      <Modal
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setAddForDay(null);
        }}
        title="Add Activity"
        description="Add a new event to your schedule."
      >
        <ActivityForm
          activity={
            addForDay
              ? ({
                  title: "",
                  category: "family",
                  childId: "family",
                  day: addForDay,
                  startTime: "09:00",
                  endTime: "10:00",
                  recurring: false,
                } as any)
              : undefined
          }
          onSave={(activity) => {
            addActivity(activity as any);
            setShowAddModal(false);
            setAddForDay(null);
          }}
          onCancel={() => {
            setShowAddModal(false);
            setAddForDay(null);
          }}
        />
      </Modal>

      {/* Edit Activity Modal */}
      <Modal
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        title="Edit Activity"
        description="Update this activity's details."
      >
        {editingEvent && (
          <ActivityForm
            activity={editingEvent}
            onSave={(activity) => {
              updateActivity(activity as Activity);
              setEditingEvent(null);
            }}
            onCancel={() => setEditingEvent(null)}
            onDelete={() => {
              removeActivity(editingEvent.id);
              setEditingEvent(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

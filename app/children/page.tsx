"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Pencil,
  Calendar,
  Clock,
  Star,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChildAvatar } from "@/components/shared/child-avatar";
import { ActivityBadge } from "@/components/shared/activity-badge";
import { Modal } from "@/components/shared/modal";
import { ChildForm } from "@/components/shared/child-form";
import { useFamily } from "@/lib/family-context";
import { formatTimeRange, getTimeDurationHours } from "@/lib/utils";
import { Child, DayOfWeek } from "@/types";

const days: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ChildrenPage() {
  const {
    children,
    activities,
    addChild,
    updateChild,
    removeChild,
    getChildName,
  } = useFamily();

  const [selectedChildId, setSelectedChildId] = useState<string | null>(
    children.length > 0 ? children[0].id : null
  );
  const [showAddChild, setShowAddChild] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  const selectedChild = children.find((c) => c.id === selectedChildId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Children"
          description="Manage your children's profiles, interests, and weekly schedules."
          icon={Users}
        />
        <Button
          onClick={() => setShowAddChild(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white shrink-0"
        >
          <Plus size={16} className="mr-1.5" />
          Add Child
        </Button>
      </div>

      {children.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="h-10 w-10 text-navy-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-navy-700 mb-1">
            No children added yet
          </h3>
          <p className="text-sm text-navy-400 max-w-md mx-auto mb-4">
            Add your children to start building personalized schedules and
            activity suggestions for each one.
          </p>
          <Button onClick={() => setShowAddChild(true)}>
            <Plus size={14} className="mr-1" /> Add Your First Child
          </Button>
        </Card>
      ) : (
        <>
          {/* Child Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all shrink-0 ${
                  selectedChildId === child.id
                    ? "border-teal-500 bg-teal-50/50"
                    : "border-navy-100 hover:border-navy-200"
                }`}
              >
                <ChildAvatar
                  name={child.name}
                  avatar={child.avatar}
                  color={child.color}
                  size="sm"
                />
                <span className="text-sm font-medium text-navy-700">
                  {child.name}
                </span>
              </button>
            ))}
          </div>

          {selectedChild && (
            <ChildDetail
              child={selectedChild}
              activities={activities.filter(
                (a) => a.childId === selectedChild.id
              )}
              onEdit={() => setEditingChild(selectedChild)}
              onRemove={() => {
                removeChild(selectedChild.id);
                setSelectedChildId(children[0]?.id ?? null);
              }}
            />
          )}
        </>
      )}

      {/* Add Child Modal */}
      <Modal
        open={showAddChild}
        onClose={() => setShowAddChild(false)}
        title="Add Child"
        description="Add a new child to your family."
      >
        <ChildForm
          onSave={(child) => {
            addChild(child as any);
            setShowAddChild(false);
          }}
          onCancel={() => setShowAddChild(false)}
        />
      </Modal>

      {/* Edit Child Modal */}
      <Modal
        open={!!editingChild}
        onClose={() => setEditingChild(null)}
        title="Edit Child"
        description="Update this child's profile."
      >
        {editingChild && (
          <ChildForm
            child={editingChild}
            onSave={(child) => {
              updateChild(child as Child);
              setEditingChild(null);
            }}
            onCancel={() => setEditingChild(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function ChildDetail({
  child,
  activities,
  onEdit,
  onRemove,
}: {
  child: Child;
  activities: any[];
  onEdit: () => void;
  onRemove: () => void;
}) {
  const nonSchool = activities.filter((a) => a.category !== "school");
  const totalHours = activities.reduce(
    (acc, a) => acc + getTimeDurationHours(a.startTime, a.endTime),
    0
  );

  return (
    <motion.div
      key={child.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <ChildAvatar
              name={child.name}
              avatar={child.avatar}
              color={child.color}
              size="lg"
            />
            <div>
              <h2 className="text-xl font-bold text-navy-800">{child.name}</h2>
              <p className="text-sm text-navy-400">
                Age {child.age} · {child.grade}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-navy-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {nonSchool.length} activities
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {totalHours.toFixed(1)} hrs/week
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Pencil size={14} className="mr-1" /> Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={onRemove}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>

        {/* Interests */}
        {child.interests.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-navy-600 mb-2">
              Interests
            </p>
            <div className="flex flex-wrap gap-1.5">
              {child.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Downtime */}
        {child.preferredDowntime && (
          <div className="mt-3 p-3 rounded-xl bg-cream-50/50 border border-cream-200/30">
            <p className="text-xs text-navy-500">
              <Star size={10} className="inline mr-1 -mt-0.5 text-amber-500" />
              <span className="font-medium">Preferred downtime:</span>{" "}
              {child.preferredDowntime}
            </p>
          </div>
        )}
      </Card>

      {/* Weekly Schedule */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-navy-800 mb-4">
          Weekly Schedule
        </h3>
        <div className="space-y-4">
          {days.map((day) => {
            const dayActs = activities
              .filter((a) => a.day === day && a.category !== "school")
              .sort((a, b) => a.startTime.localeCompare(b.startTime));

            if (dayActs.length === 0) return null;

            return (
              <div key={day}>
                <p className="text-xs font-bold text-navy-600 mb-2">{day}</p>
                <div className="space-y-1.5">
                  {dayActs.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-navy-50/50"
                    >
                      <span className="text-[11px] font-medium text-navy-400 w-24">
                        {formatTimeRange(act.startTime, act.endTime)}
                      </span>
                      <span className="text-xs font-medium text-navy-700 flex-1">
                        {act.title}
                      </span>
                      <ActivityBadge category={act.category} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Load Indicator */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-navy-700 mb-3">
          Weekly Load
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const count = activities.filter(
              (a) => a.day === day && a.category !== "school"
            ).length;
            const intensity =
              count >= 3 ? "bg-coral-400/20 text-coral-600" :
              count >= 2 ? "bg-amber-50 text-amber-600" :
              count >= 1 ? "bg-teal-50 text-teal-600" :
              "bg-navy-50 text-navy-400";
            return (
              <div
                key={day}
                className={`text-center p-2 rounded-xl ${intensity}`}
              >
                <p className="text-[10px] font-medium">{day.slice(0, 3)}</p>
                <p className="text-lg font-bold">{count}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}

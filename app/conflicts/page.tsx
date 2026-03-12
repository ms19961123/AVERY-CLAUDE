"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Clock,
  ArrowRight,
  Shield,
  Users,
  RefreshCw,
  MapPin,
  Car,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { useFamily } from "@/lib/family-context";
import { formatTimeRange, getSeverityColor } from "@/lib/utils";

const typeIcons: Record<string, React.ElementType> = {
  reschedule: RefreshCw,
  carpool: Car,
  adjust: Clock,
  delegate: Users,
};

export default function ConflictsPage() {
  const {
    conflicts,
    conflictStatuses,
    resolveConflict,
    reviewConflict,
    getChildName,
  } = useFamily();

  const unresolvedCount = conflicts.filter(
    (c) => !conflictStatuses[c.id] || conflictStatuses[c.id].status === "unresolved"
  ).length;
  const resolvedCount = conflicts.filter(
    (c) => conflictStatuses[c.id]?.status === "resolved"
  ).length;
  const reviewedCount = conflicts.filter(
    (c) => conflictStatuses[c.id]?.status === "reviewed"
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule Conflicts"
        description="Review overlapping events and choose the best resolution for your family."
        icon={AlertTriangle}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-navy-800">{conflicts.length}</p>
          <p className="text-xs text-navy-400 mt-1">Total Conflicts</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-coral-500">{unresolvedCount}</p>
          <p className="text-xs text-navy-400 mt-1">Unresolved</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-500">{reviewedCount}</p>
          <p className="text-xs text-navy-400 mt-1">Reviewed</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-sage-600">{resolvedCount}</p>
          <p className="text-xs text-navy-400 mt-1">Resolved</p>
        </Card>
      </div>

      {/* Philosophy Banner */}
      <Card className="p-5 bg-gradient-to-r from-cream-50 to-teal-50/30 border-teal-200/30">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-navy-700">
              Conflicts are normal in busy family schedules.
            </p>
            <p className="text-xs text-navy-400 mt-1">
              Family Flow helps you identify overlaps early and choose the best
              resolution. Pick a suggested action or mark conflicts as reviewed to
              track your progress.
            </p>
          </div>
        </div>
      </Card>

      {/* Conflict List */}
      {conflicts.length === 0 ? (
        <Card className="p-12 text-center">
          <CheckCircle2 className="h-10 w-10 text-sage-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-navy-700 mb-1">
            No conflicts detected
          </h3>
          <p className="text-sm text-navy-400 max-w-md mx-auto">
            Your family&apos;s schedule is clear of overlaps. If you add new
            activities, we&apos;ll automatically check for conflicts.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {conflicts.map((conflict, idx) => {
            const status = conflictStatuses[conflict.id];
            const currentStatus = status?.status ?? "unresolved";
            const chosenResId = status?.chosenResolutionId;

            return (
              <motion.div
                key={conflict.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card
                  className={`p-6 transition-all ${
                    currentStatus === "resolved"
                      ? "border-sage-200 bg-sage-50/30 opacity-80"
                      : currentStatus === "reviewed"
                      ? "border-amber-200/50"
                      : ""
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          currentStatus === "resolved"
                            ? "bg-sage-100"
                            : conflict.severity === "high"
                            ? "bg-coral-400/10"
                            : "bg-amber-50"
                        }`}
                      >
                        {currentStatus === "resolved" ? (
                          <CheckCircle2 className="h-4 w-4 text-sage-600" />
                        ) : (
                          <AlertTriangle
                            className={`h-4 w-4 ${
                              conflict.severity === "high"
                                ? "text-coral-500"
                                : "text-amber-500"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-navy-800">
                          {conflict.activities[0].title} &amp;{" "}
                          {conflict.activities[1].title}
                        </h3>
                        <p className="text-xs text-navy-400">
                          {conflict.activities[0].day}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {currentStatus === "resolved" && (
                        <Badge className="bg-sage-100 text-sage-600 border-sage-200">
                          Resolved
                        </Badge>
                      )}
                      {currentStatus === "reviewed" && (
                        <Badge className="bg-amber-50 text-amber-600 border-amber-200">
                          Reviewed
                        </Badge>
                      )}
                      <Badge className={getSeverityColor(conflict.severity)}>
                        {conflict.severity}
                      </Badge>
                    </div>
                  </div>

                  {/* Time overlap visualization */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {conflict.activities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3 rounded-xl bg-navy-50/50 border border-navy-100/50"
                      >
                        <p className="text-xs font-semibold text-navy-700">
                          {act.title}
                        </p>
                        <p className="text-[11px] text-navy-400 mt-1">
                          {formatTimeRange(act.startTime, act.endTime)}
                        </p>
                        <p className="text-[11px] text-navy-400">
                          {getChildName(act.childId)}
                          {act.location && (
                            <>
                              {" · "}
                              <MapPin size={10} className="inline -mt-0.5" />{" "}
                              {act.location}
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Conflict reason */}
                  <div className="p-3 rounded-xl bg-navy-50/30 border border-navy-100/30 mb-4">
                    <p className="text-xs font-medium text-navy-600 mb-1">
                      Why this is a conflict:
                    </p>
                    <p className="text-xs text-navy-500">{conflict.description}</p>
                  </div>

                  {/* Suggested Resolutions */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-navy-700 mb-2">
                      Suggested next best actions:
                    </p>
                    <div className="space-y-2">
                      {conflict.suggestions.map((res) => {
                        const Icon = typeIcons[res.type] || ArrowRight;
                        const isChosen = chosenResId === res.id;
                        return (
                          <button
                            key={res.id}
                            onClick={() => resolveConflict(conflict.id, res.id)}
                            className={`w-full text-left p-3 rounded-xl border transition-all ${
                              isChosen
                                ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-200"
                                : "border-navy-100 hover:border-navy-200 hover:bg-navy-50/30"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
                                  isChosen ? "bg-teal-100" : "bg-navy-50"
                                }`}
                              >
                                <Icon
                                  size={13}
                                  className={
                                    isChosen ? "text-teal-600" : "text-navy-400"
                                  }
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p
                                    className={`text-xs font-semibold ${
                                      isChosen ? "text-teal-700" : "text-navy-700"
                                    }`}
                                  >
                                    {res.title}
                                  </p>
                                  {isChosen && (
                                    <Badge className="bg-teal-100 text-teal-600 border-teal-200 text-[9px]">
                                      Chosen
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-[11px] text-navy-400 mt-0.5">
                                  {res.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  {currentStatus !== "resolved" && (
                    <div className="flex items-center gap-2">
                      {currentStatus !== "reviewed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => reviewConflict(conflict.id)}
                        >
                          <Eye size={14} className="mr-1" />
                          Mark as Reviewed
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                        onClick={() => resolveConflict(conflict.id)}
                      >
                        <CheckCircle2 size={14} className="mr-1" />
                        Mark as Resolved
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

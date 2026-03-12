"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Users,
  Car,
  RefreshCw,
  Shuffle,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { conflicts } from "@/data/mock-data";
import { formatTimeRange, getSeverityColor } from "@/lib/utils";
import { ConflictResolution } from "@/types";

const resolutionIcons: Record<string, React.ElementType> = {
  reschedule: RefreshCw,
  carpool: Car,
  adjust: Shuffle,
  delegate: Users,
};

export default function ConflictsPage() {
  const severe = conflicts.filter((c) => c.severity === "high").length;
  const totalSuggestions = conflicts.reduce(
    (acc, c) => acc + c.suggestions.length,
    0
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conflicts"
        description="Schedule overlaps we've detected, with practical suggestions to resolve them."
        icon={AlertTriangle}
      />

      {/* Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Conflicts"
          value={conflicts.length}
          icon={AlertTriangle}
          iconBg="bg-coral-400/10"
          iconColor="text-coral-500"
          delay={0.1}
        />
        <StatCard
          title="Needs Attention"
          value={severe}
          subtitle="High severity"
          icon={Shield}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
          delay={0.15}
        />
        <StatCard
          title="Suggestions"
          value={totalSuggestions}
          subtitle="Resolution ideas"
          icon={CheckCircle2}
          iconBg="bg-sage-100"
          iconColor="text-sage-600"
          delay={0.2}
        />
      </div>

      {/* Supportive Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cream-50 to-cream-100 border border-cream-200">
          <p className="text-sm text-navy-600">
            <span className="font-semibold">Conflicts are normal.</span> Busy
            families often have overlapping commitments — the goal isn&apos;t perfection,
            it&apos;s finding workable solutions that keep everyone happy.
          </p>
        </div>
      </motion.div>

      {/* Conflict Cards */}
      <div className="space-y-5">
        {conflicts.map((conflict, index) => (
          <motion.div
            key={conflict.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <Card className="overflow-hidden">
              {/* Conflict Header */}
              <div className="p-6 border-b border-navy-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-400/10">
                      <AlertTriangle className="h-5 w-5 text-coral-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800">
                        {conflict.activities[0].title} &amp;{" "}
                        {conflict.activities[1].title}
                      </h3>
                      <p className="text-xs text-navy-400 mt-0.5">
                        {conflict.activities[0].day}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`${getSeverityColor(conflict.severity)} text-xs`}
                  >
                    {conflict.severity} severity
                  </Badge>
                </div>

                {/* Time Overlap Visual */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 p-3 rounded-xl bg-navy-50">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-navy-400" />
                      <span className="text-xs font-medium text-navy-600">
                        {conflict.activities[0].title}
                      </span>
                    </div>
                    <p className="text-xs text-navy-400 mt-1">
                      {formatTimeRange(
                        conflict.activities[0].startTime,
                        conflict.activities[0].endTime
                      )}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral-400/10">
                    <ArrowRight className="h-3 w-3 text-coral-500" />
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-navy-50">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-navy-400" />
                      <span className="text-xs font-medium text-navy-600">
                        {conflict.activities[1].title}
                      </span>
                    </div>
                    <p className="text-xs text-navy-400 mt-1">
                      {formatTimeRange(
                        conflict.activities[1].startTime,
                        conflict.activities[1].endTime
                      )}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-navy-500">{conflict.description}</p>
              </div>

              {/* Suggestions */}
              <div className="p-6 bg-navy-50/30">
                <p className="text-xs font-medium text-navy-400 uppercase tracking-wider mb-3">
                  Suggested Resolutions
                </p>
                <div className="space-y-2">
                  {conflict.suggestions.map((suggestion) => {
                    const Icon =
                      resolutionIcons[suggestion.type] || RefreshCw;
                    return (
                      <div
                        key={suggestion.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white border border-navy-100/50 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-navy-700">
                            {suggestion.title}
                          </p>
                          <p className="text-xs text-navy-400 mt-0.5">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

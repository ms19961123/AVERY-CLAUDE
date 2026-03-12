"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Shield,
  Leaf,
  Sun,
  Palette,
  TreePine,
  Coffee,
  Filter,
  Star,
  Plus,
  Lock,
  Unlock,
  Target,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterChips } from "@/components/shared/filter-chips";
import { useFamily } from "@/lib/family-context";
import { formatTimeRange } from "@/lib/utils";
import { FreeTimeQuality, DayOfWeek, FreeTimeStatus } from "@/types";

const qualityIcons: Record<FreeTimeQuality, React.ElementType> = {
  "short-reset": Coffee,
  "family-window": Sun,
  "creative-activity": Palette,
  "outdoor-activity": TreePine,
  "leave-unscheduled": Leaf,
};

const qualityLabels: Record<FreeTimeQuality, string> = {
  "short-reset": "Short Reset",
  "family-window": "Family Window",
  "creative-activity": "Creative Activity",
  "outdoor-activity": "Outdoor Activity",
  "leave-unscheduled": "Leave Unscheduled",
};

const days: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function FreeTimePage() {
  const {
    children,
    freeTimeBlocks,
    freeTimeStatuses,
    setFreeTimeStatus,
    getChildName,
  } = useFamily();

  const [personFilter, setPersonFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");

  const personFilters = useMemo(() => [
    { value: "all", label: "Everyone" },
    ...children.map((c) => ({ value: c.id, label: c.name })),
    { value: "family", label: "Family" },
  ], [children]);

  const dayFilters = [
    { value: "all", label: "All Days" },
    ...days.map((d) => ({ value: d, label: d.slice(0, 3) })),
  ];

  const filtered = freeTimeBlocks.filter((b) => {
    if (personFilter !== "all" && b.childId !== personFilter) return false;
    if (dayFilter !== "all" && b.day !== dayFilter) return false;
    return true;
  });

  const protectedBlocks = filtered.filter((b) => {
    const status = freeTimeStatuses[b.id] ?? (b.isProtected ? "protected" : "open");
    return status === "protected";
  });
  const openBlocks = filtered.filter((b) => {
    const status = freeTimeStatuses[b.id] ?? (b.isProtected ? "protected" : "open");
    return status !== "protected";
  });

  const getBlockStatus = (blockId: string, isProtected: boolean): FreeTimeStatus => {
    return freeTimeStatuses[blockId] ?? (isProtected ? "protected" : "open");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Free Time"
        description="Protect your family's breathing room. Mark blocks as open, protected, or candidates for activities."
        icon={Clock}
      />

      {/* Philosophy Banner */}
      <Card className="p-5 bg-gradient-to-r from-sage-50 to-cream-50 border-sage-200/50">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-sage-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-navy-700">
              Free time isn&apos;t wasted time — it&apos;s how children recharge.
            </p>
            <p className="text-xs text-navy-400 mt-1">
              Use the toggles below to protect downtime, mark blocks as candidates for
              future activities, or intentionally leave them open.
            </p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Filter size={14} />
            <span className="font-medium">Person:</span>
          </div>
          <FilterChips
            options={personFilters}
            selected={personFilter}
            onSelect={setPersonFilter}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-3">
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Filter size={14} />
            <span className="font-medium">Day:</span>
          </div>
          <FilterChips
            options={dayFilters}
            selected={dayFilter}
            onSelect={setDayFilter}
          />
        </div>
      </Card>

      {/* Quality Legend */}
      <div className="flex flex-wrap gap-3">
        {(Object.entries(qualityLabels) as [FreeTimeQuality, string][]).map(
          ([key, label]) => {
            const Icon = qualityIcons[key];
            return (
              <div
                key={key}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-navy-100 text-xs text-navy-500"
              >
                <Icon size={12} />
                <span>{label}</span>
              </div>
            );
          }
        )}
      </div>

      {/* Open Blocks */}
      {openBlocks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-navy-700 mb-3">
            Open Time Blocks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {openBlocks.map((block, idx) => {
              const Icon = qualityIcons[block.quality];
              const status = getBlockStatus(block.id, block.isProtected);
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-50">
                          <Icon className="h-4 w-4 text-sage-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy-700">
                            {block.day}
                          </p>
                          <p className="text-[11px] text-navy-400">
                            {formatTimeRange(block.startTime, block.endTime)}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full">
                        {getChildName(block.childId)}
                      </span>
                    </div>
                    <p className="text-xs text-navy-500 mb-3">{block.label}</p>
                    <div className="flex items-center gap-1.5">
                      <StatusButton
                        active={status === "open"}
                        label="Open"
                        icon={Unlock}
                        onClick={() => setFreeTimeStatus(block.id, "open")}
                      />
                      <StatusButton
                        active={status === "protected"}
                        label="Protect"
                        icon={Lock}
                        onClick={() => setFreeTimeStatus(block.id, "protected")}
                        activeColor="text-sage-600 bg-sage-50 border-sage-200"
                      />
                      <StatusButton
                        active={status === "candidate"}
                        label="Candidate"
                        icon={Target}
                        onClick={() => setFreeTimeStatus(block.id, "candidate")}
                        activeColor="text-amber-600 bg-amber-50 border-amber-200"
                      />
                      <StatusButton
                        active={status === "intentionally-open"}
                        label="Keep Empty"
                        icon={Star}
                        onClick={() => setFreeTimeStatus(block.id, "intentionally-open")}
                        activeColor="text-teal-600 bg-teal-50 border-teal-200"
                      />
                    </div>
                    {status === "candidate" && (
                      <div className="mt-2 p-2 rounded-lg bg-amber-50/50 border border-amber-100">
                        <p className="text-[10px] text-amber-600">
                          Marked as a candidate for future activities
                        </p>
                      </div>
                    )}
                    {status === "intentionally-open" && (
                      <div className="mt-2 p-2 rounded-lg bg-teal-50/50 border border-teal-100">
                        <p className="text-[10px] text-teal-600">
                          Intentionally left open — rest time matters
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Protected Downtime */}
      {protectedBlocks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-navy-700 mb-3 flex items-center gap-2">
            <Shield size={14} className="text-sage-600" />
            Protected Downtime
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {protectedBlocks.map((block, idx) => {
              const Icon = qualityIcons[block.quality];
              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-4 border-sage-200/50 bg-sage-50/20">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-100">
                          <Icon className="h-4 w-4 text-sage-700" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy-700">
                            {block.day}
                          </p>
                          <p className="text-[11px] text-navy-400">
                            {formatTimeRange(block.startTime, block.endTime)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield size={10} className="text-sage-500" />
                        <span className="text-[10px] font-medium text-sage-600">
                          Protected
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-navy-500 mb-2">{block.label}</p>
                    <p className="text-[10px] text-navy-400">
                      {getChildName(block.childId)}
                    </p>
                    <button
                      onClick={() => setFreeTimeStatus(block.id, "open")}
                      className="mt-2 text-[10px] text-navy-400 hover:text-navy-600 transition-colors"
                    >
                      Remove protection →
                    </button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Clock className="h-10 w-10 text-navy-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-navy-700 mb-1">
            No free time blocks found
          </h3>
          <p className="text-sm text-navy-400 max-w-md mx-auto">
            Adjust your filters or check back after updating your schedule.
            Free time blocks are automatically identified from gaps in your calendar.
          </p>
        </Card>
      )}

      {/* Bottom Quote */}
      <Card className="p-5 text-center bg-cream-50/50 border-cream-200/30">
        <p className="text-sm text-navy-500 italic">
          &ldquo;Almost everything will work again if you unplug it for a few minutes, including you.&rdquo;
        </p>
        <p className="text-xs text-navy-400 mt-1">— Anne Lamott</p>
      </Card>
    </div>
  );
}

function StatusButton({
  active,
  label,
  icon: Icon,
  onClick,
  activeColor = "text-navy-600 bg-navy-50 border-navy-200",
}: {
  active: boolean;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  activeColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium border transition-all ${
        active
          ? activeColor
          : "text-navy-400 bg-white border-navy-100 hover:bg-navy-50"
      }`}
    >
      <Icon size={10} />
      {label}
    </button>
  );
}

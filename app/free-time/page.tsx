"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Shield,
  Sun,
  TreePine,
  Palette,
  CloudSun,
  Leaf,
  Heart,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterChips } from "@/components/shared/filter-chips";
import { freeTimeBlocks, children, getChildName } from "@/data/mock-data";
import { formatTimeRange } from "@/lib/utils";
import { FreeTimeQuality } from "@/types";

const qualityConfig: Record<
  FreeTimeQuality,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  "short-reset": {
    label: "Short Reset",
    icon: Sun,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  "family-window": {
    label: "Family Window",
    icon: Heart,
    color: "text-teal-600",
    bg: "bg-teal-50 border-teal-200",
  },
  "creative-activity": {
    label: "Creative Activity",
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
  },
  "outdoor-activity": {
    label: "Outdoor Activity",
    icon: TreePine,
    color: "text-sage-600",
    bg: "bg-sage-50 border-sage-200",
  },
  "leave-unscheduled": {
    label: "Leave Unscheduled",
    icon: CloudSun,
    color: "text-navy-500",
    bg: "bg-navy-50 border-navy-200",
  },
};

const personFilters = [
  { value: "all", label: "Everyone" },
  ...children.map((c) => ({ value: c.id, label: c.name })),
  { value: "family", label: "Family" },
];

export default function FreeTimePage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? freeTimeBlocks
      : freeTimeBlocks.filter((f) => f.childId === filter);

  const protectedBlocks = filtered.filter((f) => f.isProtected);
  const openBlocks = filtered.filter((f) => !f.isProtected);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Free Time"
        description="Open windows in your family's schedule. Not every gap needs to be filled."
        icon={Clock}
      />

      {/* Philosophy Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5 bg-gradient-to-r from-sage-50 to-teal-50 border-sage-200/50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shrink-0">
              <Leaf className="h-5 w-5 text-sage-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-700 mb-1">
                A little breathing room is a good thing.
              </p>
              <p className="text-sm text-navy-500">
                Free time isn&apos;t wasted time. Children need unstructured moments
                for creativity, rest, and simply being kids. We&apos;ve identified
                blocks that are best left open alongside ones that could support
                a gentle activity.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <Card className="p-4">
        <FilterChips
          options={personFilters}
          selected={filter}
          onSelect={setFilter}
        />
      </Card>

      {/* Quality Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(qualityConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <div
              key={key}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${config.bg} ${config.color}`}
            >
              <Icon size={12} />
              {config.label}
            </div>
          );
        })}
      </div>

      {/* Open Time Blocks */}
      <div>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <Sun size={18} className="text-teal-500" />
          Open Time Blocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {openBlocks.map((block, index) => {
            const config = qualityConfig[block.quality];
            const Icon = config.icon;
            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <Card className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.bg}`}
                      >
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-800">
                          {block.day}
                        </p>
                        <p className="text-xs text-navy-400">
                          {formatTimeRange(block.startTime, block.endTime)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`text-[10px] ${config.bg} ${config.color} border`}
                    >
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-navy-600 mb-2">{block.label}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-navy-400">For:</span>
                    <span className="text-xs font-medium text-navy-600">
                      {getChildName(block.childId)}
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Protected Downtime */}
      <div>
        <h2 className="text-lg font-semibold text-navy-800 mb-2 flex items-center gap-2">
          <Shield size={18} className="text-navy-500" />
          Protected Downtime
        </h2>
        <p className="text-sm text-navy-400 mb-4">
          These blocks are marked for rest and recovery. We recommend keeping
          them clear.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protectedBlocks.map((block, index) => {
            const config = qualityConfig[block.quality];
            const Icon = config.icon;
            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="p-5 border-navy-200/50 bg-navy-50/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-100/50">
                        <Shield className="h-4 w-4 text-navy-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-700">
                          {block.day}
                        </p>
                        <p className="text-xs text-navy-400">
                          {formatTimeRange(block.startTime, block.endTime)}
                        </p>
                      </div>
                    </div>
                    <Badge className="text-[10px] bg-navy-100 text-navy-500 border-navy-200">
                      Protected
                    </Badge>
                  </div>
                  <p className="text-sm text-navy-500 italic">{block.label}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-xs text-navy-400">For:</span>
                    <span className="text-xs font-medium text-navy-500">
                      {getChildName(block.childId)}
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 text-center bg-cream-50 border-cream-200">
          <p className="text-navy-600 text-sm font-medium">
            &ldquo;Not every open block needs a plan.&rdquo;
          </p>
          <p className="text-navy-400 text-xs mt-1">
            Sometimes the best thing you can do for your family is simply nothing
            at all.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

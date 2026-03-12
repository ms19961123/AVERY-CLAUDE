"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Clock,
  Zap,
  TreePine,
  BookOpen,
  Palette,
  Music,
  Beaker,
  Heart,
  Coffee,
  Users,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterChips } from "@/components/shared/filter-chips";
import { suggestions, children, getChildName } from "@/data/mock-data";
import { EnergyLevel } from "@/types";

const categoryIcons: Record<string, React.ElementType> = {
  outdoor: TreePine,
  creative: Palette,
  reading: BookOpen,
  STEM: Beaker,
  music: Music,
  family: Users,
  active: Zap,
  rest: Coffee,
};

const energyColors: Record<EnergyLevel, { bg: string; text: string }> = {
  low: { bg: "bg-sage-50", text: "text-sage-600" },
  medium: { bg: "bg-amber-50", text: "text-amber-600" },
  high: { bg: "bg-teal-50", text: "text-teal-600" },
};

const personFilters = [
  { value: "all", label: "All" },
  ...children.map((c) => ({ value: c.id, label: c.name })),
  { value: "family", label: "Family" },
];

const categoryFilters = [
  { value: "all", label: "All" },
  { value: "outdoor", label: "Outdoor" },
  { value: "creative", label: "Creative" },
  { value: "reading", label: "Reading" },
  { value: "STEM", label: "STEM" },
  { value: "music", label: "Music" },
  { value: "family", label: "Family" },
  { value: "rest", label: "Rest" },
  { value: "active", label: "Active" },
];

export default function SuggestionsPage() {
  const [personFilter, setPersonFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = suggestions.filter((s) => {
    if (personFilter !== "all" && s.forChildId !== personFilter) return false;
    if (catFilter !== "all" && s.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suggestions"
        description="Balanced activity ideas that fit your family's schedule and energy."
        icon={Lightbulb}
      />

      {/* Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5 bg-gradient-to-r from-teal-50 to-sage-50 border-teal-200/50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shrink-0">
              <Sparkles className="h-5 w-5 text-teal-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-700 mb-1">
                Only when the schedule can support it.
              </p>
              <p className="text-sm text-navy-500">
                These suggestions are based on each child&apos;s interests, age, and
                available time. We only recommend activities that genuinely fit
                — no overscheduling.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm font-medium text-navy-500 shrink-0">
            For:
          </span>
          <FilterChips
            options={personFilters}
            selected={personFilter}
            onSelect={setPersonFilter}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm font-medium text-navy-500 shrink-0">
            Type:
          </span>
          <FilterChips
            options={categoryFilters}
            selected={catFilter}
            onSelect={setCatFilter}
          />
        </div>
      </Card>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((suggestion, index) => {
          const Icon = categoryIcons[suggestion.category] || Lightbulb;
          const energy = energyColors[suggestion.energyLevel];
          return (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 shrink-0">
                      <Icon className="h-5 w-5 text-navy-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800 text-sm">
                        {suggestion.title}
                      </h3>
                      <p className="text-xs text-navy-400">
                        {getChildName(suggestion.forChildId)}
                      </p>
                    </div>
                  </div>
                  <Badge className={`text-[10px] ${energy.bg} ${energy.text} border`}>
                    {suggestion.energyLevel} energy
                  </Badge>
                </div>

                <p className="text-sm text-navy-600 mb-3 flex-1">
                  {suggestion.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-navy-500">
                    <Clock size={12} className="text-navy-400" />
                    <span>{suggestion.duration}</span>
                    <span className="text-navy-300">·</span>
                    <span>{suggestion.idealTimeWindow}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {suggestion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-navy-50 text-navy-500 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Why It Fits */}
                <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100">
                  <p className="text-xs text-teal-700">
                    <span className="font-semibold">Why this fits:</span>{" "}
                    {suggestion.whyItFits}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Lightbulb className="h-8 w-8 text-navy-300 mx-auto mb-3" />
          <p className="text-sm text-navy-500">
            No suggestions match your current filters.
          </p>
          <p className="text-xs text-navy-400 mt-1">
            Try adjusting the filters above.
          </p>
        </Card>
      )}
    </div>
  );
}

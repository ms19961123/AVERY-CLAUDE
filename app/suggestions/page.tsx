"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Filter,
  Heart,
  Star,
  Calendar,
  Zap,
  Clock,
  Bookmark,
  BookmarkCheck,
  Users,
  User,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterChips } from "@/components/shared/filter-chips";
import { useFamily } from "@/lib/family-context";
import { EnergyLevel } from "@/types";

const categoryFilters = [
  { value: "all", label: "All Types" },
  { value: "outdoor", label: "Outdoor" },
  { value: "creative", label: "Creative" },
  { value: "STEM", label: "STEM" },
  { value: "rest", label: "Rest" },
  { value: "music", label: "Music" },
  { value: "family", label: "Family" },
];

const energyFilters = [
  { value: "all", label: "Any Energy" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const energyColors: Record<EnergyLevel, string> = {
  low: "bg-sage-50 text-sage-600 border-sage-200",
  medium: "bg-amber-50 text-amber-600 border-amber-200",
  high: "bg-coral-400/10 text-coral-500 border-coral-400/30",
};

export default function SuggestionsPage() {
  const {
    children,
    suggestions,
    savedSuggestions,
    tryThisWeekSuggestions,
    toggleSaved,
    toggleTryWeek,
    getChildName,
  } = useFamily();

  const [personFilter, setPersonFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [energyFilter, setEnergyFilter] = useState("all");
  const [showTab, setShowTab] = useState<"all" | "individual" | "family" | "saved">("all");

  const personFilters = useMemo(() => [
    { value: "all", label: "Everyone" },
    ...children.map((c) => ({ value: c.id, label: c.name })),
    { value: "family", label: "Family" },
  ], [children]);

  const filtered = suggestions.filter((s) => {
    if (personFilter !== "all" && s.forChildId !== personFilter) return false;
    if (categoryFilter !== "all" && s.category !== categoryFilter) return false;
    if (energyFilter !== "all" && s.energyLevel !== energyFilter) return false;
    if (showTab === "individual" && s.forChildId === "family") return false;
    if (showTab === "family" && s.forChildId !== "family") return false;
    if (showTab === "saved" && !savedSuggestions.includes(s.id)) return false;
    return true;
  });

  const tryThisWeekItems = suggestions.filter((s) =>
    tryThisWeekSuggestions.includes(s.id)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Suggestions"
        description="Personalized ideas based on your children's interests and available time."
        icon={Lightbulb}
      />

      {/* Philosophy */}
      <Card className="p-5 bg-gradient-to-r from-amber-50/50 to-cream-50 border-amber-200/30">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-navy-700">
              Suggestions tailored to your family
            </p>
            <p className="text-xs text-navy-400 mt-1">
              Each suggestion is matched to your children&apos;s interests, energy levels,
              and available time windows. Save favorites or mark items to try this week.
            </p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { value: "all", label: "All", icon: Lightbulb },
          { value: "individual", label: "Individual", icon: User },
          { value: "family", label: "Family", icon: Users },
          { value: "saved", label: "Saved", icon: Bookmark },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setShowTab(tab.value as any)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showTab === tab.value
                ? "bg-navy-700 text-white"
                : "bg-navy-50 text-navy-500 hover:bg-navy-100"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
            {tab.value === "saved" && savedSuggestions.length > 0 && (
              <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                {savedSuggestions.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Try This Week */}
      {tryThisWeekItems.length > 0 && showTab !== "saved" && (
        <Card className="p-4 border-teal-200/50 bg-teal-50/20">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-teal-600" />
            <h3 className="text-sm font-semibold text-navy-700">
              Try This Week ({tryThisWeekItems.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tryThisWeekItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-teal-200 text-xs"
              >
                <span className="font-medium text-navy-700">{item.title}</span>
                <span className="text-navy-400">·</span>
                <span className="text-navy-400">{getChildName(item.forChildId)}</span>
                <button
                  onClick={() => toggleTryWeek(item.id)}
                  className="text-navy-300 hover:text-red-400 ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

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
            <span className="font-medium">Type:</span>
          </div>
          <FilterChips
            options={categoryFilters}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-3">
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <Zap size={14} />
            <span className="font-medium">Energy:</span>
          </div>
          <FilterChips
            options={energyFilters}
            selected={energyFilter}
            onSelect={setEnergyFilter}
          />
        </div>
      </Card>

      {/* Suggestions Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((suggestion, idx) => {
            const isSaved = savedSuggestions.includes(suggestion.id);
            const isTryWeek = tryThisWeekSuggestions.includes(suggestion.id);
            return (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-navy-50 text-navy-500 border-navy-200 text-[10px] capitalize">
                        {suggestion.category}
                      </Badge>
                      <Badge className={`text-[10px] ${energyColors[suggestion.energyLevel]}`}>
                        <Zap size={8} className="mr-0.5" />
                        {suggestion.energyLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleSaved(suggestion.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSaved
                            ? "text-amber-500 bg-amber-50"
                            : "text-navy-300 hover:text-amber-400 hover:bg-amber-50/50"
                        }`}
                        title={isSaved ? "Remove from saved" : "Save suggestion"}
                      >
                        {isSaved ? (
                          <BookmarkCheck size={14} />
                        ) : (
                          <Bookmark size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-navy-800 mb-1">
                    {suggestion.title}
                  </h3>
                  <p className="text-xs text-navy-500 mb-3 flex-1">
                    {suggestion.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3 text-[11px] text-navy-400">
                    <span className="flex items-center gap-1">
                      <User size={10} />
                      {getChildName(suggestion.forChildId)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {suggestion.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {suggestion.idealTimeWindow}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {suggestion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-navy-50 text-navy-500 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Why It Fits */}
                  <div className="p-3 rounded-xl bg-cream-50/50 border border-cream-200/30 mb-3">
                    <p className="text-[10px] font-medium text-navy-600 mb-0.5">
                      Why this fits:
                    </p>
                    <p className="text-[11px] text-navy-500">
                      {suggestion.whyItFits}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant={isTryWeek ? "default" : "outline"}
                    className={
                      isTryWeek
                        ? "bg-teal-500 hover:bg-teal-600 text-white w-full"
                        : "w-full"
                    }
                    onClick={() => toggleTryWeek(suggestion.id)}
                  >
                    {isTryWeek ? (
                      <>
                        <Star size={14} className="mr-1" />
                        Added to This Week
                      </>
                    ) : (
                      <>
                        <Star size={14} className="mr-1" />
                        Try This Week
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Lightbulb className="h-10 w-10 text-navy-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-navy-700 mb-1">
            {showTab === "saved" ? "No saved suggestions yet" : "No suggestions match your filters"}
          </h3>
          <p className="text-sm text-navy-400 max-w-md mx-auto">
            {showTab === "saved"
              ? "Save suggestions by clicking the bookmark icon on any suggestion card."
              : "Try broadening your filters to see more personalized ideas."}
          </p>
        </Card>
      )}
    </div>
  );
}

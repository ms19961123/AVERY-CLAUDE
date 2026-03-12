"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  AlertTriangle,
  Clock,
  Activity,
  Plus,
  Eye,
  FileText,
  Zap,
  Heart,
  ArrowRight,
  Sun,
  Moon,
  Users,
  ChevronRight,
  Target,
  Lightbulb,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { ChildAvatar } from "@/components/shared/child-avatar";
import { ActivityBadge } from "@/components/shared/activity-badge";
import { Modal } from "@/components/shared/modal";
import { ActivityForm } from "@/components/shared/activity-form";
import { useFamily } from "@/lib/family-context";
import { weeklyLoad } from "@/data/mock-data";
import { formatTime, formatTimeRange } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState, useMemo } from "react";

const chartData = weeklyLoad.map((d) => ({
  name: d.day.slice(0, 3),
  hours: d.hours,
  activities: d.activities,
}));

const barColors = [
  "#4db8a7",
  "#4db8a7",
  "#4db8a7",
  "#e87356",
  "#4db8a7",
  "#74cebf",
  "#a8e3d7",
];

export default function DashboardPage() {
  const {
    children,
    activities,
    conflicts,
    conflictStatuses,
    freeTimeBlocks,
    suggestions,
    tryThisWeekSuggestions,
    settings,
    addActivity,
    getChildName,
  } = useFamily();

  const [showAddActivity, setShowAddActivity] = useState(false);

  const totalActivities = activities.length;
  const unresolvedConflicts = conflicts.filter(
    (c) => !conflictStatuses[c.id] || conflictStatuses[c.id].status === "unresolved"
  ).length;
  const freeBlocks = freeTimeBlocks.filter((f) => !f.isProtected).length;
  const busiestDay = weeklyLoad.reduce((a, b) =>
    a.hours > b.hours ? a : b
  );

  const upcomingEvents = useMemo(() => {
    return activities
      .filter(
        (a) =>
          (a.day === "Monday" || a.day === "Tuesday") &&
          a.category !== "school"
      )
      .slice(0, 5);
  }, [activities]);

  const tryThisWeekItems = suggestions.filter((s) =>
    tryThisWeekSuggestions.includes(s.id)
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 p-8 lg:p-12 text-white"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20">
              <Heart className="h-4 w-4 text-teal-300" />
            </div>
            <span className="text-teal-300 text-sm font-medium">
              Family Flow
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            Good morning, {settings.parentName || "there"}.
          </h1>
          <p className="text-navy-200 text-lg max-w-xl mb-2">
            Organize the chaos. Protect what matters.
          </p>
          <p className="text-navy-300 text-sm max-w-lg mb-6">
            Your family&apos;s week is mapped out.{" "}
            {unresolvedConflicts > 0
              ? `${unresolvedConflicts} conflict${unresolvedConflicts > 1 ? "s" : ""} need${unresolvedConflicts === 1 ? "s" : ""} attention.`
              : "All conflicts resolved — looking good!"}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/weekly-plan">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl"
              >
                <FileText size={16} className="mr-2" />
                View Weekly Plan
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-navy-500 text-navy-200 hover:bg-navy-700 hover:text-white rounded-xl bg-transparent"
              onClick={() => setShowAddActivity(true)}
            >
              <Plus size={16} className="mr-2" />
              Add Activity
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Activities"
          value={totalActivities}
          subtitle="This week"
          icon={Calendar}
          delay={0.1}
        />
        <StatCard
          title="Conflicts"
          value={unresolvedConflicts}
          subtitle={unresolvedConflicts === 0 ? "All resolved" : "Need attention"}
          icon={AlertTriangle}
          iconBg="bg-coral-400/10"
          iconColor="text-coral-500"
          delay={0.15}
        />
        <StatCard
          title="Open Blocks"
          value={freeBlocks}
          subtitle="Available windows"
          icon={Clock}
          iconBg="bg-sage-100"
          iconColor="text-sage-600"
          delay={0.2}
        />
        <StatCard
          title="Busiest Day"
          value={busiestDay.day.slice(0, 3)}
          subtitle={`${busiestDay.hours} hrs scheduled`}
          icon={Zap}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
          delay={0.25}
        />
      </div>

      {/* Recommended Next Step + Family Rhythm */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
        >
          <Card className="p-6 border-teal-200/50 bg-gradient-to-br from-white to-teal-50/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50">
                <Sparkles className="h-4 w-4 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800">
                Recommended Next Step
              </h3>
            </div>
            {unresolvedConflicts > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-navy-600">
                  You have <span className="font-semibold text-coral-500">{unresolvedConflicts} unresolved conflict{unresolvedConflicts > 1 ? "s" : ""}</span> this week.
                  Resolving these will help your family&apos;s schedule run smoothly.
                </p>
                <Link href="/conflicts">
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                    <AlertTriangle size={14} className="mr-1.5" />
                    Review Conflicts
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-navy-600">
                  All conflicts are resolved! Consider exploring activity suggestions
                  to fill free time with enriching options.
                </p>
                <Link href="/suggestions">
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Lightbulb size={14} className="mr-1.5" />
                    Browse Suggestions
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50">
                <TrendingUp className="h-4 w-4 text-navy-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800">
                Family Rhythm
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-navy-50/50">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-teal-500" />
                  <span className="text-sm text-navy-600">Planning style</span>
                </div>
                <span className="text-sm font-medium text-navy-700 capitalize">
                  {settings.planningStyle.replace("-", " ")}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-navy-50/50">
                <div className="flex items-center gap-2">
                  <Moon size={14} className="text-sage-500" />
                  <span className="text-sm text-navy-600">Daily downtime goal</span>
                </div>
                <span className="text-sm font-medium text-navy-700">
                  {settings.preferredDowntimeHours} hrs
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-navy-50/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-500" />
                  <span className="text-sm text-navy-600">Max activities/day</span>
                </div>
                <span className="text-sm font-medium text-navy-700">
                  {settings.maxActivitiesPerDay}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Load Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-navy-800">
                  Family Load by Day
                </h3>
                <p className="text-sm text-navy-400">
                  Hours of scheduled activities per day
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-navy-400">
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-coral-500" />
                  <span>Heavy</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap="25%">
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8ba4cc", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8ba4cc", fontSize: 12 }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #dce3f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    fontSize: "13px",
                  }}
                  formatter={(value: number) => [`${value} hrs`, "Scheduled"]}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={barColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Weekly Balance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold text-navy-800 mb-4">
              Weekly Balance
            </h3>
            <p className="text-sm text-navy-400 mb-6">
              How your family&apos;s time is distributed
            </p>
            <div className="space-y-5">
              <BalanceRow
                icon={Activity}
                label="Structured"
                value="29 hrs"
                percent={55}
                color="bg-navy-500"
              />
              <BalanceRow
                icon={Users}
                label="Family Time"
                value="8 hrs"
                percent={15}
                color="bg-teal-500"
              />
              <BalanceRow
                icon={Moon}
                label="Downtime"
                value="16 hrs"
                percent={30}
                color="bg-sage-400"
              />
            </div>
            <div className="mt-6 p-3 rounded-xl bg-sage-50 border border-sage-200">
              <p className="text-xs text-sage-600 font-medium">
                <Sun size={12} className="inline mr-1 -mt-0.5" />
                Your week has a healthy balance of structure and rest.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* This Week's Priorities */}
      {tryThisWeekItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38 }}
        >
          <Card className="p-6 border-amber-200/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                <Target className="h-4 w-4 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800">
                This Week&apos;s Priorities
              </h3>
              <Badge className="bg-amber-50 text-amber-600 border-amber-200 text-xs">
                {tryThisWeekItems.length} items
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tryThisWeekItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-amber-50/50 border border-amber-100"
                >
                  <p className="text-sm font-medium text-navy-700">{item.title}</p>
                  <p className="text-xs text-navy-400 mt-1">
                    {getChildName(item.forChildId)} · {item.duration}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Children & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Children This Week */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-navy-800">
                Children This Week
              </h3>
              <Link
                href="/children"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            {children.length > 0 ? (
              <div className="space-y-3">
                {children.map((child) => {
                  const childActivities = activities.filter(
                    (a) =>
                      a.childId === child.id && a.category !== "school"
                  );
                  const busyLevel =
                    childActivities.length > 5
                      ? "Heavily scheduled"
                      : childActivities.length > 3
                      ? "Moderately busy"
                      : "Balanced week";
                  const busyColor =
                    childActivities.length > 5
                      ? "text-coral-500 bg-coral-400/10"
                      : childActivities.length > 3
                      ? "text-amber-600 bg-amber-50"
                      : "text-sage-600 bg-sage-50";

                  return (
                    <div
                      key={child.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-50/50 transition-colors"
                    >
                      <ChildAvatar
                        name={child.name}
                        avatar={child.avatar}
                        color={child.color}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy-800 text-sm">
                            {child.name}
                          </p>
                          <span className="text-xs text-navy-400">
                            {child.age}y · {child.grade}
                          </span>
                        </div>
                        <p className="text-xs text-navy-400 truncate">
                          {childActivities.length} activities this week
                        </p>
                      </div>
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${busyColor}`}
                      >
                        {busyLevel}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Users className="h-8 w-8 text-navy-200 mx-auto mb-3" />
                <p className="text-sm text-navy-500 mb-1">No children added yet</p>
                <p className="text-xs text-navy-400 mb-4">
                  Add your children to start organizing their schedules.
                </p>
                <Link href="/children">
                  <Button size="sm" variant="outline">
                    <Plus size={14} className="mr-1" /> Add Children
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-navy-800">
                Upcoming Events
              </h3>
              <Link
                href="/calendar"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                Calendar <ChevronRight size={14} />
              </Link>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50/50 transition-colors"
                  >
                    <div className="flex flex-col items-center w-12">
                      <span className="text-[10px] font-medium text-navy-400 uppercase">
                        {event.day.slice(0, 3)}
                      </span>
                      <span className="text-sm font-bold text-navy-700">
                        {formatTime(event.startTime)}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-navy-100" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-navy-800 text-sm">
                          {event.title}
                        </p>
                        <ActivityBadge category={event.category} />
                      </div>
                      <p className="text-xs text-navy-400">
                        {getChildName(event.childId)}
                        {event.location && ` · ${event.location}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Calendar className="h-8 w-8 text-navy-200 mx-auto mb-3" />
                <p className="text-sm text-navy-500">No upcoming events</p>
                <p className="text-xs text-navy-400 mt-1">
                  Your schedule is clear. Add activities to get started.
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Alerts and Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conflict Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="p-6 border-coral-400/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-400/10">
                <AlertTriangle className="h-4 w-4 text-coral-500" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800">
                Conflict Alerts
              </h3>
            </div>
            {conflicts.length > 0 ? (
              <div className="space-y-3">
                {conflicts.slice(0, 2).map((conflict) => {
                  const cStatus = conflictStatuses[conflict.id];
                  const isResolved = cStatus?.status === "resolved";
                  return (
                    <div
                      key={conflict.id}
                      className={`p-3 rounded-xl border ${
                        isResolved
                          ? "bg-sage-50/50 border-sage-200/50"
                          : "bg-coral-400/5 border-coral-400/10"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-navy-700">
                          {conflict.activities[0].title} &amp;{" "}
                          {conflict.activities[1].title}
                        </p>
                        {isResolved ? (
                          <Badge className="bg-sage-100 text-sage-600 border-sage-200 text-[10px]">
                            resolved
                          </Badge>
                        ) : (
                          <Badge
                            className={`text-[10px] ${
                              conflict.severity === "high"
                                ? "bg-coral-400/15 text-coral-500 border-coral-400/30"
                                : "bg-amber-50 text-amber-600 border-amber-200"
                            }`}
                          >
                            {conflict.severity}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-navy-400 line-clamp-2">
                        {conflict.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center">
                <CheckCircle2 className="h-6 w-6 text-sage-400 mx-auto mb-2" />
                <p className="text-sm text-navy-500">No conflicts detected</p>
              </div>
            )}
            <Link href="/conflicts">
              <Button variant="ghost" size="sm" className="mt-3 w-full text-coral-500 hover:text-coral-600 hover:bg-coral-400/5">
                View all conflicts
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Free Time Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <Card className="p-6 border-sage-200/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-50">
                <Clock className="h-4 w-4 text-sage-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800">
                Recommended Free Time
              </h3>
            </div>
            <div className="space-y-3">
              {freeTimeBlocks
                .filter((f) => !f.isProtected)
                .slice(0, 3)
                .map((block) => (
                  <div
                    key={block.id}
                    className="p-3 rounded-xl bg-sage-50/50 border border-sage-100"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-navy-700">
                        {block.day}{" "}
                        {formatTimeRange(block.startTime, block.endTime)}
                      </p>
                      <span className="text-[10px] font-medium text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full">
                        {getChildName(block.childId)}
                      </span>
                    </div>
                    <p className="text-xs text-navy-400">{block.label}</p>
                  </div>
                ))}
            </div>
            <Link href="/free-time">
              <Button variant="ghost" size="sm" className="mt-3 w-full text-sage-600 hover:text-sage-700 hover:bg-sage-50">
                View all free time
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <QuickActionButton
              icon={Plus}
              label="Add Activity"
              onClick={() => setShowAddActivity(true)}
              color="bg-teal-50 text-teal-600 hover:bg-teal-100"
            />
            <QuickAction
              icon={AlertTriangle}
              label="Review Conflicts"
              href="/conflicts"
              color="bg-coral-400/10 text-coral-500 hover:bg-coral-400/15"
            />
            <QuickAction
              icon={Eye}
              label="View Free Time"
              href="/free-time"
              color="bg-sage-50 text-sage-600 hover:bg-sage-100"
            />
            <QuickAction
              icon={FileText}
              label="Weekly Plan"
              href="/weekly-plan"
              color="bg-navy-50 text-navy-600 hover:bg-navy-100"
            />
            <QuickAction
              icon={Lightbulb}
              label="Suggestions"
              href="/suggestions"
              color="bg-amber-50 text-amber-600 hover:bg-amber-100"
            />
          </div>
        </Card>
      </motion.div>

      {/* Add Activity Modal */}
      <Modal
        open={showAddActivity}
        onClose={() => setShowAddActivity(false)}
        title="Add Activity"
        description="Add a new activity to your family's schedule."
      >
        <ActivityForm
          onSave={(activity) => {
            addActivity(activity as any);
            setShowAddActivity(false);
          }}
          onCancel={() => setShowAddActivity(false)}
        />
      </Modal>
    </div>
  );
}

function BalanceRow({
  icon: Icon,
  label,
  value,
  percent,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-navy-400" />
          <span className="text-sm font-medium text-navy-700">{label}</span>
        </div>
        <span className="text-sm font-semibold text-navy-700">{value}</span>
      </div>
      <div className="h-2 bg-navy-50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  href,
  color,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-colors cursor-pointer ${color}`}
      >
        <Icon size={20} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  color,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <button onClick={onClick}>
      <div
        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-colors cursor-pointer ${color}`}
      >
        <Icon size={20} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </button>
  );
}

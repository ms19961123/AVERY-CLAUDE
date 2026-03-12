"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  Baby,
  Star,
  Target,
  Clock,
  Car,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextInput, SelectInput } from "@/components/shared/form-field";
import { OnboardingData, Child, PlanningStyle } from "@/types";
import { generateId } from "@/lib/storage";

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const TOTAL_STEPS = 7;

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [familyName, setFamilyName] = useState("");
  const [parentName, setParentName] = useState("");
  const [children, setChildren] = useState<Child[]>([]);
  const [editingChild, setEditingChild] = useState<Partial<Child>>({
    name: "",
    age: 6,
    grade: "1st Grade",
    interests: [],
    preferredDowntime: "",
    color: "teal",
  });
  const [newInterest, setNewInterest] = useState("");
  const [planningStyle, setPlanningStyle] = useState<PlanningStyle>("balanced");
  const [downtime, setDowntime] = useState(2);
  const [travelBuffer, setTravelBuffer] = useState(15);
  const [maxActivities, setMaxActivities] = useState(3);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const addChildToList = () => {
    if (!editingChild.name?.trim()) return;
    const child: Child = {
      id: generateId(),
      name: editingChild.name!.trim(),
      age: editingChild.age || 6,
      grade: editingChild.grade || "1st Grade",
      avatar: editingChild.name!.trim().charAt(0).toUpperCase(),
      interests: editingChild.interests || [],
      preferredDowntime: editingChild.preferredDowntime || "Relaxing at home",
      color: ["teal", "navy", "sage"][children.length % 3],
    };
    setChildren([...children, child]);
    setEditingChild({ name: "", age: 6, grade: "1st Grade", interests: [], preferredDowntime: "", color: "teal" });
  };

  const finish = () => {
    onComplete({
      completed: true,
      familyName: familyName || "My Family",
      parentName: parentName || "Parent",
      children,
      planningStyle,
      preferredDowntimeHours: downtime,
      travelBufferMinutes: travelBuffer,
      maxActivitiesPerDay: maxActivities,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cream-50 via-white to-teal-50/30">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-teal-500 w-8" : "bg-navy-100 w-4"
                }`}
              />
            ))}
          </div>
          <button
            onClick={onSkip}
            className="text-xs text-navy-400 hover:text-navy-600 transition-colors"
          >
            Skip for now
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <StepCard>
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 mx-auto mb-6 shadow-lg">
                    <Heart className="h-7 w-7 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-navy-800 mb-2">
                    Welcome to Family Flow
                  </h1>
                  <p className="text-navy-400 text-sm mb-2">
                    Organize the chaos. Protect what matters.
                  </p>
                  <p className="text-navy-500 text-sm max-w-sm mx-auto mb-8">
                    We&apos;ll help you build a calm, balanced schedule for your
                    family in just a few steps. No rush — take your time.
                  </p>
                  <Button size="lg" onClick={next} className="px-8">
                    Get Started <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </StepCard>
            )}

            {step === 1 && (
              <StepCard
                icon={Users}
                title="Tell us about your family"
                subtitle="Just the basics to personalize your experience."
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                      Family Name
                    </label>
                    <TextInput
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      placeholder="e.g. The Johnsons"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                      Your Name
                    </label>
                    <TextInput
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Sarah"
                    />
                  </div>
                </div>
                <StepNav onPrev={prev} onNext={next} />
              </StepCard>
            )}

            {step === 2 && (
              <StepCard
                icon={Baby}
                title="Add your children"
                subtitle="You can always add or edit children later."
              >
                {/* Existing children */}
                {children.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-navy-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold">
                            {child.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-navy-700">
                              {child.name}
                            </p>
                            <p className="text-xs text-navy-400">
                              Age {child.age} · {child.grade}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setChildren(children.filter((c) => c.id !== child.id))
                          }
                          className="text-navy-400 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add child form */}
                <div className="space-y-3 p-4 rounded-xl border border-navy-100 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-navy-600 mb-1 block">Name</label>
                      <TextInput
                        value={editingChild.name || ""}
                        onChange={(e) =>
                          setEditingChild({ ...editingChild, name: e.target.value })
                        }
                        placeholder="Child's name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-navy-600 mb-1 block">Age</label>
                      <TextInput
                        type="number"
                        min={2}
                        max={18}
                        value={editingChild.age || 6}
                        onChange={(e) =>
                          setEditingChild({
                            ...editingChild,
                            age: parseInt(e.target.value) || 6,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy-600 mb-1 block">Grade</label>
                    <SelectInput
                      value={editingChild.grade || "1st Grade"}
                      onChange={(e) =>
                        setEditingChild({ ...editingChild, grade: e.target.value })
                      }
                      options={[
                        "Pre-K","Kindergarten","1st Grade","2nd Grade","3rd Grade",
                        "4th Grade","5th Grade","6th Grade","7th Grade","8th Grade",
                      ].map((g) => ({ value: g, label: g }))}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addChildToList}
                    className="w-full"
                  >
                    + Add Child
                  </Button>
                </div>

                <StepNav onPrev={prev} onNext={next} nextLabel={children.length === 0 ? "Skip" : "Continue"} />
              </StepCard>
            )}

            {step === 3 && (
              <StepCard
                icon={Star}
                title="Interests & Activities"
                subtitle="What do your children enjoy? This helps us make better suggestions."
              >
                {children.length > 0 ? (
                  <div className="space-y-4">
                    {children.map((child, idx) => (
                      <div key={child.id} className="p-4 rounded-xl border border-navy-100">
                        <p className="text-sm font-semibold text-navy-700 mb-2">
                          {child.name}&apos;s interests
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {child.interests.map((interest) => (
                            <span
                              key={interest}
                              className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200 flex items-center gap-1"
                            >
                              {interest}
                              <button
                                onClick={() => {
                                  const updated = [...children];
                                  updated[idx] = {
                                    ...child,
                                    interests: child.interests.filter((i) => i !== interest),
                                  };
                                  setChildren(updated);
                                }}
                                className="text-teal-400 hover:text-teal-600"
                              >
                                <X size={10} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <TextInput
                            placeholder="e.g. soccer, reading, art"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val && !child.interests.includes(val)) {
                                  const updated = [...children];
                                  updated[idx] = {
                                    ...child,
                                    interests: [...child.interests, val],
                                  };
                                  setChildren(updated);
                                  (e.target as HTMLInputElement).value = "";
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-navy-400 text-sm">
                    No children added yet. You can customize interests later.
                  </div>
                )}
                <StepNav onPrev={prev} onNext={next} />
              </StepCard>
            )}

            {step === 4 && (
              <StepCard
                icon={Target}
                title="Planning Style"
                subtitle="How would you like Family Flow to approach your schedule?"
              >
                <div className="space-y-3">
                  {(
                    [
                      {
                        value: "balanced" as PlanningStyle,
                        label: "Balanced",
                        desc: "A healthy mix of activities and downtime. Recommended for most families.",
                      },
                      {
                        value: "lightly-structured" as PlanningStyle,
                        label: "Lightly Structured",
                        desc: "More free time, fewer suggestions. Great for families who value spontaneity.",
                      },
                      {
                        value: "growth-focused" as PlanningStyle,
                        label: "Growth Focused",
                        desc: "More activity suggestions aligned with your children's interests and goals.",
                      },
                    ] as const
                  ).map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setPlanningStyle(style.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        planningStyle === style.value
                          ? "border-teal-500 bg-teal-50/50"
                          : "border-navy-100 hover:border-navy-200"
                      }`}
                    >
                      <p className="font-medium text-sm text-navy-800">
                        {style.label}
                        {style.value === "balanced" && (
                          <span className="text-teal-600 text-xs ml-2">Recommended</span>
                        )}
                      </p>
                      <p className="text-xs text-navy-400 mt-1">{style.desc}</p>
                    </button>
                  ))}
                </div>
                <StepNav onPrev={prev} onNext={next} />
              </StepCard>
            )}

            {step === 5 && (
              <StepCard
                icon={Clock}
                title="Downtime & Logistics"
                subtitle="Help us protect your family's breathing room."
              >
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-navy-700">
                        Preferred daily downtime
                      </label>
                      <span className="text-sm font-bold text-teal-600">{downtime} hrs</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={4}
                      step={0.5}
                      value={downtime}
                      onChange={(e) => setDowntime(parseFloat(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                    <div className="flex justify-between text-[10px] text-navy-400 mt-1">
                      <span>30 min</span>
                      <span>4 hrs</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-navy-700">
                        Travel buffer between activities
                      </label>
                      <span className="text-sm font-bold text-teal-600">{travelBuffer} min</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={5}
                      value={travelBuffer}
                      onChange={(e) => setTravelBuffer(parseInt(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-navy-700">
                        Max activities per child per day
                      </label>
                      <span className="text-sm font-bold text-teal-600">{maxActivities}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={maxActivities}
                      onChange={(e) => setMaxActivities(parseInt(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                  </div>
                </div>
                <StepNav onPrev={prev} onNext={next} />
              </StepCard>
            )}

            {step === 6 && (
              <StepCard>
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-400 to-teal-500 mx-auto mb-6 shadow-lg">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-800 mb-2">
                    You&apos;re all set!
                  </h2>
                  <p className="text-navy-400 text-sm max-w-sm mx-auto mb-2">
                    Family Flow is ready to help{" "}
                    {familyName || "your family"} find balance.
                  </p>
                  <p className="text-navy-500 text-xs max-w-sm mx-auto mb-8">
                    Your dashboard is loaded with a sample schedule to explore. You
                    can customize everything as you go.
                  </p>
                  <Button size="lg" onClick={finish} className="px-8">
                    <Sparkles size={16} className="mr-2" />
                    Go to Dashboard
                  </Button>
                  <button
                    onClick={prev}
                    className="block mx-auto mt-3 text-xs text-navy-400 hover:text-navy-600"
                  >
                    Go back and adjust
                  </button>
                </div>
              </StepCard>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon?: React.ElementType;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-8">
      {Icon && (
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <Icon className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            {title && <h2 className="text-lg font-bold text-navy-800">{title}</h2>}
            {subtitle && <p className="text-sm text-navy-400">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </Card>
  );
}

function StepNav({
  onPrev,
  onNext,
  nextLabel = "Continue",
}: {
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="flex justify-between mt-6">
      <Button variant="ghost" onClick={onPrev}>
        <ArrowLeft size={14} className="mr-1" /> Back
      </Button>
      <Button onClick={onNext}>
        {nextLabel} <ArrowRight size={14} className="ml-1" />
      </Button>
    </div>
  );
}

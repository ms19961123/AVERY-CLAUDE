"use client";

import { motion } from "framer-motion";
import {
  Check,
  Star,
  Sparkles,
  Heart,
  Shield,
  Calendar,
  Lightbulb,
  Clock,
  Users,
  ArrowRight,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with the essentials. Perfect for trying Family Flow.",
    cta: "Current Plan",
    ctaVariant: "outline" as const,
    highlight: false,
    features: [
      "Up to 2 children",
      "Weekly calendar view",
      "Basic conflict detection",
      "3 free-time blocks per week",
      "5 activity suggestions per week",
      "Community support",
    ],
  },
  {
    name: "Family Plus",
    price: "$9",
    period: "per month",
    description: "Everything you need for a balanced, well-organized family schedule.",
    cta: "Upgrade to Plus",
    ctaVariant: "default" as const,
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited children",
      "Full weekly & daily calendar",
      "Smart conflict detection & resolution",
      "Unlimited free-time guidance",
      "Personalized activity suggestions",
      "AI-powered weekly plans",
      "Protected downtime management",
      "Family rhythm insights",
      "Priority email support",
      "Data export",
    ],
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "For families who want the ultimate planning experience.",
    cta: "Coming Soon",
    ctaVariant: "outline" as const,
    highlight: false,
    badge: "Coming Soon",
    features: [
      "Everything in Family Plus",
      "Google Calendar sync",
      "Multi-parent coordination",
      "Smart scheduling automation",
      "Carpool coordination",
      "Activity cost tracking",
      "Seasonal planning advisor",
      "Priority video support",
      "Family wellness reports",
      "Custom activity templates",
    ],
  },
];

const faqs = [
  {
    q: "Can I try Family Flow before committing?",
    a: "Absolutely. The Free plan gives you full access to core features with no time limit. Upgrade whenever you're ready.",
  },
  {
    q: "How does Family Flow protect my data?",
    a: "Your family's information is stored securely and never shared. We use industry-standard encryption and follow strict privacy practices.",
  },
  {
    q: "Can I switch between plans?",
    a: "Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a family discount?",
    a: "Each plan covers your entire family, no matter how many children you have (on Plus and Premium). One subscription handles it all.",
  },
  {
    q: "What if I just want to see if this works for my family?",
    a: "Start with the Free plan and explore at your own pace. There's no pressure to upgrade — we want you to feel confident before making any commitment.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <Badge className="bg-teal-50 text-teal-700 border-teal-200 mb-4">
          <Sparkles size={12} className="mr-1" /> Simple, family-friendly pricing
        </Badge>
        <h1 className="text-3xl font-bold text-navy-800 mb-3">
          Plans that grow with your family
        </h1>
        <p className="text-navy-400">
          Start free, upgrade when you&apos;re ready. Every plan is designed to reduce
          stress — not add to it.
        </p>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <Card
              className={`p-6 h-full flex flex-col relative ${
                plan.highlight
                  ? "border-teal-500 border-2 shadow-lg shadow-teal-500/10"
                  : ""
              }`}
            >
              {plan.badge && (
                <Badge
                  className={`absolute -top-2.5 left-6 ${
                    plan.highlight
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-navy-100 text-navy-500 border-navy-200"
                  }`}
                >
                  {plan.badge}
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-navy-800">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold text-navy-800">
                    {plan.price}
                  </span>
                  <span className="text-sm text-navy-400">/{plan.period}</span>
                </div>
                <p className="text-sm text-navy-400 mt-2">{plan.description}</p>
              </div>

              <Button
                variant={plan.ctaVariant}
                className={`w-full mb-6 ${
                  plan.highlight ? "bg-teal-500 hover:bg-teal-600 text-white" : ""
                }`}
                disabled={plan.cta === "Coming Soon"}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        plan.highlight ? "text-teal-500" : "text-navy-400"
                      }`}
                    />
                    <span className="text-sm text-navy-600">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-8 bg-gradient-to-r from-navy-700 to-navy-800 text-white max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <Heart className="h-8 w-8 text-teal-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Built by parents, for parents
            </h3>
            <p className="text-navy-200 text-sm">
              Family Flow was created because we know how overwhelming it is to
              manage a busy family schedule. Our mission is simple: help you find
              balance, avoid conflicts, and protect the moments that matter most.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              { icon: Shield, label: "Privacy first", desc: "Your data stays yours" },
              { icon: Clock, label: "Save 3+ hrs/week", desc: "On average for families" },
              { icon: Users, label: "10K+ families", desc: "Trust Family Flow" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="h-5 w-5 text-teal-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-navy-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-navy-800 text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-navy-700">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={16} className="text-navy-400 shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-navy-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm text-navy-500">{faq.a}</p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-8 text-center bg-gradient-to-r from-cream-50 to-teal-50 border-teal-200/50 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-navy-800 mb-2">
            Ready to bring calm to your family&apos;s schedule?
          </h3>
          <p className="text-sm text-navy-400 mb-4">
            Start with the Free plan — no credit card required.
          </p>
          <Button size="lg">
            Get Started Free <ArrowRight size={16} className="ml-2" />
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}

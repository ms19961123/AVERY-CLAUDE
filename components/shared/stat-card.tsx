"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-teal-50",
  iconColor = "text-teal-600",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">
              {title}
            </p>
            <p className="text-2xl font-bold text-navy-800 mt-1">{value}</p>
            {subtitle && (
              <p className="text-xs text-navy-400 mt-1">{subtitle}</p>
            )}
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

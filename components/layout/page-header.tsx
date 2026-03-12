"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <Icon className="h-5 w-5 text-teal-600" />
          </div>
        )}
        <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
          {title}
        </h1>
      </div>
      <p className="text-navy-400 text-sm ml-0 lg:ml-[52px]">{description}</p>
    </motion.div>
  );
}

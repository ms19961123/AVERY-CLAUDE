"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  AlertTriangle,
  Clock,
  Lightbulb,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  Heart,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFamily } from "@/lib/family-context";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/conflicts", label: "Conflicts", icon: AlertTriangle },
  { href: "/free-time", label: "Free Time", icon: Clock },
  { href: "/suggestions", label: "Suggestions", icon: Lightbulb },
  { href: "/children", label: "Children", icon: Users },
  { href: "/weekly-plan", label: "Weekly Plan", icon: FileText },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { conflicts, conflictStatuses } = useFamily();
  const unresolvedCount = conflicts.filter(
    (c) => !conflictStatuses[c.id] || conflictStatuses[c.id].status === "unresolved"
  ).length;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-navy-100/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-sm">
                <Heart className="h-4.5 w-4.5 text-white" size={18} />
              </div>
              <div>
                <span className="text-lg font-bold text-navy-800 tracking-tight">
                  Family Flow
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-teal-50 text-teal-700"
                        : "text-navy-400 hover:bg-navy-50 hover:text-navy-700"
                    )}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    {item.href === "/conflicts" && unresolvedCount > 0 && (
                      <span className="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral-500 text-[10px] font-bold text-white px-1">
                        {unresolvedCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <button
              className="lg:hidden flex items-center justify-center rounded-lg p-2 text-navy-500 hover:bg-navy-50"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-navy-900/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-16 bottom-0 w-72 bg-white border-l border-navy-100 shadow-xl overflow-y-auto">
            <div className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-teal-50 text-teal-700"
                        : "text-navy-500 hover:bg-navy-50 hover:text-navy-700"
                    )}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

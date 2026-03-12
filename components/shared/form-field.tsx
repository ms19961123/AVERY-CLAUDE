"use client";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}

export function FormField({ label, children, hint, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-sm font-medium text-navy-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-navy-400">{hint}</p>}
    </div>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all",
        className
      )}
      {...props}
    />
  );
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function SelectInput({ className, options, ...props }: SelectInputProps) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none",
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextAreaInput({ className, ...props }: TextAreaInputProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none",
        className
      )}
      rows={3}
      {...props}
    />
  );
}

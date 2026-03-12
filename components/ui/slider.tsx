"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const percent = ((value[0] - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.([parseFloat(e.target.value)]);
    };

    return (
      <div ref={ref} className={cn("relative flex w-full items-center", className)} {...props}>
        <div className="relative h-2 w-full rounded-full bg-navy-100">
          <div
            className="absolute h-full rounded-full bg-teal-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
        />
        <div
          className="absolute h-5 w-5 rounded-full border-2 border-teal-500 bg-white shadow-sm pointer-events-none"
          style={{ left: `calc(${percent}% - 10px)` }}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };

"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
}

export function BorderGlow({
  children,
  className = "",
  glowColor = "var(--kuro-pink)",
  duration = 6,
}: BorderGlowProps) {
  return (
    <div className={cn("relative p-[1px] overflow-hidden rounded-xl group/border", className)}>
      {/* Animated glowing gradient beam */}
      <div
        className="absolute inset-[-100%] animate-spin-slow opacity-0 group-hover/border:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${glowColor} 60deg, transparent 120deg)`,
          animationDuration: `${duration}s`,
        }}
      />
      {/* Inner card container */}
      <div className="relative z-10 w-full h-full rounded-[inherit] bg-[var(--kuro-surface)]">
        {children}
      </div>
    </div>
  );
}

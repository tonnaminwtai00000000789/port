"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface DriftWallItem {
  id?: string | number;
  name: string;
  icon?: string;
  category?: string;
}

interface DriftWallProps {
  items: DriftWallItem[];
  rows?: number;
  speed?: number; // Duration in seconds per loop
  className?: string;
}

export function DriftWall({
  items,
  rows = 3,
  speed = 28,
  className = "",
}: DriftWallProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!items || items.length === 0) return null;

  // Split items across row groups
  const rowsData: DriftWallItem[][] = Array.from({ length: rows }, (_, rIdx) => {
    const rowItems = items.filter((_, idx) => idx % rows === rIdx);
    return rowItems.length > 0 ? rowItems : items;
  });

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-4 space-y-4 select-none",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Side gradient blur masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10"
        style={{
          background: "linear-gradient(to right, var(--kuro-bg), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10"
        style={{
          background: "linear-gradient(to left, var(--kuro-bg), transparent)",
        }}
      />

      {/* Drifting Rows */}
      {rowsData.map((rowItems, rIdx) => {
        const reverse = rIdx % 2 === 1;
        // Duplicate items for infinite seamless scroll loop
        const duplicated = [...rowItems, ...rowItems, ...rowItems, ...rowItems];

        return (
          <div key={rIdx} className="flex overflow-hidden w-full">
            <div
              className={cn(
                "flex items-center gap-3 shrink-0 py-1 transition-all duration-300",
                reverse ? "animate-drift-reverse" : "animate-drift"
              )}
              style={{
                animationDuration: `${speed + rIdx * 4}s`,
                animationPlayState: isHovered ? "paused" : "running",
              }}
            >
              {duplicated.map((tech, idx) => (
                <div
                  key={`${rIdx}-${tech.name}-${idx}`}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl cursor-pointer group transition-all duration-200 hover:scale-105 hover:bg-[rgba(155,48,217,0.18)]"
                  style={{
                    background: "rgba(25, 2, 35, 0.8)",
                    border: "1px solid var(--kuro-border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--kuro-border-bright)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--kuro-border)";
                  }}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {tech.icon?.startsWith("devicon-") ? (
                      <i className={`${tech.icon} text-base`} />
                    ) : tech.icon ? (
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-4 h-4 object-contain"
                      />
                    ) : (
                      <span className="text-xs font-mono text-[var(--kuro-primary-glow)]">
                        ✦
                      </span>
                    )}
                  </div>
                  <span
                    className="text-xs font-bold tracking-tight group-hover:text-[var(--kuro-skull)] transition-colors"
                    style={{ color: "var(--kuro-skull-dim)" }}
                  >
                    {tech.name}
                  </span>
                  {tech.category && (
                    <span
                      className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded uppercase"
                      style={{
                        background: "rgba(155,48,217,0.15)",
                        color: "var(--kuro-primary-glow)",
                      }}
                    >
                      {tech.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

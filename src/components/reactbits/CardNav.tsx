"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface CardNavItem {
  href: string;
  label: string;
  num?: string;
}

interface CardNavProps {
  items: CardNavItem[];
  activeHref?: string;
  className?: string;
}

export function CardNav({ items, activeHref, className = "" }: CardNavProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "relative flex items-center gap-1.5 p-1.5 rounded-2xl border transition-all duration-300",
        className
      )}
      style={{
        background: "rgba(22, 2, 30, 0.75)",
        borderColor: "var(--kuro-border)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(192, 96, 255, 0.08)",
      }}
    >
      {items.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        const isActive = activeHref === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="relative px-3.5 py-1.5 text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 z-10 select-none"
            style={{
              color: isHovered || isActive ? "var(--kuro-skull)" : "var(--kuro-skull-dim)",
            }}
          >
            {/* Sliding Framer Motion Card Background */}
            {isHovered && (
              <motion.div
                layoutId="card-nav-hover-pill"
                className="absolute inset-0 rounded-xl z-[-1]"
                style={{
                  background: "linear-gradient(135deg, rgba(155, 48, 217, 0.25) 0%, rgba(255, 105, 200, 0.15) 100%)",
                  border: "1px solid var(--kuro-border-bright)",
                  boxShadow: "0 2px 12px rgba(155, 48, 217, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}

            {item.num && (
              <span
                className="font-mono text-[10px] transition-colors"
                style={{
                  color: isHovered ? "var(--kuro-pink)" : "var(--kuro-muted)",
                }}
              >
                {item.num}.
              </span>
            )}
            <span>{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}

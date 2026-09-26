"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--kuro-pink)] via-[var(--kuro-primary-glow)] via-white to-[var(--kuro-pink)] bg-[length:200%_100%]",
        !disabled && "animate-shiny",
        className
      )}
      style={{
        animationDuration: animationDuration,
      }}
    >
      {text}
    </span>
  );
}

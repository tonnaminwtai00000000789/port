import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
  color: string;
}

const SYMBOLS = ["✦", "✧", "★", "☆", "✺", "❋", "⁕", "✾", "♦"];
const COLORS = [
  "var(--kuro-primary-glow)",
  "var(--kuro-pink)",
  "var(--kuro-yellow)",
  "var(--kuro-skull-dim)",
];

function generateItems(count: number): FloatingItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 10 + Math.random() * 14,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export function FloatingStars({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    setItems(generateItems(count));
  }, [count]);

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {items.map((item) => (
        <motion.span
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.x}%`,
            fontSize: item.size,
            color: item.color,
            opacity: 0.25,
            top: "105%",
          }}
          animate={{
            y: [0, -(typeof window !== "undefined" && window.innerHeight ? window.innerHeight + 200 : 900)],
            rotate: [0, 360],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.symbol}
        </motion.span>
      ))}
    </div>
  );
}

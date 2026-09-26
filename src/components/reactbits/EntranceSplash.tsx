"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DecryptedText } from "./DecryptedText";

export function EntranceSplash() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if splash was already shown in this session
    const hasSeenSplash = sessionStorage.getItem("kuro_splash_shown");
    if (hasSeenSplash) {
      return;
    }

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 80);

    // Timeout to hide splash screen
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("kuro_splash_shown", "true");
    }, 1300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="entrance-splash"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            opacity: 0,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0010] text-white select-none overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, rgba(155, 48, 217, 0.22) 0%, rgba(13, 0, 16, 0.98) 70%)",
          }}
        >
          {/* Ambient background light grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 105, 200, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 105, 200, 0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Central Emblem & Loading Sequence */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            {/* Kuromi Animated Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-black/60 border border-[rgba(255,105,200,0.3)] shadow-[0_0_50px_rgba(155,48,217,0.4)]"
            >
              <img
                src="/kuromi/sanrio-kuromi-cute-512x512.png"
                alt="Kuromi logo"
                className="w-16 h-16 object-contain drop-shadow-[0_0_12px_rgba(255,105,200,0.6)]"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--kuro-pink)] animate-ping" />
            </motion.div>

            {/* Title / Subtitle */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold tracking-widest text-[var(--kuro-pink)] uppercase">
                <DecryptedText text="✦ TONNAM.DEV // PORTFOLIO" animateOn="view" speed={40} />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
              >
                WELCOMING YOU
              </h2>
            </div>

            {/* Progress Bar & Percentage */}
            <div className="w-56 space-y-2">
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--kuro-primary-glow)] via-[var(--kuro-pink)] to-[var(--kuro-purple)]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[var(--kuro-muted-bright)]">
                <span>SYSTEM_READY</span>
                <span className="text-[var(--kuro-pink)]">{Math.min(progress, 100)}%</span>
              </div>
            </div>
          </div>

          {/* Bottom decorative watermark */}
          <div className="absolute bottom-6 text-[10px] font-mono tracking-widest opacity-40 text-[var(--kuro-muted)]">
            KUROMI ENGINE v2.0 · ALL RIGHTS RESERVED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

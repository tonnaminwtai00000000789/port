import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[100] bg-[#0f172a] text-white flex flex-col justify-between p-8 sm:p-14 select-none pointer-events-auto"
        >
          {/* Top Info Bar */}
          <div className="flex items-center justify-between font-mono text-xs font-bold text-[#60a5fa] uppercase tracking-widest border-b border-white/10 pb-4">
            <span>[ SYSTEM INIT ]</span>
            <span>BANGKOK, TH</span>
          </div>

          {/* Center Brand Title */}
          <div className="my-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                PORTFOLIO EDITION // 2026
              </span>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
                Tonnam<span className="text-[#60a5fa]">.dev</span>
              </h1>
            </motion.div>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex items-end justify-between border-t border-white/10 pt-4 font-mono">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">SUPAKRON KLINBUBPA</p>
              <p className="text-xs text-[#60a5fa] font-semibold mt-0.5">FULLSTACK BUILDER</p>
            </div>
            <div className="text-right">
              <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                {Math.min(progress, 100).toString().padStart(3, "0")}
              </span>
              <span className="text-xs font-bold text-[#60a5fa] ml-1">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

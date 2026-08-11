import React, { useState, useEffect } from "react";
import { Menu, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#1e293b] py-3 shadow-xs"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* Brand Logo */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="font-display text-2xl font-bold tracking-tight text-[#0f172a] flex items-center gap-1.5 group"
        >
          <span className="text-[#1d4ed8] font-black group-hover:text-[#1e40af] transition-colors">
            Tonnam.dev
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#works"
            className="text-xs font-semibold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1 flex items-center gap-1"
          >
            <span className="font-mono text-[#94a3b8] text-[10px] group-hover:text-[#1d4ed8] transition-colors">01.</span>
            <span>ผลงาน</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4ed8] transition-all duration-200 ease-out group-hover:w-full" />
          </a>
          <a
            href="#skills"
            className="text-xs font-semibold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1 flex items-center gap-1"
          >
            <span className="font-mono text-[#94a3b8] text-[10px] group-hover:text-[#1d4ed8] transition-colors">02.</span>
            <span>ทักษะ</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4ed8] transition-all duration-200 ease-out group-hover:w-full" />
          </a>
          <a
            href="#about"
            className="text-xs font-semibold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1 flex items-center gap-1"
          >
            <span className="font-mono text-[#94a3b8] text-[10px] group-hover:text-[#1d4ed8] transition-colors">03.</span>
            <span>เกี่ยวกับ</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4ed8] transition-all duration-200 ease-out group-hover:w-full" />
          </a>
          <a
            href="/blogs"
            className="text-xs font-semibold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1 flex items-center gap-1"
          >
            <span className="font-mono text-[#94a3b8] text-[10px] group-hover:text-[#1d4ed8] transition-colors">04.</span>
            <span>บล็อก</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4ed8] transition-all duration-200 ease-out group-hover:w-full" />
          </a>

          {/* Bangkok Live Timestamp Badge */}
          <motion.span
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#cbd5e1] bg-white text-[#1e293b] font-mono text-xs font-medium shadow-2xs cursor-default"
          >
            <Clock className="w-3.5 h-3.5 text-[#1d4ed8] animate-spin" style={{ animationDuration: "12s" }} />
            <span>BKK {currentTime || "--:--:--"}</span>
          </motion.span>
        </nav>

        {/* Mobile menu toggle */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center border border-[#1e293b] rounded bg-white text-[#0f172a] md:hidden shadow-xs transition-colors hover:bg-slate-50"
          aria-label="เมนู"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden px-6 py-4 bg-white border-b border-[#1e293b] overflow-hidden"
          >
            <nav className="flex flex-col gap-2">
              <a
                href="#works"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded transition-colors flex items-center gap-2"
              >
                <span className="font-mono text-xs text-[#94a3b8]">01.</span>
                <span>ผลงาน</span>
              </a>
              <a
                href="#skills"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded transition-colors flex items-center gap-2"
              >
                <span className="font-mono text-xs text-[#94a3b8]">02.</span>
                <span>ทักษะ</span>
              </a>
              <a
                href="#about"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded transition-colors flex items-center gap-2"
              >
                <span className="font-mono text-xs text-[#94a3b8]">03.</span>
                <span>เกี่ยวกับ</span>
              </a>
              <a
                href="/blogs"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded transition-colors flex items-center gap-2"
              >
                <span className="font-mono text-xs text-[#94a3b8]">04.</span>
                <span>บล็อก</span>
              </a>
              <div className="pt-2 border-t border-[#e2e8f0] flex items-center gap-2 text-xs font-mono text-[#64748b]">
                <Clock className="w-3.5 h-3.5 text-[#1d4ed8]" />
                <span>BKK {currentTime || "--:--:--"}</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

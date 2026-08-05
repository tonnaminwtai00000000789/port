import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f8fafc]/90 backdrop-blur-md border-b-2 border-[#0f172a] py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* Brand Logo */}
        <a
          href="/"
          className="font-display text-2xl font-black tracking-tight text-[#0f172a] flex items-center gap-1 group"
        >
          <span className="text-[#60a5fa] group-hover:text-[#2563eb] transition-colors">Tonnam</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="/"
            className="text-sm font-bold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1"
          >
            หน้าแรก
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#60a5fa] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#works"
            className="text-sm font-bold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1"
          >
            ผลงาน
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#60a5fa] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#skills"
            className="text-sm font-bold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1"
          >
            ทักษะ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#60a5fa] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#about"
            className="text-sm font-bold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1"
          >
            เกี่ยวกับ
          </a>
          <a
            href="/blogs"
            className="text-sm font-bold text-[#475569] hover:text-[#0f172a] transition-colors relative group py-1"
          >
            บล็อก
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center border-1.5 border-[#0f172a] bg-white text-[#0f172a] md:hidden shadow-[2px_2px_0px_#0f172a]"
          aria-label="เมนู"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 py-4 bg-[#f8fafc] border-b-2 border-[#0f172a] overflow-hidden"
          >
            <nav className="flex flex-col gap-2">
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#60a5fa] transition-colors"
              >
                หน้าแรก
              </a>
              <a
                href="#works"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#60a5fa] transition-colors"
              >
                ผลงาน
              </a>
              <a
                href="#skills"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#60a5fa] transition-colors"
              >
                ทักษะ
              </a>
              <a
                href="#about"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#60a5fa] transition-colors"
              >
                เกี่ยวกับ
              </a>
              <a
                href="/blogs"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-[#60a5fa] transition-colors"
              >
                บล็อก
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

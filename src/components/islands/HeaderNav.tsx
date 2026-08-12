import React, { useState, useEffect } from "react";
import { Menu, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnet } from "../reactbits/Magnet";
import { CardNav } from "../reactbits/CardNav";

export function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-GB", {
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

  const navLinks = [
    { href: "#works", label: "ผลงาน", num: "01" },
    { href: "#skills", label: "ทักษะ", num: "02" },
    { href: "#about", label: "เกี่ยวกับ", num: "03" },
    { href: "/blogs", label: "บล็อก", num: "04" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 shadow-lg"
          : "bg-transparent py-4"
      }`}
      style={
        scrolled
          ? {
              background: "rgba(13,0,16,0.9)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--kuro-border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(155,48,217,0.08)",
            }
          : {}
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand Logo */}
        <Magnet strength={0.2} radius={70}>
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 group"
          >
            <img
              src="/kuromi/sanrio-kuromi-cute-512x512.png"
              alt="Kuromi"
              className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <span
              className="font-display text-xl font-black tracking-tight kuro-gradient-text"
            >
              Tonnam.dev
            </span>
          </motion.a>
        </Magnet>

        {/* Desktop Navigation with CardNav & Clock */}
        <div className="hidden items-center gap-3 md:flex">
          <CardNav items={navLinks} />

          {/* Bangkok Clock */}
          <Magnet strength={0.15} radius={50}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold cursor-default"
              style={{
                border: "1px solid var(--kuro-border)",
                background: "rgba(22,2,30,0.75)",
                color: "var(--kuro-skull-dim)",
              }}
            >
              <Clock
                className="w-3.5 h-3.5"
                style={{ color: "var(--kuro-pink)", animation: "spin 12s linear infinite" }}
              />
              <span>BKK {currentTime || "--:--:--"}</span>
            </motion.div>
          </Magnet>
        </div>


        {/* Mobile toggle */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden transition-colors"
          style={{
            border: "1px solid var(--kuro-border)",
            background: "rgba(30,0,40,0.8)",
            color: "var(--kuro-skull)",
          }}
          aria-label="เมนู"
        >
          {mobileOpen ? <X className="w-5 h-5" style={{ color: "var(--kuro-pink)" }} /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden px-6 py-4 overflow-hidden"
            style={{
              background: "rgba(13,0,16,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--kuro-border)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold rounded-lg transition-all duration-150"
                  style={{ color: "var(--kuro-skull-dim)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(155,48,217,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "var(--kuro-skull)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "";
                    (e.currentTarget as HTMLElement).style.color = "var(--kuro-skull-dim)";
                  }}
                >
                  <span className="font-mono text-xs" style={{ color: "var(--kuro-muted)" }}>{link.num}.</span>
                  <span>{link.label}</span>
                </a>
              ))}
              <div
                className="mt-2 pt-3 flex items-center gap-2 text-xs font-mono"
                style={{ borderTop: "1px solid var(--kuro-border)", color: "var(--kuro-muted)" }}
              >
                <Clock className="w-3.5 h-3.5" style={{ color: "var(--kuro-pink)" }} />
                <span>BKK {currentTime || "--:--:--"}</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

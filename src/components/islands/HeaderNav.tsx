import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function HeaderNav({ webringUrl }: { webringUrl?: string | null }) {
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#f7f7f2]/90 backdrop-blur-md border-b-2 border-[#161616] py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* Brand Logo */}
        <a
          href="/"
          className="font-display text-2xl font-black tracking-tight text-[#161616] flex items-center gap-1 group"
        >
          <span className="text-[#ff4500]">Tonnam</span>.dev
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="/"
            className="text-sm font-bold text-[#525252] hover:text-[#161616] transition-colors"
          >
            หน้าแรก
          </a>
          <a
            href="#works"
            className="text-sm font-bold text-[#525252] hover:text-[#161616] transition-colors"
          >
            ผลงาน
          </a>
          <a
            href="#skills"
            className="text-sm font-bold text-[#525252] hover:text-[#161616] transition-colors"
          >
            ทักษะ
          </a>
          <a
            href="#about"
            className="text-sm font-bold text-[#525252] hover:text-[#161616] transition-colors"
          >
            เกี่ยวกับ
          </a>
          <a
            href="/blogs"
            className="text-sm font-bold text-[#525252] hover:text-[#161616] transition-colors"
          >
            บล็อก
          </a>

          {webringUrl && (
            <a
              href={webringUrl}
              target="_blank"
              rel="noreferrer"
              className="slant inline-flex items-center gap-1 px-3 py-1 bg-[#ff4500] text-white text-xs font-bold border border-[#161616] shadow-[2px_2px_0px_#161616] hover:translate-x-0.5 transition-all"
            >
              <span className="unslant inline-flex items-center gap-1">
                Webring <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center border-1.5 border-[#161616] bg-white text-[#161616] md:hidden shadow-[2px_2px_0px_#161616]"
          aria-label="เมนู"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 bg-[#f7f7f2] border-b-2 border-[#161616]">
          <nav className="flex flex-col gap-2">
            <a
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[#161616] hover:bg-[#ff4500] hover:text-white transition-colors"
            >
              หน้าแรก
            </a>
            <a
              href="#works"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[#161616] hover:bg-[#ff4500] hover:text-white transition-colors"
            >
              ผลงาน
            </a>
            <a
              href="#skills"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[#161616] hover:bg-[#ff4500] hover:text-white transition-colors"
            >
              ทักษะ
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[#161616] hover:bg-[#ff4500] hover:text-white transition-colors"
            >
              เกี่ยวกับ
            </a>
            <a
              href="/blogs"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[#161616] hover:bg-[#ff4500] hover:text-white transition-colors"
            >
              บล็อก
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

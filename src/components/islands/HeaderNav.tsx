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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="/"
          className="font-display text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 group"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md group-hover:scale-105 transition-transform">
            T
          </span>
          <span className="text-slate-900 group-hover:text-indigo-600 transition-colors">
            Tonnam<span className="text-indigo-600">.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#works"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Works
          </a>
          <a
            href="#skills"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#about"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            About
          </a>
          <a
            href="/blogs"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Blog
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Contact
          </a>

          {webringUrl && (
            <a
              href={webringUrl}
              target="_blank"
              rel="noreferrer"
              className="slant inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
            >
              <span className="unslant inline-flex items-center gap-1">
                Webring <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden hover:border-indigo-600 transition-colors shadow-sm"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="md:hidden px-6 pt-3 pb-6 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg animate-slide-down">
          <nav className="flex flex-col gap-3 pt-2">
            <a
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#works"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Works
            </a>
            <a
              href="#skills"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="/blogs"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Blog
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

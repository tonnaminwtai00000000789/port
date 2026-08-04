import React, { useState } from 'react';

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
            T
          </div>
          <span className="font-bold text-lg text-white tracking-wide group-hover:text-indigo-400 transition-colors">
            Tonnam<span className="text-indigo-500">.dev</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="/#about" className="hover:text-indigo-400 transition-colors">About</a>
          <a href="/#skills" className="hover:text-indigo-400 transition-colors">Tech Stack</a>
          <a href="/#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
          <a href="/blog" className="hover:text-indigo-400 transition-colors">Blog</a>
          <a
            href="https://webring.wonderful.software#nsys.site"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all text-xs font-semibold"
          >
            Webring 🌐
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col gap-4 text-slate-300 text-sm animate-fade-in">
          <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">About</a>
          <a href="/#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Tech Stack</a>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Contact</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Blog</a>
          <a
            href="https://webring.wonderful.software#nsys.site"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-fit px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold"
          >
            Webring 🌐
          </a>
        </div>
      )}
    </header>
  );
}

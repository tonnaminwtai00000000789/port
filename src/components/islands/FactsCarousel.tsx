import React, { useState } from 'react';

interface Fact {
  type: string;
  image?: string;
  title: string;
  subtitle: string;
}

interface Props {
  facts: Fact[];
}

export function FactsCarousel({ facts }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!facts || facts.length === 0) return null;

  const activeFact = facts[activeIndex];

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
          Personal Highlights & Facts
        </h4>
        <div className="flex gap-1.5">
          {facts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeIndex === idx ? 'bg-indigo-500 w-6' : 'bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Fact ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 transition-all">
        {activeFact.image && (
          <img
            src={activeFact.image}
            alt={activeFact.title}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-slate-700/60 shadow-md flex-shrink-0"
          />
        )}
        <div className="flex-1 text-center sm:text-left">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-2">
            {activeFact.subtitle}
          </span>
          <h3 className="text-xl font-bold text-white mb-1">{activeFact.title}</h3>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-800/60">
        <button
          onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : facts.length - 1))}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-800"
        >
          ← Previous
        </button>
        <span className="text-xs text-slate-500 font-mono">
          {activeIndex + 1} / {facts.length}
        </span>
        <button
          onClick={() => setActiveIndex((prev) => (prev < facts.length - 1 ? prev + 1 : 0))}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-800"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

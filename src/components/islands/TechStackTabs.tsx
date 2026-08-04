import React, { useState } from 'react';
import type { TechStackRow } from '../../lib/supabase';

interface Props {
  techStack: TechStackRow[];
}

export function TechStackTabs({ techStack }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!techStack || techStack.length === 0) return null;

  const categories = ['All', ...techStack.map((item) => item.category)];

  const filteredCategories = activeCategory === 'All'
    ? techStack
    : techStack.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((group) => (
          <div
            key={group.id || group.category}
            className="glass-card rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-4 pb-2 border-b border-slate-800/80 flex items-center justify-between">
              <span>{group.category}</span>
              <span className="text-xs text-indigo-400 font-normal px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                {group.technologies?.length || 0} tools
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {group.technologies?.map((tech: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700 transition-all group"
                >
                  {tech.icon && tech.icon.startsWith('http') ? (
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" />
                  ) : tech.icon ? (
                    <i className={`${tech.icon} text-xl group-hover:scale-110 transition-transform`}></i>
                  ) : (
                    <div className="w-6 h-6 rounded bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                      {tech.name[0]}
                    </div>
                  )}
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

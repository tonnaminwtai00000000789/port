import React from "react";
import { Terminal, Layers, Code, Cpu } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";

export interface Technology {
  name: string;
  icon: string;
}

export interface TechStackCategory {
  id: number;
  category: string;
  order: number;
  technologies: Technology[];
  updatedAt?: string;
}

export function TechStack({ data }: { data: TechStackCategory[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="py-16">
      {/* Section Header */}
      <div className="flex items-center gap-3.5 mb-10">
        <span className="slant inline-block h-7 w-3 rounded-sm bg-indigo-600"></span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Technological Arsenal
        </h2>
        <span className="h-px flex-1 bg-slate-200 ml-2"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((stack) => (
          <div
            key={stack.id || stack.category}
            className="card-light p-6 md:p-8 rounded-[32px] bg-white border border-slate-200/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Category</p>
                  <h3 className="text-lg font-bold text-slate-900">{stack.category}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stack.technologies?.map((tech, idx) => (
                  <HoverCard key={idx} openDelay={150}>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all cursor-pointer group">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:border-indigo-300 shrink-0 shadow-xs">
                          {tech.icon && tech.icon.startsWith("devicon-") ? (
                            <i className={`${tech.icon} text-lg text-slate-700 group-hover:text-indigo-600 transition-colors`} />
                          ) : tech.icon ? (
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-5 h-5 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <Code className="w-4 h-4 text-indigo-600" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                          {tech.name}
                        </span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xl w-60">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
                          {tech.icon && tech.icon.startsWith("devicon-") ? (
                            <i className={`${tech.icon} text-2xl text-indigo-600`} />
                          ) : tech.icon ? (
                            <img src={tech.icon} className="w-6 h-6 object-contain" alt={tech.name} />
                          ) : null}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-wider">{tech.name}</p>
                          <p className="text-[11px] text-indigo-600 font-bold mt-0.5">Mastery: Proficient</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

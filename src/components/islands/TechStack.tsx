import React from "react";
import { Terminal, Code } from "lucide-react";
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
    <section id="skills" className="py-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="slant inline-block h-6 w-2.5 rounded-xs bg-indigo-600"></span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Technological Arsenal
        </h2>
        <span className="h-px flex-1 bg-slate-200 ml-2"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((stack) => (
          <div
            key={stack.id || stack.category}
            className="card-light p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Category</p>
                  <h3 className="text-base font-bold text-slate-900">{stack.category}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {stack.technologies?.map((tech, idx) => (
                  <HoverCard key={idx} openDelay={150}>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-indigo-50/60 hover:border-indigo-200 transition-all cursor-pointer group">
                        <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:border-indigo-300 shrink-0 shadow-xs">
                          {tech.icon && tech.icon.startsWith("devicon-") ? (
                            <i className={`${tech.icon} text-base text-slate-700 group-hover:text-indigo-600 transition-colors`} />
                          ) : tech.icon ? (
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-4 h-4 object-contain"
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
                    <HoverCardContent className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-lg w-56">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                          {tech.icon && tech.icon.startsWith("devicon-") ? (
                            <i className={`${tech.icon} text-xl text-indigo-600`} />
                          ) : tech.icon ? (
                            <img src={tech.icon} className="w-5 h-5 object-contain" alt={tech.name} />
                          ) : null}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-wider">{tech.name}</p>
                          <p className="text-[10px] text-indigo-600 font-bold mt-0.5">Mastery: Proficient</p>
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

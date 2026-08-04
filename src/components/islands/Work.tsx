import React from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export interface WorkTag {
  label: string;
  url: string;
}

export interface WorkLink {
  url: string;
  type: "website" | "external";
}

export interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
  size: "large" | "small";
  watermark: string | null;
  tags: WorkTag[];
  links: WorkLink[];
  order: number;
}

export function Work({ data }: { data: WorkItem[] }) {
  if (!data || data.length === 0) return null;

  const largeWorks = data.filter((w) => w.size === "large");
  const smallWorks = data.filter((w) => w.size === "small");

  return (
    <TooltipProvider>
      <section id="works" className="py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="slant inline-block h-6 w-2.5 rounded-xs bg-indigo-600"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Recent Artistic Endeavors
            </h2>
          </div>
          <a
            href="/works"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View Archive <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Large Projects Showcase */}
        {largeWorks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {largeWorks.map((work) => (
              <div
                key={work.id}
                className="card-light rounded-xl overflow-hidden bg-white group border border-slate-200 flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-0.5 rounded-md bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                      {work.year}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="space-y-2.5 mb-5">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      {work.description}
                    </p>

                    {work.tags && work.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {work.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold"
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                    {work.links?.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-indigo-600 text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                      >
                        {link.type === "website" ? (
                          <>
                            Visit Website <ExternalLink className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            View Code <Github className="w-3 h-3" />
                          </>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Small Projects */}
        {smallWorks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {smallWorks.map((work) => (
              <div
                key={work.id}
                className="card-light p-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors group flex items-center gap-3"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                    {work.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mb-1.5 font-medium">{work.description}</p>
                  <div className="flex gap-2">
                    {work.links?.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-0.5"
                      >
                        Launch <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </TooltipProvider>
  );
}

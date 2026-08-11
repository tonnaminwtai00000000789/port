import React from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

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
  watermark?: string | null;
  url?: string;
  tags?: WorkTag[];
  links?: WorkLink[];
  order?: number;
}

export function Work({ data }: { data: WorkItem[] }) {
  if (!data || data.length === 0) return null;

  const largeWorks = data.filter((w) => w.size === "large");
  const smallWorks = data.filter((w) => w.size === "small");

  const getTargetUrl = (work: WorkItem) => {
    if (work.url) return work.url;
    if (work.links && work.links.length > 0) return work.links[0].url;
    return null;
  };

  return (
    <section id="works" className="py-10">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-mono text-xs text-[#1d4ed8] font-bold block mb-1">
            [SPEC // 01]
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display tracking-tight">
            ผลงานที่โดดเด่น
          </h2>
        </div>
        <a
          href="/works"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1d4ed8] hover:underline font-mono"
        >
          ดูทั้งหมด <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Large Projects Showcase */}
      {largeWorks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {largeWorks.map((work, idx) => {
            const primaryUrl = getTargetUrl(work);
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="paper-card overflow-hidden bg-white flex flex-col justify-between group"
              >
                {/* Project Image */}
                {primaryUrl ? (
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="aspect-[16/10] overflow-hidden relative border-b border-[#1e293b] block bg-[#f8fafc]"
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-[#1e293b] text-white text-[10px] font-mono font-semibold rounded shadow-2xs">
                      {work.year}
                    </span>
                  </a>
                ) : (
                  <div className="aspect-[16/10] overflow-hidden relative border-b border-[#1e293b] bg-[#f8fafc]">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-[#1e293b] text-white text-[10px] font-mono font-semibold rounded shadow-2xs">
                      {work.year}
                    </span>
                  </div>
                )}

                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0f172a] font-display">
                      {primaryUrl ? (
                        <a
                          href={primaryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#1d4ed8] transition-colors inline-flex items-center gap-1.5"
                        >
                          {work.title}
                          <ArrowUpRight className="w-4 h-4 text-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                        </a>
                      ) : (
                        work.title
                      )}
                    </h3>
                    <p className="text-[#475569] text-xs leading-relaxed font-sans">
                      {work.description}
                    </p>

                    {work.tags && work.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {work.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="tag-badge">
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#f1f5f9]">
                    {work.links && work.links.length > 0 ? (
                      work.links.map((link, linkIdx) => (
                        <motion.a
                          key={linkIdx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          className="stamp-btn-blue px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          {link.type === "website" ? (
                            <>
                              เปิดดูเว็บไซต์ <ExternalLink className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              ซอร์สโค้ด <Github className="w-3.5 h-3.5" />
                            </>
                          )}
                        </motion.a>
                      ))
                    ) : primaryUrl ? (
                      <motion.a
                        href={primaryUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        className="stamp-btn-blue px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        เปิดดูเว็บไซต์ <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Small Projects */}
      {smallWorks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smallWorks.map((work, idx) => {
            const primaryUrl = getTargetUrl(work);
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.08 * idx }}
                className="paper-card-subtle p-3.5 bg-white flex items-center gap-3 group"
              >
                <div className="w-11 h-11 border border-[#cbd5e1] rounded shrink-0 overflow-hidden bg-[#f8fafc]">
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#0f172a] truncate font-display group-hover:text-[#1d4ed8] transition-colors">
                    {work.title}
                  </h4>
                  <p className="text-[11px] text-[#64748b] truncate mb-1">{work.description}</p>
                  {primaryUrl && (
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-bold text-[#1d4ed8] hover:underline inline-flex items-center gap-0.5 font-mono"
                    >
                      เปิดดู <ArrowUpRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}

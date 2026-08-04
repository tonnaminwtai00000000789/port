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
    <section id="works" className="py-10">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="slant inline-block h-6 w-2.5 bg-[#60a5fa]"></span>
          <h2 className="text-2xl font-black text-[#0f172a] font-display">
            ผลงานที่โดดเด่น
          </h2>
        </div>
        <a
          href="/works"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:underline"
        >
          ดูทั้งหมด <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Large Projects Showcase */}
      {largeWorks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {largeWorks.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="card-paper overflow-hidden bg-white border-1.5 border-[#0f172a] flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden relative border-b-1.5 border-[#0f172a]">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#0f172a] text-white text-[10px] font-mono font-bold border border-white">
                  {work.year}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-[#0f172a]">
                    {work.title}
                  </h3>
                  <p className="text-[#475569] text-xs leading-relaxed">
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

                <div className="flex items-center gap-2 pt-2">
                  {work.links?.map((link, linkIdx) => (
                    <motion.a
                      key={linkIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#0f172a] text-white hover:bg-[#2563eb] text-xs font-bold transition-colors inline-flex items-center gap-1 border border-[#0f172a]"
                    >
                      {link.type === "website" ? (
                        <>
                          เปิดเว็บไซต์ <ExternalLink className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          ดูซอร์สโค้ด <Github className="w-3 h-3" />
                        </>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Small Projects */}
      {smallWorks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smallWorks.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="card-paper p-4 bg-white border-1.5 border-[#0f172a] flex items-center gap-3"
            >
              <div className="w-12 h-12 border border-[#0f172a] shrink-0 overflow-hidden">
                <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#0f172a] truncate">
                  {work.title}
                </h4>
                <p className="text-[10px] text-[#475569] truncate mb-1">{work.description}</p>
                {work.links?.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-[#2563eb] hover:underline inline-flex items-center gap-0.5"
                  >
                    เปิดดู <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

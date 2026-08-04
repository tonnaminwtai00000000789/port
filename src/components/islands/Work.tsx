import React from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

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
          <span className="slant inline-block h-6 w-2.5 bg-[#ff4500]"></span>
          <h2 className="text-2xl font-black text-[#161616] font-display">
            ผลงานที่โดดเด่น
          </h2>
        </div>
        <a
          href="/works"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#ff4500] hover:underline"
        >
          ดูทั้งหมด <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Large Projects Showcase */}
      {largeWorks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {largeWorks.map((work) => (
            <div
              key={work.id}
              className="card-paper overflow-hidden bg-white border-1.5 border-[#161616] flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden relative border-b-1.5 border-[#161616]">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#161616] text-white text-[10px] font-mono font-bold border border-white">
                  {work.year}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-[#161616]">
                    {work.title}
                  </h3>
                  <p className="text-[#525252] text-xs leading-relaxed">
                    {work.description}
                  </p>

                  {work.tags && work.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {work.tags.map((tag, idx) => (
                        <span key={idx} className="tag-badge">
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  {work.links?.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#161616] text-white hover:bg-[#ff4500] text-xs font-bold transition-colors inline-flex items-center gap-1 border border-[#161616]"
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smallWorks.map((work) => (
            <div
              key={work.id}
              className="card-paper p-4 bg-white border-1.5 border-[#161616] flex items-center gap-3"
            >
              <div className="w-12 h-12 border border-[#161616] shrink-0 overflow-hidden">
                <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#161616] truncate">
                  {work.title}
                </h4>
                <p className="text-[10px] text-[#525252] truncate mb-1">{work.description}</p>
                {work.links?.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-[#ff4500] hover:underline inline-flex items-center gap-0.5"
                  >
                    เปิดดู <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

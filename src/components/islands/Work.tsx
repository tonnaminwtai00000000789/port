import React from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { DecryptedText } from "../reactbits/DecryptedText";
import { TiltedCard } from "../reactbits/TiltedCard";
import { Magnet } from "../reactbits/Magnet";
import { MoltenMetal } from "../reactbits/MoltenMetal";

export interface WorkTag { label: string; url: string; }
export interface WorkLink { url: string; type: "website" | "external"; }
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
    if (work.links?.length) return work.links[0].url;
    return null;
  };

  return (
    <section id="works" className="py-10">
      <MoltenMetal color1="#120018" color2="#9b30d9" speed={1.1} className="rounded-2xl p-6 sm:p-8 border border-[var(--kuro-border)]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="kuro-section-label">
              <DecryptedText text="✦ [SPEC // 01]" animateOn="view" speed={45} />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
              ผลงานที่โดดเด่น
            </h2>
          </div>
          <Magnet strength={0.2} radius={60}>
            <a
              href="/works"
              className="inline-flex items-center gap-1 text-xs font-bold font-mono transition-colors hover:underline"
              style={{ color: "var(--kuro-primary-glow)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-pink)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
            >
              ดูทั้งหมด <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Magnet>
        </div>

        {/* Large projects Showcase (Card Grid) */}
        {largeWorks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {largeWorks.map((work, idx) => {
              const url = getTargetUrl(work);
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <TiltedCard maxAngle={8} scaleOnHover={1.015} containerClassName="h-full" className="h-full">
                    <SpotlightCard className="p-5 flex flex-col justify-between group h-full rounded-xl overflow-hidden shadow-xl" spotlightColor="rgba(192,96,255,0.15)">
                      {/* Media frame with subtle border */}
                      <div className="aspect-[16/10] overflow-hidden relative rounded-lg mb-4" style={{ border: "1px solid rgba(192, 96, 255, 0.12)" }}>
                        {url ? (
                          <a href={url} target="_blank" rel="noreferrer" className="block w-full h-full">
                            <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          </a>
                        ) : (
                          <img src={work.image} alt={work.title} className="w-full h-full object-cover" loading="lazy" />
                        )}
                        <Badge variant="pink" className="absolute top-2.5 right-2.5 shadow-md">{work.year}</Badge>
                      </div>

                      {/* Content */}
                      <div className="space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
                            {url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline inline-flex items-center gap-1.5 transition-colors group/title"
                                style={{ color: "var(--kuro-skull)" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-skull)")}
                              >
                                {work.title}
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-all" style={{ color: "var(--kuro-primary-glow)" }} />
                              </a>
                            ) : work.title}
                          </h3>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--kuro-muted-bright)" }}>
                            {work.description}
                          </p>
                          {work.tags && work.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {work.tags.map((tag, ti) => (
                                <Badge key={ti} variant="outline">{tag.label}</Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action links with subtle top divider */}
                        <div className="flex flex-wrap items-center gap-2 pt-3" style={{ borderTop: "1px solid rgba(192, 96, 255, 0.12)" }}>
                          {work.links && work.links.length > 0 ? (
                            work.links.map((link, li) => (
                              <Magnet key={li} strength={0.2} radius={50}>
                                <Button asChild size="sm" variant={link.type === "website" ? "default" : "outline"}>
                                  <a href={link.url} target="_blank" rel="noreferrer" className="gap-1.5">
                                    {link.type === "website" ? (<><span>เปิดเว็บไซต์</span><ExternalLink className="w-3.5 h-3.5" /></>) : (<><span>ซอร์สโค้ด</span><Github className="w-3.5 h-3.5" /></>)}
                                  </a>
                                </Button>
                              </Magnet>
                            ))
                          ) : url ? (
                            <Magnet strength={0.2} radius={50}>
                              <Button asChild size="sm">
                                <a href={url} target="_blank" rel="noreferrer" className="gap-1.5">
                                  เปิดเว็บไซต์ <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </Button>
                            </Magnet>
                          ) : null}
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltedCard>
                </motion.div>
              );
            })}
          </div>
        )}

      {/* Small projects Card Grid */}
      {smallWorks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smallWorks.map((work, idx) => {
            const url = getTargetUrl(work);
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.06 * idx }}
                className="kuro-card-subtle p-3.5 flex items-center gap-3 group rounded-xl"
              >
                <div className="w-12 h-12 rounded-xl shrink-0 overflow-hidden" style={{ border: "1px solid var(--kuro-border)" }}>
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xs font-bold truncate transition-colors"
                    style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-skull)")}
                  >
                    {work.title}
                  </h4>
                  <p className="text-[11px] truncate mb-1" style={{ color: "var(--kuro-muted)" }}>{work.description}</p>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-bold font-mono inline-flex items-center gap-0.5 hover:underline transition-colors"
                      style={{ color: "var(--kuro-primary-glow)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-pink)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
                    >
                      เปิดดู <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      </MoltenMetal>
    </section>
  );
}

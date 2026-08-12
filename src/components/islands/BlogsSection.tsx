import React from "react";
import { ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { DecryptedText } from "../reactbits/DecryptedText";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  published: boolean;
  content?: string;
}

export function BlogsSection({ data }: { data: Blog[] }) {
  if (!data || data.length === 0) return null;
  const latestBlogs = data.slice(0, 3);

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="kuro-section-label">
            <DecryptedText text="✦ [WRITINGS // 04]" animateOn="view" speed={45} />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
            บทความล่าสุด
          </h2>
        </div>
        <a
          href="/blogs"
          className="inline-flex items-center gap-1 text-xs font-bold font-mono transition-colors hover:underline"
          style={{ color: "var(--kuro-primary-glow)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-pink)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
        >
          อ่านทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {latestBlogs.map((blog, idx) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard className="overflow-hidden flex flex-col justify-between group h-full cursor-pointer" spotlightColor="rgba(255,105,200,0.07)">
              <a href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative" style={{ borderBottom: "1px solid var(--kuro-border)" }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold"
                    style={{ background: "rgba(13,0,16,0.85)", color: "var(--kuro-skull-dim)", border: "1px solid var(--kuro-border)" }}
                  >
                    <Clock className="w-3 h-3" style={{ color: "var(--kuro-pink)" }} />
                    {blog.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <h3
                    className="text-sm font-black line-clamp-2 mb-3 leading-snug transition-colors"
                    style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-skull)")}
                  >
                    {blog.title}
                  </h3>

                  <div
                    className="pt-2 flex items-center justify-between text-xs font-bold"
                    style={{ borderTop: "1px solid var(--kuro-border)", color: "var(--kuro-pink)" }}
                  >
                    <span>อ่านต่อ</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

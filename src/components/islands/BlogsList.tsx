import React from "react";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogRow } from "../../lib/supabase";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { Button } from "../ui/button";

export function BlogsList({ blogs }: { blogs: BlogRow[] }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6"
        style={{ borderBottom: "1px solid var(--kuro-border)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-8 w-1.5 rounded-full"
            style={{ background: "linear-gradient(to bottom, var(--kuro-primary-glow), var(--kuro-pink))" }}
          />
          <div>
            <span className="kuro-section-label">WRITINGS &amp; THOUGHTS</span>
            <h1
              className="text-3xl font-black"
              style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
            >
              บทความทั้งหมด
            </h1>
          </div>
        </div>

        <Button asChild variant="outline" size="sm">
          <a href="/" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าหลัก</span>
          </a>
        </Button>
      </div>

      {/* Grid */}
      {blogs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 * idx }}
            >
              <SpotlightCard className="overflow-hidden flex flex-col justify-between group h-full" spotlightColor="rgba(255,105,200,0.07)">
                <a href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                  <div
                    className="aspect-[16/10] overflow-hidden relative"
                    style={{ borderBottom: "1px solid var(--kuro-border)" }}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold"
                      style={{
                        background: "rgba(13,0,16,0.85)",
                        color: "var(--kuro-skull-dim)",
                        border: "1px solid var(--kuro-border)",
                      }}
                    >
                      <Clock className="w-3 h-3" style={{ color: "var(--kuro-pink)" }} />
                      {blog.date}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <h2
                      className="text-base font-black line-clamp-2 leading-snug mb-3 transition-colors"
                      style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-skull)")}
                    >
                      {blog.title}
                    </h2>

                    <div
                      className="pt-3 flex items-center justify-between text-xs font-bold"
                      style={{ borderTop: "1px solid var(--kuro-border)", color: "var(--kuro-pink)" }}
                    >
                      <span>อ่านบทความเต็ม</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          className="p-12 text-center rounded-xl"
          style={{
            background: "rgba(19,0,24,0.6)",
            border: "1px solid var(--kuro-border)",
            color: "var(--kuro-muted-bright)",
          }}
        >
          <img src="/kuromi/kuromi-laughing-512x512.png" alt="Kuromi" className="w-20 h-20 object-contain mx-auto mb-4 opacity-60" />
          ยังไม่มีบทความในขณะนี้
        </div>
      )}
    </div>
  );
}

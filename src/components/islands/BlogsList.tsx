import React from "react";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogRow } from "../../lib/supabase";

export function BlogsList({ blogs }: { blogs: BlogRow[] }) {
  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#cbd5e1]">
        <div className="flex items-center gap-3">
          <span className="inline-block h-8 w-1.5 bg-[#1d4ed8] rounded-full"></span>
          <div>
            <span className="text-xs font-mono font-bold text-[#1d4ed8] uppercase tracking-wider block">
              WRITINGS & THOUGHTS
            </span>
            <h1 className="text-3xl font-bold text-[#0f172a] font-display">
              บทความทั้งหมด
            </h1>
          </div>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0f172a] border border-[#1e293b] text-xs font-bold rounded-lg shadow-xs hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-all w-fit font-mono"
        >
          <ArrowLeft className="w-4 h-4 text-[#1d4ed8]" />
          <span>กลับหน้าหลัก</span>
        </a>
      </div>

      {/* Blogs Grid */}
      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <motion.a
              key={blog.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * idx }}
              whileHover={{ y: -4 }}
              href={`/blogs/${blog.slug}`}
              className="paper-card overflow-hidden bg-white flex flex-col justify-between group"
            >
              <div className="aspect-[16/10] overflow-hidden relative border-b border-[#1e293b] bg-[#f8fafc]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#1e293b] text-white text-[10px] font-mono font-semibold flex items-center gap-1 rounded shadow-2xs">
                  <Clock className="w-3 h-3 text-[#93c5fd]" /> {blog.date}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <h2 className="text-base font-bold text-[#0f172a] font-display group-hover:text-[#1d4ed8] transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h2>

                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#1d4ed8]">
                  <span>อ่านบทความเต็ม</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white paper-card text-[#475569] font-medium font-sans">
          ยังไม่มีบทความในขณะนี้
        </div>
      )}
    </div>
  );
}

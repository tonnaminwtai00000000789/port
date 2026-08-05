import React from "react";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogRow } from "../../lib/supabase";

export function BlogsList({ blogs }: { blogs: BlogRow[] }) {
  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#0f172a]">
        <div className="flex items-center gap-3">
          <span className="slant inline-block h-8 w-3 bg-[#60a5fa]"></span>
          <div>
            <span className="text-xs font-mono font-bold text-[#2563eb] uppercase tracking-wider">
              WRITINGS & THOUGHTS
            </span>
            <h1 className="text-3xl font-black text-[#0f172a] font-display">
              บทความทั้งหมด
            </h1>
          </div>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0f172a] border-1.5 border-[#0f172a] text-xs font-bold shadow-[2px_2px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563eb]" />
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
              className="card-paper overflow-hidden bg-white border-1.5 border-[#0f172a] flex flex-col justify-between shadow-[3px_3px_0px_#0f172a] hover:shadow-[5px_5px_0px_#0f172a] transition-all duration-200"
            >
              <div className="aspect-[16/10] overflow-hidden relative border-b-1.5 border-[#0f172a]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#0f172a] text-white text-[10px] font-mono font-bold flex items-center gap-1 border border-white">
                  <Clock className="w-3 h-3 text-[#60a5fa]" /> {blog.date}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <h2 className="text-base font-extrabold text-[#0f172a] hover:text-[#2563eb] transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h2>

                <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs font-bold text-[#2563eb]">
                  <span>อ่านบทความเต็ม</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border-1.5 border-[#0f172a] text-[#475569] font-medium">
          ยังไม่มีบทความในขณะนี้
        </div>
      )}
    </div>
  );
}

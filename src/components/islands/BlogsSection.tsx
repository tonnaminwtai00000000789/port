import React from "react";
import { ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-mono text-xs text-[#1d4ed8] font-bold block mb-1">
            [WRITINGS // 04]
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display tracking-tight">
            บทความล่าสุด
          </h2>
        </div>

        <a
          href="/blogs"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1d4ed8] hover:underline font-mono"
        >
          อ่านทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {latestBlogs.map((blog, idx) => (
          <motion.a
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
            href={`/blogs/${blog.slug}`}
            className="paper-card overflow-hidden bg-white flex flex-col justify-between group"
          >
            <div className="aspect-[16/10] overflow-hidden relative border-b border-[#e2e8f0] bg-[#f8fafc]">
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

            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-sm font-bold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors line-clamp-2 mb-3 leading-snug font-display">
                {blog.title}
              </h3>

              <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#1d4ed8]">
                <span>อ่านต่อ</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

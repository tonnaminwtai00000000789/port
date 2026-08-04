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
        <div className="flex items-center gap-3">
          <span className="slant inline-block h-6 w-2.5 bg-[#60a5fa]"></span>
          <h2 className="text-2xl font-black text-[#0f172a] font-display">
            บทความล่าสุด
          </h2>
        </div>

        <a
          href="/blogs"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:underline"
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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            href={`/blogs/${blog.slug}`}
            className="card-paper overflow-hidden bg-white border-1.5 border-[#0f172a] flex flex-col justify-between"
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

            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-base font-extrabold text-[#0f172a] hover:text-[#2563eb] transition-colors line-clamp-2 mb-3 leading-snug">
                {blog.title}
              </h3>

              <div className="pt-2 border-t border-[#e2e8f0] flex items-center justify-between text-xs font-bold text-[#2563eb]">
                <span>อ่านต่อ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

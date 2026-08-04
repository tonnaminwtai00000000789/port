import React from "react";
import { ChevronRight, Clock } from "lucide-react";

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
    <section className="py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="slant inline-block h-6 w-2.5 rounded-xs bg-indigo-600"></span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Latest Writings
          </h2>
        </div>

        <a
          href="/blogs"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View All Posts <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestBlogs.map((blog) => (
          <a
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="card-light rounded-xl overflow-hidden bg-white group border border-slate-200 flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-0.5 rounded-md bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 text-xs font-bold shadow-xs inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-indigo-600" /> {blog.date}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-3 leading-snug">
                {blog.title}
              </h3>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Read Article</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

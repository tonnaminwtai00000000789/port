import React from "react";
import { ChevronRight, Newspaper, Clock } from "lucide-react";

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
    <section className="py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3.5">
          <span className="slant inline-block h-7 w-3 rounded-sm bg-indigo-600"></span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Latest Writings
          </h2>
        </div>

        <a
          href="/blogs"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View All Posts <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestBlogs.map((blog) => (
          <a
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="card-light rounded-[32px] overflow-hidden bg-white group border border-slate-200/80 flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 text-xs font-bold shadow-xs inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-indigo-600" /> {blog.date}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-4 leading-snug">
                {blog.title}
              </h3>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Read Article</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

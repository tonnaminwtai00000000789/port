import { Newspaper, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  published: boolean;
  content?: string;
}

export default function BlogSection({ data }: { data: Blog[] }) {
  const latestBlogs = data.slice(0, 3);

  return (
    <div className="mb-24 py-12 md:py-24">
      <div className="flex items-center justify-between mb-10 md:mb-16">
        <div>
          <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.4em] uppercase mb-1">INTELLECT</h2>
          <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white tracking-tighter text-balance">Latest from the Blog</h1>
        </div>

        <Link
          to="/blogs"
          prefetch="intent"
          className="hidden md:flex items-center gap-3 px-8 py-4 rounded-3xl glass-card text-white hover:bg-white/10 transition-all group hover:-translate-y-1 active:scale-95"
        >
          <span className="text-sm font-black tracking-widest uppercase">Archive</span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {latestBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.slug}`}
            prefetch="intent"
            className="group block glass-card rounded-[32px] md:rounded-[40px] overflow-hidden transition-all duration-700 md:hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-all duration-1000 md:group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-transparent opacity-90" />

              <div className="absolute top-4 md:top-6 left-4 md:left-6">
                <span className="glass px-3 md:px-4 py-1 md:py-1.5 rounded-xl md:rounded-2xl border border-white/10 text-[8px] md:text-[10px] font-black tracking-widest text-white flex items-center gap-2 uppercase">
                  <Newspaper className="w-3 h-3 text-primary" /> Article
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow relative">
              <div className="absolute -top-8 md:-top-10 left-6 md:left-8 right-6 md:right-8">
                <div className="glass px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-white/5 inline-block text-[8px] md:text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                  {blog.date}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-6 line-clamp-2 group-hover:text-primary transition-colors leading-tight tracking-tighter mt-4 md:mt-4">
                {blog.title}
              </h3>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] items-center text-primary font-black uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Dive Deeper
                </span>
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center md:hidden">
        <Link to="/blogs" prefetch="intent" className="px-6 py-3 w-full text-center bg-dark-accent border border-dark-border text-white rounded-xl hover:bg-primary transition-colors">
          View All Posts
        </Link>
      </div>
    </div>
  );
}

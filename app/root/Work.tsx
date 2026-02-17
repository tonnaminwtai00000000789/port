import { ArrowUpRight, Layout } from "lucide-react";
import { Link } from "react-router";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

export interface WorkTag {
  label: string;
  url: string;
}

export interface WorkLink {
  url: string;
  type: "website" | "external";
}

export interface Work {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
  size: "large" | "small";
  watermark: string | null;
  tags: WorkTag[];
  links: WorkLink[];
  order: number;
}

export default function MyWorks({ data }: { data: Work[] }) {
  const largeWorks = data.filter((w) => w.size === "large");
  const smallWorks = data.filter((w) => w.size === "small");

  return (
    <TooltipProvider>
      <div className="mb-24">
        <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-16">
          <div className="p-3 md:p-4 rounded-xl md:rounded-[24px] glass-card text-primary shadow-2xl">
            <Layout className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.4em] uppercase mb-1">CRAFTSMANSHIP</h2>
            <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white tracking-tighter text-balance">Recent Artistic Endeavors</h1>
          </div>
        </div>
        <Link
          to="/works"
          prefetch="intent"
          className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          View Archive <ArrowUpRight className="w-4 h-4" />
        </Link>

        {/* Large Projects */}
        {largeWorks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {largeWorks.map((work) => (
              <div
                key={work.id}
                className="group relative glass-card rounded-[32px] md:rounded-[40px] overflow-hidden transition-all duration-700 md:hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.1)]"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-[#030405]/40 to-transparent opacity-90" />

                  <div className="absolute top-4 md:top-6 right-4 md:right-6">
                    <span className="glass border border-white/10 text-white text-[10px] md:text-xs font-mono px-3 md:px-4 py-1 md:py-1.5 rounded-full filter drop-shadow-md">
                      {work.year}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-10">
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2 leading-tight tracking-tighter group-hover:text-primary transition-colors duration-500">
                        {work.title}
                      </h3>
                      <p className="text-gray-400 font-medium line-clamp-2 text-sm md:text-lg leading-relaxed">
                        {work.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 md:pt-4 md:opacity-0 md:transform md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {work.tags.map((tag, idx) => (
                        <span key={idx} className="glass text-[8px] md:text-[10px] uppercase tracking-widest text-primary font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-lg">
                          {tag.label}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 flex gap-2 md:gap-3 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {work.links.map((link, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-white text-black p-3 md:p-4 rounded-full hover:bg-primary hover:text-white transition-all md:hover:scale-110 shadow-2xl"
                            >
                              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{link.type === 'website' ? 'Visit Website' : 'View Code'}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Small Projects */}
        {smallWorks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {smallWorks.map((work) => (
              <div
                key={work.id}
                className="glass-card p-1 md:p-2 rounded-[24px] md:rounded-[32px] hover:bg-white/5 transition-all group duration-500"
              >
                <div className="flex items-center gap-4 md:gap-5 p-3 md:p-4 h-full">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex-shrink-0 md:group-hover:scale-95 transition-transform duration-500">
                    <img src={work.image} alt={work.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" loading="lazy" decoding="async" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black truncate text-sm md:text-base group-hover:text-primary transition-colors duration-500">{work.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm truncate font-medium mb-2 md:mb-3">{work.description}</p>
                    <div className="flex gap-2">
                      {work.links.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" className="text-[9px] md:text-[10px] uppercase tracking-tighter text-gray-400 hover:text-primary flex items-center gap-1 transition-colors font-bold">
                          Launch <ArrowUpRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/works" prefetch="intent" className="px-6 py-3 bg-dark-accent border border-dark-border text-white rounded-xl hover:bg-primary transition-colors">
            View All Projects
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
}

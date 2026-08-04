import { Terminal, Code, Cpu } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../components/ui/hover-card";

export interface Technology {
  name: string;
  icon: string;
}

export interface TechStackCategory {
  id: number;
  category: string;
  order: number;
  technologies: Technology[];
  updatedAt?: string;
}

export default function TechStack({ data }: { data: TechStackCategory[] }) {
  return (
    <div className="mb-24 py-12 md:py-24 glass rounded-[32px] md:rounded-[40px] border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12">
        <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-16">
          <div className="p-3 md:p-4 rounded-xl md:rounded-[20px] glass-card text-primary shadow-2xl">
            <Terminal className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.4em] uppercase mb-1">CAPABILITIES</h2>
            <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black text-white tracking-tighter text-balance">Technological Arsenal</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {data.map((stack) => (
            <div key={stack.id} className="group flex flex-col">
              <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 pb-3 border-b border-white/10 group-hover:border-primary/50 transition-all duration-500">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-lg md:text-xl font-bold text-gray-200 group-hover:text-white transition-colors">{stack.category}</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {stack.technologies.map((tech, idx) => (
                  <HoverCard key={idx} openDelay={200}>
                    <HoverCardTrigger asChild>
                      <div
                        className="flex items-center gap-2 md:gap-3 glass-card p-2 md:p-3 rounded-xl md:rounded-2xl group/tech hover:bg-white/5 transition-all duration-300 cursor-crosshair active:scale-95"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl bg-black/40 border border-white/5 group-hover/tech:border-primary/30 transition-colors">
                          {tech.icon.startsWith("devicon-") ? (
                            <i className={`${tech.icon} text-base md:text-xl opacity-50 group-hover/tech:opacity-100 grayscale-0 transition-all text-gray-400 group-hover/tech:text-white`} />
                          ) : tech.icon ? (
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-4 h-4 md:w-5 md:h-5 object-contain opacity-50 group-hover/tech:opacity-100 transition-all"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                        </div>
                        <span className="text-[8px] md:text-[10px] font-bold text-gray-400 group-hover/tech:text-white transition-colors uppercase tracking-wider leading-tight break-words">
                          {tech.name}
                        </span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="glass-card border-white/10 p-4 rounded-2xl backdrop-blur-2xl">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-black/40 border border-white/10 rounded-xl">
                          {tech.icon.startsWith("devicon-") ? (
                            <i className={`${tech.icon} text-3xl text-primary`} />
                          ) : tech.icon ? (
                            <img src={tech.icon} className="w-8 h-8 object-contain" alt={tech.name} />
                          ) : null}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">{tech.name}</h4>
                          <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase">Mastery level: Expert</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

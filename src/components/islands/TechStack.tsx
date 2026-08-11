import React from "react";
import { Terminal, Code, Cpu } from "lucide-react";
import { motion } from "framer-motion";

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

export function TechStack({ data }: { data: TechStackCategory[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="py-10">
      {/* Section Title */}
      <div className="mb-6">
        <span className="font-mono text-xs text-[#1d4ed8] font-bold block mb-1">
          [TOOLKIT // 02]
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display tracking-tight">
          ทักษะ & เครื่องมือ
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((stack, idx) => (
          <motion.div
            key={stack.id || stack.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
            className="paper-card p-5 bg-white"
          >
            <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-[#cbd5e1]">
              {idx === 1 ? (
                <Cpu className="w-4 h-4 text-[#1d4ed8]" />
              ) : (
                <Terminal className="w-4 h-4 text-[#1d4ed8]" />
              )}
              <h3 className="text-sm font-bold text-[#0f172a] font-display">
                {stack.category}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {stack.technologies?.map((tech, techIdx) => (
                <motion.div
                  key={techIdx}
                  whileHover={{ scale: 1.03, y: -1 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2 p-2 rounded bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:bg-[#eff6ff] transition-colors group cursor-default"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-[#1e293b] shrink-0 group-hover:scale-110 transition-transform">
                    {tech.icon && tech.icon.startsWith("devicon-") ? (
                      <i className={`${tech.icon} text-sm`} />
                    ) : tech.icon ? (
                      <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <Code className="w-3.5 h-3.5 text-[#1d4ed8]" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#0f172a] truncate font-sans group-hover:text-[#1d4ed8] transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

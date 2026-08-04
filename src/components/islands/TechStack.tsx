import React from "react";
import { Terminal, Code } from "lucide-react";
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
      <div className="flex items-center gap-3 mb-6">
        <span className="slant inline-block h-6 w-2.5 bg-[#60a5fa]"></span>
        <h2 className="text-2xl font-black text-[#0f172a] font-display">
          ทักษะ & เครื่องมือ
        </h2>
        <span className="h-px flex-1 bg-[#e2e8f0] ml-2"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((stack, idx) => (
          <motion.div
            key={stack.id || stack.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            className="card-paper p-5 bg-white border-1.5 border-[#0f172a]"
          >
            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b-1.5 border-[#0f172a]">
              <Terminal className="w-4 h-4 text-[#2563eb]" />
              <h3 className="text-sm font-extrabold text-[#0f172a]">{stack.category}</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {stack.technologies?.map((tech, techIdx) => (
                <motion.div
                  key={techIdx}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 p-2 bg-[#f8fafc] border border-[#cbd5e1] hover:border-[#0f172a] transition-colors"
                >
                  <div className="w-6 h-6 flex items-center justify-center text-[#0f172a] shrink-0">
                    {tech.icon && tech.icon.startsWith("devicon-") ? (
                      <i className={`${tech.icon} text-sm`} />
                    ) : tech.icon ? (
                      <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <Code className="w-3.5 h-3.5 text-[#2563eb]" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#0f172a] truncate">
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

import React from "react";
import { Terminal, Code } from "lucide-react";

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
        <span className="slant inline-block h-6 w-2.5 bg-[#ff4500]"></span>
        <h2 className="text-2xl font-black text-[#161616] font-display">
          ทักษะ & เครื่องมือ
        </h2>
        <span className="h-px flex-1 bg-[#e2e2d8] ml-2"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((stack) => (
          <div
            key={stack.id || stack.category}
            className="card-paper p-5 bg-white border-1.5 border-[#161616]"
          >
            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b-1.5 border-[#161616]">
              <Terminal className="w-4 h-4 text-[#ff4500]" />
              <h3 className="text-sm font-extrabold text-[#161616]">{stack.category}</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {stack.technologies?.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-[#fafaf7] border border-[#e2e2d8] hover:border-[#161616] transition-colors"
                >
                  <div className="w-6 h-6 flex items-center justify-center text-[#161616] shrink-0">
                    {tech.icon && tech.icon.startsWith("devicon-") ? (
                      <i className={`${tech.icon} text-sm`} />
                    ) : tech.icon ? (
                      <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <Code className="w-3.5 h-3.5 text-[#ff4500]" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#161616] truncate">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

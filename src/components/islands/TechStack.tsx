import React from "react";
import { Terminal, Code, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { DecryptedText } from "../reactbits/DecryptedText";
import { DriftWall, type DriftWallItem } from "../reactbits/DriftWall";

export interface Technology { name: string; icon: string; }
export interface TechStackCategory {
  id: number;
  category: string;
  order: number;
  technologies: Technology[];
  updatedAt?: string;
}

export function TechStack({ data }: { data: TechStackCategory[] }) {
  if (!data || data.length === 0) return null;

  // Flatten all technologies into a unified DriftWall dataset
  const allTechItems: DriftWallItem[] = data.flatMap((stack) =>
    (stack.technologies || []).map((tech) => ({
      name: tech.name,
      icon: tech.icon,
      category: stack.category,
    }))
  );

  return (
    <section id="skills" className="py-10">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <span className="kuro-section-label">
            <DecryptedText text="✦ [TOOLKIT // 02]" animateOn="view" speed={45} />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
            ทักษะ &amp; เครื่องมือ
          </h2>
        </div>
        {/* Kuromi icon watermark in header */}
        <motion.img
          src="/kuromi/sanrio-kuromi-cute-512x512.png"
          alt="Kuromi"
          className="w-14 h-14 object-contain opacity-60"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ReactBits Drift Wall */}
      <div className="relative rounded-2xl py-2">
        <DriftWall items={allTechItems} rows={3} speed={50} />
      </div>
    </section>
  );
}

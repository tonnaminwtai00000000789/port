import React from "react";
import { MapPin, Cake, Activity } from "lucide-react";
import { motion } from "framer-motion";

export interface Fact {
  title: string;
  subtitle: string;
  image?: string;
  type: "image" | "icon";
}

export interface AboutMeData {
  id: number;
  nickname: string;
  status: string;
  statusLink: string | null;
  fullName: string;
  birthday: string;
  location: string;
  facts: Fact[];
}

export function Aboutme({ data }: { data: AboutMeData }) {
  if (!data) return null;

  return (
    <section id="about" className="py-10">
      {/* Section Title */}
      <div className="mb-6">
        <span className="font-mono text-xs text-[#1d4ed8] font-bold block mb-1">
          [STORY // 03]
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display tracking-tight">
          เกี่ยวกับผม
        </h2>
      </div>

      {/* Grid Row 1: Pseudonym Card & Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Pseudonym Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 paper-card p-6 bg-white flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-[#1d4ed8] uppercase tracking-wider">
              มารู้จักผมกัน🤗
            </span>
            <h1 className="font-display text-4xl font-bold text-[#0f172a] mt-1 mb-2">
              {data.nickname}
            </h1>
            <p className="text-[#475569] text-sm leading-relaxed font-sans">
              หวัดดีคับทุกคน ผมต้นน้ำ ชอบเล่นเกม,ดูหนัง,อ่านมังฮวา,นอน,ดูซีรี่ย์,เงิน🤑
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#f1f5f9] mt-4">
            <span className="tag-badge">Fullstack Development</span>
            <span className="tag-badge">Anime & Manhwa</span>
            <span className="tag-badge">Gaming</span>
          </div>
        </motion.div>

        {/* Identity Details */}
        <div className="md:col-span-5 grid grid-cols-1 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="paper-card-subtle p-3.5 bg-white flex items-center gap-3 cursor-default"
          >
            <div className="w-9 h-9 rounded bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[#1d4ed8] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#64748b] uppercase">ที่อยู่ปัจจุบัน</p>
              <p className="text-xs font-bold text-[#0f172a] font-sans">{data.location}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="paper-card-subtle p-3.5 bg-white flex items-center gap-3 cursor-default"
          >
            <div className="w-9 h-9 rounded bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[#1d4ed8] shrink-0">
              <Cake className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#64748b] uppercase">วันเกิด</p>
              <p className="text-xs font-bold text-[#0f172a] font-sans">{data.birthday}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="paper-card-subtle p-3.5 bg-white flex items-center gap-3 cursor-default"
          >
            <div className="w-9 h-9 rounded bg-[#dcfce7] border border-[#86efac] flex items-center justify-center text-[#166534] shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#64748b] uppercase">สถานะ</p>
              <p className="text-xs font-bold text-[#0f172a] flex items-center gap-2 font-sans">
                {data.status}
                <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse inline-block" />
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interests Facts Gallery */}
      {data.facts && data.facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.facts.map((fact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
              className="paper-card overflow-hidden bg-white group cursor-default"
            >
              <div className="h-32 overflow-hidden relative bg-[#f8fafc] border-b border-[#e2e8f0]">
                {fact.image ? (
                  <img
                    src={fact.image}
                    alt={fact.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#1d4ed8] font-bold text-sm">
                    {fact.title}
                  </div>
                )}
                <span className="absolute top-2 right-2 text-[10px] font-mono font-semibold text-white bg-[#1e293b] px-2 py-0.5 rounded border border-white">
                  {fact.subtitle}
                </span>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono text-[#64748b] uppercase">{fact.subtitle}</p>
                <p className="text-sm font-bold text-[#0f172a] font-display group-hover:text-[#1d4ed8] transition-colors">{fact.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

import React from "react";
import { MapPin, Cake, Activity, Sparkles } from "lucide-react";
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

  const generateContributionDays = () => {
    const days = [];
    const today = new Date("2026-08-04");
    for (let i = 119; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = (i * 17 + 5) % 6;
      days.push({ date: date.toISOString().split("T")[0], count });
    }
    return days;
  };

  const contributionDays = generateContributionDays();

  const getHeatmapColor = (count: number) => {
    if (count === 0) return "bg-[#e2e8f0]";
    if (count <= 2) return "bg-[#bfdbfe]";
    if (count <= 4) return "bg-[#60a5fa]";
    return "bg-[#2563eb]";
  };

  return (
    <section id="about" className="py-10">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="slant inline-block h-6 w-2.5 bg-[#60a5fa]"></span>
        <h2 className="text-2xl font-black text-[#0f172a] font-display">
          เกี่ยวกับผม
        </h2>
        <span className="h-px flex-1 bg-[#e2e8f0] ml-2"></span>
      </div>

      {/* Grid Row 1: Pseudonym Card & Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Pseudonym Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 card-paper p-6 bg-white border-1.5 border-[#0f172a] flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-[#2563eb] uppercase">มารู้จักผมกัน🤗</span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-[#0f172a] mt-1 mb-2">
              {data.nickname}
            </h1>
            <p className="text-[#475569] text-sm leading-relaxed">
              หวัดดีคับทุกคน ผมต้นน้ำ ชอบเล่นเกม,ดูหนัง,อ่านมังฮวา,นอน,ดูซีรี่ย์,เงิน🤑
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <span className="tag-badge">Fullstack Development</span>
            <span className="tag-badge">Anime & Manhwa</span>
            <span className="tag-badge">Gaming</span>
          </div>
        </motion.div>

        {/* Identity Details */}
        <div className="md:col-span-5 grid grid-cols-1 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-paper p-4 bg-white border-1.5 border-[#0f172a] flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-md bg-[#eff6ff] border border-[#0f172a] flex items-center justify-center text-[#2563eb] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#475569]">ที่อยู่ปัจจุบัน</p>
              <p className="text-sm font-bold text-[#0f172a]">{data.location}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-paper p-4 bg-white border-1.5 border-[#0f172a] flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-md bg-[#eff6ff] border border-[#0f172a] flex items-center justify-center text-[#2563eb] shrink-0">
              <Cake className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#475569]">วันเกิด</p>
              <p className="text-sm font-bold text-[#0f172a]">{data.birthday}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-paper p-4 bg-white border-1.5 border-[#0f172a] flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-md bg-[#eff6ff] border border-[#0f172a] flex items-center justify-center text-[#2563eb] shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#475569]">สถานะ</p>
              <p className="text-sm font-bold text-[#0f172a] flex items-center gap-2">
                {data.status}
                <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse inline-block" />
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
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="card-paper overflow-hidden bg-white border-1.5 border-[#0f172a]"
            >
              <div className="h-32 overflow-hidden relative bg-[#f1f5f9]">
                {fact.image ? (
                  <img src={fact.image} alt={fact.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2563eb] font-bold text-lg">
                    {fact.title}
                  </div>
                )}
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold text-white bg-[#0f172a] px-2 py-0.5 border border-white">
                  {fact.subtitle}
                </span>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono text-[#475569] uppercase">{fact.subtitle}</p>
                <p className="text-base font-bold text-[#0f172a]">{fact.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

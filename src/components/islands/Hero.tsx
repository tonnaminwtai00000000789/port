import React, { useState, useEffect } from "react";
import { MapPin, ArrowRight, Code, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export interface HeroData {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  nickname: string;
  birthDate: string;
  startDate: string;
  location: string;
  profileImage: string;
  emoji: string;
  positions: Array<{
    logo: string;
    title: string;
    organization: string;
    organizationUrl: string;
    since: string;
  }>;
}

export function Hero({ data }: { data: HeroData }) {
  const [age, setAge] = useState(14);
  const [experience, setExperience] = useState(4);

  useEffect(() => {
    if (!data) return;
    const birthDate = new Date(data.birthDate || "2011-03-03");
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    setAge(calculatedAge);

    const startDate = new Date(data.startDate || "2021-01-01");
    const years = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    );
    setExperience(years);
  }, [data]);

  if (!data) return null;

  return (
    <section className="pt-24 pb-8 relative">
      {/* Main Hero Paper Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="paper-card p-6 sm:p-10 bg-white mb-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hero Copy & Memos */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag-badge bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]">
                <Code className="w-3.5 h-3.5 mr-1" /> Fullstack & Embedded Tinkerer
              </span>
              <span className="tag-badge bg-[#f8fafc] text-[#475569]">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[#1d4ed8]" /> {data.location}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0f172a] leading-tight tracking-tight">
              {data.displayName}
            </h1>

            {/* Yellow Sticky Memo (Authentic Humor & Bio) */}
            <motion.div
              initial={{ rotate: -1, scale: 0.98 }}
              animate={{ rotate: -1, scale: 1 }}
              whileHover={{ rotate: 0, scale: 1.01 }}
              className="sticky-memo-yellow p-4 text-xs sm:text-sm font-medium leading-relaxed max-w-xl relative"
            >
              <div className="absolute -top-2.5 right-6 w-12 h-4 bg-[#fef9c3]/80 border-x border-t border-[#fef08a] opacity-80 shadow-2xs transform rotate-3" />
              <p className="font-bold text-[#854d0e] mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> โน้ตจากต้นน้ำ 👋
              </p>
              <p className="text-[#713f12]">
                ผมเริ่มเขียนโค้ดตอน ป.5 จากสคริปต์ Roblox จนตอนนี้ทำเว็บ แอพ และเขียนโค้ดใน ESP32 / Arduino ได้บ้าง ซึ่งได้ไงก็ไม่รู้เหมือนกัน 555
              </p>
              <p className="text-[#854d0e] font-mono text-[11px] mt-2 italic pt-1 border-t border-[#fde047]/60">
                "อยู่ไม่ไหว... กลัวกลัวกลัว... จุ๊บๆ (ไม่รู้จะใส่ไรอะโทษๆ55)"
              </p>
            </motion.div>

            {/* Action Buttons & Status */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#works"
                className="stamp-btn-blue px-5 py-2.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5"
              >
                ดูสิ่งที่ผมเคยทำ <ArrowRight className="w-4 h-4" />
              </a>
              <span className="stamp-badge-mint px-3.5 py-2 text-xs font-mono inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse" />
                STATUS: ว่างจ้างได้
              </span>
            </div>

            {/* Spec Counter Notes */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-dashed border-[#cbd5e1]">
              <div className="p-2.5 rounded bg-[#f8fafc] border border-[#e2e8f0]">
                <p className="font-mono text-xl font-bold text-[#1d4ed8]">
                  {experience}+ ปี
                </p>
                <p className="text-[11px] font-semibold text-[#64748b] mt-0.5">ประสบการณ์</p>
              </div>
              <div className="p-2.5 rounded bg-[#f8fafc] border border-[#e2e8f0]">
                <p className="font-mono text-xl font-bold text-[#0f172a]">
                  {age} ปี
                </p>
                <p className="text-[11px] font-semibold text-[#64748b] mt-0.5">อายุ</p>
              </div>
              <div className="p-2.5 rounded bg-[#f8fafc] border border-[#e2e8f0]">
                <p className="font-mono text-xl font-bold text-[#0f172a]">
                  67%
                </p>
                <p className="text-[11px] font-semibold text-[#64748b] mt-0.5">ความตั้งใจ</p>
              </div>
            </div>
          </div>

          {/* Right Column: Polaroid Photo & Positions */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-xs"
            >
              {/* Fake Tape Corner */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-16 h-5 bg-[#ffffff]/90 border border-[#cbd5e1] shadow-2xs transform -rotate-2" />
              
              {/* Polaroid Frame */}
              <div className="p-3 pb-4 bg-white border border-[#1e293b] rounded shadow-md relative z-10">
                <img
                  src={data.profileImage}
                  alt={data.displayName}
                  className="w-full aspect-[4/5] object-cover rounded-xs border border-[#e2e8f0]"
                  loading="eager"
                />
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="font-display text-xs font-bold text-[#0f172a]">
                    {data.displayName} ({data.nickname})
                  </span>
                  <span className="font-mono text-xs text-[#1d4ed8] font-bold">
                    {data.emoji}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Current Positions List */}
            {data.positions && data.positions.length > 0 && (
              <div className="w-full space-y-2 pt-2">
                <p className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider">
                  กำลังทำในปัจจุบัน
                </p>
                {data.positions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 bg-white rounded border border-[#cbd5e1] hover:border-[#1e293b] transition-colors"
                  >
                    <img
                      src={pos.logo}
                      alt={pos.organization}
                      className="w-7 h-7 object-cover rounded border border-[#cbd5e1]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#0f172a] truncate">{pos.title}</p>
                      <a
                        href={pos.organizationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#475569] hover:text-[#1d4ed8] truncate block"
                      >
                        {pos.organization}
                      </a>
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-[#f8fafc] border border-[#e2e8f0] rounded">
                      {pos.since}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

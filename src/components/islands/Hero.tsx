import React, { useState, useEffect } from "react";
import { MapPin, Clock, ArrowRight, Sparkles, Code, Globe, User } from "lucide-react";
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
  webringUrl: string | null;
  positions: Array<{
    logo: string;
    title: string;
    organization: string;
    organizationUrl: string;
    since: string;
  }>;
}

export function Hero({ data }: { data: HeroData }) {
  const [currentTime, setCurrentTime] = useState("");
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

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [data]);

  if (!data) return null;

  return (
    <section className="pt-24 pb-8 relative">
      {/* Main Showcase Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="card-paper p-6 sm:p-10 bg-white mb-6 border-1.5 border-[#0f172a]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Statement */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="slant inline-flex px-3 py-1 bg-[#60a5fa] text-[#0f172a] text-xs font-bold border border-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
                <span className="unslant inline-flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#0f172a]" /> Fullstack Builder
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-5xl sm:text-7xl font-extrabold text-[#0f172a] leading-none tracking-tight"
            >
              <span className="text-[#60a5fa]">T</span>onnam
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-display text-2xl sm:text-3xl font-extrabold leading-snug text-[#0f172a]"
            >
              ผมชอบสร้างสิ่งใหม่ๆ <br />
              <span className="text-[#2563eb]">และชอบเห็นคนได้ใช้มัน</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[#475569] text-sm sm:text-base leading-relaxed max-w-lg"
            >
              เริ่มจากการเขียนบอท Discord เล่นกับเพื่อนๆ วันนี้อยู่กับการเขียนโปรแกรมมาแล้ว <span className="num-badge">{experience}</span> ปี และตั้งใจสร้างสรรค์เว็บแอปพลิเคชันที่ตอบโจทย์ผู้ใช้จริง
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#works"
                className="btn-pop px-6 py-2.5 text-sm font-bold inline-flex items-center gap-1.5"
              >
                ดูสิ่งที่สร้างไว้ <ArrowRight className="w-4 h-4" />
              </motion.a>
              <span className="slant inline-flex border border-[#0f172a] bg-[#f1f5f9] px-3.5 py-2 text-xs font-bold text-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
                <span className="unslant inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2563eb]" /> {data.location}
                </span>
              </span>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-dashed border-[#cbd5e1]"
            >
              <div>
                <p className="font-display text-3xl font-extrabold text-[#2563eb]">
                  {experience}+
                </p>
                <p className="text-xs font-semibold text-[#475569] mt-0.5">ปีที่เขียนโค้ด</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-[#0f172a]">
                  {age}
                </p>
                <p className="text-xs font-semibold text-[#475569] mt-0.5">อายุ (ปี)</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-[#0f172a]">
                  100%
                </p>
                <p className="text-xs font-semibold text-[#475569] mt-0.5">ความตั้งใจ</p>
              </div>
            </motion.div>
          </div>

          {/* Right Profile Column Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-xs"
            >
              <div className="slant absolute -bottom-2 -left-2 z-0 h-full w-full bg-[#60a5fa] border-1.5 border-[#0f172a]" />
              <div className="relative z-10 overflow-hidden border-1.5 border-[#0f172a] bg-white">
                <img
                  src={data.profileImage}
                  alt={data.displayName}
                  className="w-full aspect-[4/5] object-cover"
                  loading="eager"
                />
                <div className="p-3 bg-[#0f172a] text-white flex items-center justify-between text-xs font-mono">
                  <span>TonnamInwtai00789</span>
                  <span className="text-[#60a5fa] font-bold">{data.emoji}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bio & Bangkok Time Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bio & Currently at */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-7 card-paper p-6 bg-white border-1.5 border-[#0f172a]"
        >
          <h2 className="text-xl font-bold text-[#0f172a] mb-2 flex items-center gap-2">
            สวัสดีครับ ผมชื่อ <span className="text-[#2563eb] font-extrabold">{data.nickname}</span> 👋
          </h2>

          <p className="text-[#475569] text-sm leading-relaxed mb-4 font-normal">
            ผมอายุ <span className="num-badge">{age}</span> ปี ทำงานและสร้างสรรค์โปรเจกต์ซอฟต์แวร์จากกรุงเทพฯ ชอบทดลองเทคโนโลยีใหม่ๆ และพัฒนาเครื่องมือที่มีประโยชน์
          </p>

          <div className="space-y-2 pt-3 border-t-1.5 border-[#0f172a]">
            <p className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider">กำลังทำอยู่ในปัจจุบัน</p>
            {data.positions?.map((pos, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 3 }}
                className="flex items-center gap-3 p-2 border border-[#cbd5e1] hover:border-[#0f172a] transition-colors"
              >
                <img src={pos.logo} alt={pos.organization} className="w-8 h-8 object-cover border border-[#0f172a]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0f172a] truncate">{pos.title}</p>
                  <a href={pos.organizationUrl} target="_blank" rel="noreferrer" className="text-xs text-[#475569] hover:text-[#2563eb] truncate block">
                    {pos.organization}
                  </a>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#f8fafc] border border-[#cbd5e1]">
                  {pos.since}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Bangkok Clock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-5 flex flex-col gap-4"
        >
          <div className="card-paper p-6 bg-white border-1.5 border-[#0f172a] flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#2563eb] uppercase">Bangkok, TH</span>
              <Clock className="w-4 h-4 text-[#0f172a]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#475569] mb-1">เวลากรุงเทพฯ ปัจจุบัน</p>
              <p className="font-mono text-3xl font-bold text-[#0f172a] tracking-tight">
                {currentTime || "--:--:--"}
              </p>
            </div>
          </div>

          <div className="card-paper p-4 bg-[#0f172a] text-white flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-[#60a5fa]">STATUS</p>
              <p className="text-sm font-bold text-white">พร้อมรับงาน & โปรเจกต์ใหม่</p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-3.5 py-1.5 bg-[#60a5fa] text-[#0f172a] text-xs font-bold border border-white hover:bg-white transition-colors"
            >
              ติดต่อ
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

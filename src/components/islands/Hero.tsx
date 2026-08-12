import React, { useState, useEffect } from "react";
import { MapPin, ArrowRight, Code, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { DecryptedText } from "../reactbits/DecryptedText";
import { TiltedCard } from "../reactbits/TiltedCard";
import { Magnet } from "../reactbits/Magnet";
import { CountUp } from "../reactbits/CountUp";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export function Hero({ data }: { data: HeroData }) {
  const [age, setAge] = useState(14);
  const [experience, setExperience] = useState(4);

  useEffect(() => {
    if (!data) return;
    const birth = new Date(data.birthDate || "2011-03-03");
    const today = new Date();
    let a = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) a--;
    setAge(a);

    const start = new Date(data.startDate || "2021-01-01");
    setExperience(Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25)));
  }, [data]);

  if (!data) return null;

  return (
    <section className="pt-28 pb-10 relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="gap-1.5">
              <Code className="w-3 h-3" />
              <DecryptedText text="Fullstack & Embedded Tinkerer" animateOn="view" speed={40} />
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <MapPin className="w-3 h-3" style={{ color: "var(--kuro-pink)" }} />
              {data.location}
            </Badge>
          </motion.div>

          {/* Name — Shiny Gradient */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-7xl font-black leading-none tracking-tight"
          >
            <ShinyText text={data.displayName} speed={3.5} className="font-black" />
          </motion.h1>

          {/* Kuromi Note */}
          <motion.div
            variants={itemVariants}
            initial={{ rotate: -1, scale: 0.98 }}
            whileHover={{ rotate: 0, scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="kuro-note p-5 max-w-xl relative cursor-default"
          >
            {/* Tape top decoration */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
              style={{ background: "rgba(255,105,200,0.25)", border: "1px solid rgba(255,105,200,0.3)" }}
            />
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/kuromi/kuromi-kuromi-cute.gif"
                alt="Kuromi"
                className="w-8 h-8 object-contain"
              />
              <p className="font-bold text-sm" style={{ color: "var(--kuro-pink)", fontFamily: "var(--font-display)" }}>
                โน้ตจากต้นน้ำ 👋
              </p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--kuro-skull-dim)" }}>
              ผมเริ่มเขียนโค้ดตอน ป.5 จากสคริปต์ Roblox จนตอนนี้ทำเว็บ แอพ และเขียนโค้ดใน ESP32 / Arduino ได้บ้าง ซึ่งได้ไงก็ไม่รู้เหมือนกัน 555
            </p>
            <p
              className="font-mono text-[11px] mt-2.5 pt-2 italic"
              style={{ color: "var(--kuro-muted-bright)", borderTop: "1px solid rgba(255,105,200,0.15)" }}
            >
              "เธอน่ะเข้าใจยากที่สุดเลย เธอมันก็เหมือนคดีที่ยากสุดๆ มีแต่ความรู้สึกที่เยอะแยะไปหมด ถึงฉันจะเป็นโฮล์มก็เถอะฉันก็คงจะไขคดีนี้ไม่ได้หรอก คงไม่มีใครไขหัวใจของคนรักได้อย่างถูกต้องหรอกน่า! (ไม่รู้จะใส่ไรอะโทษๆ55)"
            </p>
          </motion.div>

          {/* CTA Buttons with Magnet */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
            <Magnet strength={0.3} radius={100}>
              <Button asChild>
                <a href="#works" className="group gap-1.5">
                  ดูสิ่งที่ผมเคยทำ
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </Magnet>
            <Magnet strength={0.2} radius={80}>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-bold kuro-badge-pink">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--kuro-green)" }} />
                <DecryptedText text="STATUS: ว่างจ้างได้" animateOn="hover" speed={30} />
              </div>
            </Magnet>
          </motion.div>

          {/* Stat counters (Unboxed) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-6"
            style={{ borderTop: "1px solid var(--kuro-border)" }}
          >
            {[
              { val: experience, suffix: "+", label: "ปีประสบการณ์", color: "var(--kuro-primary-glow)" },
              { val: age, suffix: "", label: "ปี (อายุ)", color: "var(--kuro-skull)" },
              { val: 67, suffix: "%", label: "ความตั้งใจ", color: "var(--kuro-pink)" },
            ].map(({ val, suffix, label, color }) => (
              <div key={label} className="cursor-default">
                <p className="font-mono text-3xl sm:text-4xl font-black tracking-tight" style={{ color }}>
                  <CountUp to={val} suffix={suffix} duration={1.8} />
                </p>
                <p className="text-xs font-medium mt-1" style={{ color: "var(--kuro-muted-bright)" }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Polaroid with 3D Spring Tilt */}
        <div className="lg:col-span-5 flex flex-col items-center gap-6">
          {/* 3D Tilted Card */}
          <TiltedCard maxAngle={12} scaleOnHover={1.025} containerClassName="w-full max-w-xs">
            <div className="relative cursor-pointer">
              {/* Floating Kuromi sticker */}
              <motion.img
                src="/kuromi/sanrio-kuromi-cute-512x512.png"
                alt="Kuromi sticker"
                className="absolute -top-5 -right-4 w-16 h-16 object-contain z-20 drop-shadow-lg"
                animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Polaroid frame */}
              <div
                className="p-3.5 pb-4 rounded-xl relative z-10"
                style={{
                  background: "rgba(25, 2, 35, 0.85)",
                  border: "1px solid var(--kuro-border-bright)",
                  boxShadow: "0 0 40px rgba(155,48,217,0.2), 0 12px 36px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={data.profileImage}
                  alt={data.displayName}
                  className="w-full aspect-[4/5] object-cover rounded-xl"
                  style={{ border: "1px solid var(--kuro-border)" }}
                  loading="eager"
                />
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="font-display text-xs font-bold" style={{ color: "var(--kuro-skull)" }}>
                    {data.displayName} ({data.nickname})
                  </span>
                  <span className="font-mono text-xs font-bold kuro-gradient-text">{data.emoji}</span>
                </div>
              </div>
            </div>
          </TiltedCard>

          {/* Positions (Unboxed list) */}
          {data.positions?.length > 0 && (
            <div className="w-full space-y-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "var(--kuro-muted)" }}>
                <DecryptedText text="✦ กำลังทำในปัจจุบัน" animateOn="view" speed={50} />
              </div>
              {data.positions.map((pos, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:bg-[rgba(155,48,217,0.08)]"
                  style={{ borderBottom: "1px solid var(--kuro-border)" }}
                >
                  <img
                    src={pos.logo}
                    alt={pos.organization}
                    className="w-8 h-8 object-cover rounded-lg flex-shrink-0"
                    style={{ border: "1px solid var(--kuro-border)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
                      {pos.title}
                    </p>
                    <a
                      href={pos.organizationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] truncate block hover:underline transition-colors"
                      style={{ color: "var(--kuro-muted-bright)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-muted-bright)")}
                    >
                      {pos.organization}
                    </a>
                  </div>
                  <Badge variant="ghost" size="sm">{pos.since}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

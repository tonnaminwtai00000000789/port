"use client";

import React from "react";
import { MapPin, Cake, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { DecryptedText } from "../reactbits/DecryptedText";
import GradientWaves from "../reactbits/GradientWaves";
import { TiltedCard } from "../reactbits/TiltedCard";
import { SpotlightCard } from "../reactbits/SpotlightCard";

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

const infoCards: Array<{
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  key: string;
  label: string;
  color: string;
  pulse?: boolean;
}> = [
  { icon: MapPin as React.FC<React.SVGProps<SVGSVGElement>>, key: "location", label: "ที่อยู่ปัจจุบัน", color: "var(--kuro-primary-glow)" },
  { icon: Cake as React.FC<React.SVGProps<SVGSVGElement>>, key: "birthday", label: "วันเกิด", color: "var(--kuro-pink)" },
  { icon: Heart as React.FC<React.SVGProps<SVGSVGElement>>, key: "status", label: "สถานะ", color: "var(--kuro-red)", pulse: false },
];

export function Aboutme({ data }: { data: AboutMeData }) {
  if (!data) return null;

  const infoValues: Record<string, string> = {
    location: data.location,
    birthday: data.birthday,
    status: data.status,
  };

  return (
    <section id="about" className="py-10">
      <GradientWaves
        horizonColor="#130018"
        waveColor="#9b30d9"
        crestColor="#ff69c8"
        speed={0.3}
        amplitude={2.0}
        waveScale={0.5}
        className="rounded-2xl p-6 sm:p-8 border border-[var(--kuro-border)]"
      >
        <div className="mb-6">
          <span className="kuro-section-label">
            <DecryptedText text="✦ [STORY // 03]" animateOn="view" speed={45} />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
            เกี่ยวกับผม
          </h2>
        </div>

        {/* Grid Row 1 (Unboxed) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-start">
          {/* Main bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 space-y-4"
          >
            <div className="relative">
              <motion.img
                src="/kuromi/kuromi-laughing-512x512.png"
                alt="Kuromi laughing"
                className="absolute -top-2 -right-2 w-20 h-20 object-contain opacity-70 pointer-events-none"
                animate={{ rotate: [0, 10, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--kuro-pink)" }}>
                มารู้จักผมกัน 🤗
              </span>
              <h3
                className="text-4xl font-black mt-1 mb-2 tracking-tight"
                style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
              >
                {data.nickname}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--kuro-skull-dim)" }}>
                หวัดดีคับทุกคน ผมต้นน้ำ ชอบเล่นเกม, ดูหนัง, อ่านมังฮวา, นอน, ดูซีรี่ย์, เงิน 🤑
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid var(--kuro-border)" }}>
              <Badge variant="default">Fullstack Development</Badge>
              <Badge variant="pink">Anime &amp; Manhwa</Badge>
              <Badge variant="green">Gaming</Badge>
            </div>
          </motion.div>

          {/* Info items (Unboxed list) */}
          <div className="md:col-span-5 space-y-3">
            {infoCards.map(({ icon: Icon, key, label, color, pulse }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.08 * idx }}
                className="p-3.5 flex items-center gap-3 cursor-default rounded-xl transition-colors hover:bg-[rgba(155,48,217,0.08)]"
                style={{ borderBottom: "1px solid var(--kuro-border)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}40` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase" style={{ color: "var(--kuro-muted)" }}>
                    {label}
                  </p>
                  <p className="text-xs font-bold flex items-center gap-2" style={{ color: "var(--kuro-skull)" }}>
                    {infoValues[key]}
                    {pulse && (
                      <span
                        className="w-2 h-2 rounded-full inline-block animate-pulse"
                        style={{ background: "var(--kuro-green)" }}
                      />
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Facts gallery (3D Tilted + Spotlight Cards) */}
        {data.facts?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {data.facts.map((fact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <TiltedCard maxAngle={10} scaleOnHover={1.03} containerClassName="h-full" className="h-full">
                  <SpotlightCard className="p-3 rounded-xl border border-[rgba(192,96,255,0.15)] shadow-md group flex flex-col justify-between h-full cursor-pointer overflow-hidden" spotlightColor="rgba(255,105,200,0.15)">
                    <div className="h-36 overflow-hidden relative rounded-lg mb-2">
                      {fact.image ? (
                        <img
                          src={fact.image}
                          alt={fact.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center font-bold text-sm"
                          style={{ color: "var(--kuro-primary-glow)" }}
                        >
                          {fact.title}
                        </div>
                      )}
                      <Badge variant="pink" className="absolute top-2.5 right-2.5 text-[9px] shadow-sm">
                        {fact.subtitle}
                      </Badge>
                    </div>
                    <div className="px-1 py-1">
                      <p className="text-[10px] font-mono uppercase font-bold" style={{ color: "var(--kuro-pink)" }}>
                        {fact.subtitle}
                      </p>
                      <p
                        className="text-sm font-black transition-colors"
                        style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--kuro-primary-glow)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--kuro-skull)")}
                      >
                        {fact.title}
                      </p>
                    </div>
                  </SpotlightCard>
                </TiltedCard>
              </motion.div>
            ))}
          </div>
        )}
      </GradientWaves>
    </section>
  );
}

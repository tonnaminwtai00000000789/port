import React, { useState, useEffect } from "react";
import { MapPin, Clock, ArrowRight, Sparkles, Code, Terminal, Layers } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

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
        now.toLocaleTimeString("en-US", {
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
    <TooltipProvider>
      <section className="pt-28 pb-8 relative">
        {/* Main Hero Card Banner */}
        <div className="card-light rounded-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden mb-6 border border-slate-200 bg-white">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Digital Craftsman
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-900 leading-[0.98] tracking-tight">
                {data.displayName}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
                Digital craftsman & full-stack developer who loves creating magical, high-performance web applications that people actually love to use.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="slant px-3.5 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                  <span className="unslant">aka. <strong className="text-indigo-600">{data.nickname}</strong></span>
                </span>
                <span className="slant px-3.5 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5">
                  <span className="unslant inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {data.location}
                  </span>
                </span>
                <span className="slant px-3.5 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold inline-flex items-center gap-1.5">
                  <span className="unslant inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Available for Work
                  </span>
                </span>
              </div>

              {/* Stats Counter Row */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-100">
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-indigo-600 tracking-tight">
                    {experience}+
                  </p>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Years Coding</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {age}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Years Old</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    100%
                  </p>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Passion Built</p>
                </div>
              </div>
            </div>

            {/* Right Profile Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-xs">
                <div className="aspect-[4/5] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm relative">
                  <img
                    src={data.profileImage}
                    alt={data.displayName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 shadow-xs flex items-center gap-2">
                      <span className="text-xl">{data.emoji}</span>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">Mood</p>
                        <p className="text-xs font-bold text-slate-800 leading-tight">Sleepy & Coding</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Current Positions Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bio Box */}
          <div className="md:col-span-7 card-light p-6 sm:p-8 rounded-xl bg-white flex flex-col justify-between border border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                Hi, I'm {data.nickname} <span className="inline-block animate-bounce">👋</span>
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed mb-5 font-normal">
                I'm a <span className="num-badge">{age}</span> years old developer based in Thailand.
                I started my coding journey <span className="num-badge">{experience}</span> years ago, creating Discord bots and experimental web applications.
              </p>
            </div>

            {/* Currently Positions */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">CURRENTLY AT</p>
              {data.positions?.map((pos, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all group"
                >
                  <img
                    src={pos.logo}
                    alt={pos.organization}
                    className="w-9 h-9 rounded-md object-cover border border-slate-200 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      {pos.title}
                      <ArrowRight className="w-3 h-3 text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </p>
                    <a
                      href={pos.organizationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-medium truncate block"
                    >
                      {pos.organization}
                    </a>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded-md bg-white border border-slate-200">
                    {pos.since}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bangkok Live Clock & Status */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="card-light p-6 rounded-xl bg-white flex-1 flex flex-col justify-between border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  Asia / Bangkok
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Local Bangkok Time</p>
                <p className="font-display text-3xl font-black text-slate-900 tracking-tight font-mono">
                  {currentTime || "--:--:--"}
                </p>
              </div>
            </div>

            <div className="card-light p-5 rounded-xl bg-indigo-600 text-white flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">Current Status</p>
                <p className="font-display text-base font-bold text-white">Open to Collaborations</p>
              </div>
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-white text-indigo-600 flex items-center justify-center font-bold hover:scale-105 transition-transform shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

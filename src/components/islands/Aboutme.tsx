import React from "react";
import { User, MapPin, Cake, Activity, Sparkles, Heart } from "lucide-react";

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

  // Mock GitHub contribution activity data for heatmap widget
  const generateContributionDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 120; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 6);
      days.push({ date: date.toISOString().split("T")[0], count });
    }
    return days;
  };

  const contributionDays = generateContributionDays();

  const getHeatmapColor = (count: number) => {
    if (count === 0) return "bg-slate-100 border-slate-200";
    if (count <= 2) return "bg-indigo-100 border-indigo-200";
    if (count <= 4) return "bg-indigo-300 border-indigo-400";
    return "bg-indigo-600 border-indigo-700";
  };

  return (
    <section id="about" className="py-16 relative">
      {/* Section Header */}
      <div className="flex items-center gap-3.5 mb-10">
        <span className="slant inline-block h-7 w-3 rounded-sm bg-indigo-600"></span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Beyond the Code
        </h2>
        <span className="h-px flex-1 bg-slate-200 ml-2"></span>
      </div>

      {/* Grid Row 1: Pseudonym Card & Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Pseudonym Card */}
        <div className="md:col-span-7 card-light p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-indigo-50/50 via-white to-white flex flex-col justify-between border border-slate-200/80">
          <div>
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">PSEUDONYM</span>
            <h1 className="font-display text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mt-2 mb-4">
              {data.nickname}
            </h1>
            <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-md">
              Known online as <strong className="text-slate-900">TonnamInwtai00789</strong>. Building digital artifacts and software tools from Thailand.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-6">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              Fullstack Builder
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              Anime & Manhwa Fan
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Gamer
            </span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          <div className="card-light p-6 rounded-[28px] bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters</p>
              <p className="text-lg font-extrabold text-slate-900 tracking-tight">{data.location}</p>
            </div>
          </div>

          <div className="card-light p-6 rounded-[28px] bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Origin Date</p>
              <p className="text-lg font-extrabold text-slate-900 tracking-tight">{data.birthday}</p>
            </div>
          </div>

          <div className="card-light p-6 rounded-[28px] bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Pulse</p>
              <p className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                {data.status}
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Heatmap Widget (" Daily Crafting / ลงมือสร้างสรรค์ทุกวัน") */}
      <div className="card-light p-6 md:p-8 rounded-[32px] bg-white mb-8 border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> Daily Crafting & Building
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Continuous commit & creation activity over recent months.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Less</span>
            <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200"></span>
            <span className="w-3 h-3 rounded-xs bg-indigo-100 border border-indigo-200"></span>
            <span className="w-3 h-3 rounded-xs bg-indigo-300 border border-indigo-400"></span>
            <span className="w-3 h-3 rounded-xs bg-indigo-600 border border-indigo-700"></span>
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[650px]">
            {contributionDays.map((day, idx) => (
              <div
                key={idx}
                title={`${day.date}: ${day.count} activities`}
                className={`w-3.5 h-3.5 rounded-xs border transition-colors cursor-pointer ${getHeatmapColor(day.count)}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interests Facts Gallery */}
      {data.facts && data.facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {data.facts.map((fact, idx) => (
            <div
              key={idx}
              className="card-light rounded-[28px] overflow-hidden bg-white group border border-slate-200/80"
            >
              <div className="h-44 overflow-hidden relative bg-slate-100">
                {fact.image ? (
                  <img
                    src={fact.image}
                    alt={fact.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indigo-600 bg-indigo-50">
                    <Heart className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {fact.subtitle}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{fact.subtitle}</p>
                <p className="text-xl font-black text-slate-900 tracking-tight">{fact.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

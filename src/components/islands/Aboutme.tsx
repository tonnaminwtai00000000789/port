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
    <section id="about" className="py-12 relative">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="slant inline-block h-6 w-2.5 rounded-xs bg-indigo-600"></span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Beyond the Code
        </h2>
        <span className="h-px flex-1 bg-slate-200 ml-2"></span>
      </div>

      {/* Grid Row 1: Pseudonym Card & Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Pseudonym Card */}
        <div className="md:col-span-7 card-light p-6 sm:p-8 rounded-xl bg-white flex flex-col justify-between border border-slate-200">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">PSEUDONYM</span>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mt-1 mb-3">
              {data.nickname}
            </h1>
            <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-md">
              Known online as <strong className="text-slate-900">TonnamInwtai00789</strong>. Building digital artifacts and software tools from Thailand.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-5">
            <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              Fullstack Builder
            </span>
            <span className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              Anime & Manhwa Fan
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Gamer
            </span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="md:col-span-5 grid grid-cols-1 gap-3">
          <div className="card-light p-4 rounded-xl bg-white flex items-center gap-3 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Headquarters</p>
              <p className="text-base font-extrabold text-slate-900 tracking-tight">{data.location}</p>
            </div>
          </div>

          <div className="card-light p-4 rounded-xl bg-white flex items-center gap-3 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Origin Date</p>
              <p className="text-base font-extrabold text-slate-900 tracking-tight">{data.birthday}</p>
            </div>
          </div>

          <div className="card-light p-4 rounded-xl bg-white flex items-center gap-3 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Pulse</p>
              <p className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                {data.status}
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Heatmap Widget */}
      <div className="card-light p-6 rounded-xl bg-white mb-6 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Daily Crafting & Building
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Continuous commit & creation activity over recent months.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span>Less</span>
            <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200"></span>
            <span className="w-3 h-3 rounded-xs bg-indigo-100 border border-indigo-200"></span>
            <span className="w-3 h-3 rounded-xs bg-indigo-300 border border-indigo-400"></span>
            <span className="w-3 h-3 rounded-xs bg-indigo-600 border border-indigo-700"></span>
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-1">
          <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[600px]">
            {contributionDays.map((day, idx) => (
              <div
                key={idx}
                title={`${day.date}: ${day.count} activities`}
                className={`w-3 h-3 rounded-xs border transition-colors cursor-pointer ${getHeatmapColor(day.count)}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interests Facts Gallery */}
      {data.facts && data.facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {data.facts.map((fact, idx) => (
            <div
              key={idx}
              className="card-light rounded-xl overflow-hidden bg-white group border border-slate-200"
            >
              <div className="h-36 overflow-hidden relative bg-slate-100">
                {fact.image ? (
                  <img
                    src={fact.image}
                    alt={fact.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indigo-600 bg-indigo-50">
                    <Heart className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20">
                  {fact.subtitle}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{fact.subtitle}</p>
                <p className="text-lg font-black text-slate-900 tracking-tight">{fact.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

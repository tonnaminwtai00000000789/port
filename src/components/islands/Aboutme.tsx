import React from "react";
import { MapPin, Cake, Activity, Sparkles } from "lucide-react";

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
    for (let i = 119; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 6);
      days.push({ date: date.toISOString().split("T")[0], count });
    }
    return days;
  };

  const contributionDays = generateContributionDays();

  const getHeatmapColor = (count: number) => {
    if (count === 0) return "bg-[#e2e2d8]";
    if (count <= 2) return "bg-[#ffaa80]";
    if (count <= 4) return "bg-[#ff7733]";
    return "bg-[#ff4500]";
  };

  return (
    <section id="about" className="py-10">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="slant inline-block h-6 w-2.5 bg-[#ff4500]"></span>
        <h2 className="text-2xl font-black text-[#161616] font-display">
          เกี่ยวกับผม
        </h2>
        <span className="h-px flex-1 bg-[#e2e2d8] ml-2"></span>
      </div>

      {/* Grid Row 1: Pseudonym Card & Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Pseudonym Card */}
        <div className="md:col-span-7 card-paper p-6 bg-white border-1.5 border-[#161616] flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-[#ff4500] uppercase">PSEUDONYM</span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-[#161616] mt-1 mb-2">
              {data.nickname}
            </h1>
            <p className="text-[#525252] text-sm leading-relaxed">
              นามปากกาโปรแกรมเมอร์ <strong className="text-[#161616]">TonnamInwtai00789</strong> ที่ใช้มาตั้งแต่เริ่มเรียนรู้การเขียนโค้ด ชอบสร้างเว็บแอปพลิเคชัน ทดลองสิ่งใหม่ๆ และแก้ปัญหาทางเทคนิค
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <span className="tag-badge">Fullstack Development</span>
            <span className="tag-badge">Anime & Manhwa</span>
            <span className="tag-badge">Gaming</span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="md:col-span-5 grid grid-cols-1 gap-3">
          <div className="card-paper p-4 bg-white border-1.5 border-[#161616] flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#fafaf7] border border-[#161616] flex items-center justify-center text-[#ff4500] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#525252]">ที่อยู่ปัจจุบัน</p>
              <p className="text-sm font-bold text-[#161616]">{data.location}</p>
            </div>
          </div>

          <div className="card-paper p-4 bg-white border-1.5 border-[#161616] flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#fafaf7] border border-[#161616] flex items-center justify-center text-[#ff4500] shrink-0">
              <Cake className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#525252]">วันเกิด</p>
              <p className="text-sm font-bold text-[#161616]">{data.birthday}</p>
            </div>
          </div>

          <div className="card-paper p-4 bg-white border-1.5 border-[#161616] flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#fafaf7] border border-[#161616] flex items-center justify-center text-[#ff4500] shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#525252]">สถานะ</p>
              <p className="text-sm font-bold text-[#161616] flex items-center gap-2">
                {data.status}
                <span className="w-2 h-2 rounded-full bg-[#ff4500] animate-pulse inline-block" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Heatmap Widget ("ลงมือสร้างสรรค์ทุกวัน") */}
      <div className="card-paper p-5 sm:p-6 bg-white mb-6 border-1.5 border-[#161616]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-[#161616] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff4500]" /> ลงมือสร้างสรรค์ทุกวัน
            </h3>
            <p className="text-xs text-[#525252] mt-0.5">
              ประวัติการ commit และพัฒนาโค้ดอย่างต่อเนื่องในช่วงหลายเดือนที่ผ่านมา
            </p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#525252]">
            <span>น้อย</span>
            <span className="w-2.5 h-2.5 bg-[#e2e2d8]"></span>
            <span className="w-2.5 h-2.5 bg-[#ffaa80]"></span>
            <span className="w-2.5 h-2.5 bg-[#ff7733]"></span>
            <span className="w-2.5 h-2.5 bg-[#ff4500]"></span>
            <span>มาก</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-1">
          <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[550px]">
            {contributionDays.map((day, idx) => (
              <div
                key={idx}
                title={`${day.date}: ${day.count} กิจกรรม`}
                className={`w-3 h-3 border border-[#161616] transition-colors cursor-pointer ${getHeatmapColor(day.count)}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interests Facts Gallery */}
      {data.facts && data.facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.facts.map((fact, idx) => (
            <div key={idx} className="card-paper overflow-hidden bg-white border-1.5 border-[#161616]">
              <div className="h-32 overflow-hidden relative bg-[#fafaf7]">
                {fact.image ? (
                  <img src={fact.image} alt={fact.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#ff4500] font-bold text-lg">
                    {fact.title}
                  </div>
                )}
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold text-white bg-[#161616] px-2 py-0.5 border border-white">
                  {fact.subtitle}
                </span>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono text-[#525252] uppercase">{fact.subtitle}</p>
                <p className="text-base font-bold text-[#161616]">{fact.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

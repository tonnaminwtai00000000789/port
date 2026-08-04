import React, { useState, useEffect } from "react";
import { MapPin, Clock, ArrowRight, Code } from "lucide-react";

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
    <section className="pt-24 pb-8">
      {/* Main Showcase Hero */}
      <div className="card-paper p-6 sm:p-10 bg-white mb-6 border-1.5 border-[#161616]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Statement */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-[#161616] leading-none tracking-tight">
              <span className="text-[#ff4500]">T</span>onnam
            </h1>

            <p className="font-display text-2xl sm:text-3xl font-extrabold leading-snug text-[#161616]">
              ผมชอบสร้างสิ่งใหม่ๆ <br />
              <span className="text-[#ff4500]">และชอบเห็นคนได้ใช้มัน</span>
            </p>

            <p className="text-[#525252] text-sm sm:text-base leading-relaxed">
              เริ่มจากการเขียนบอท Discord เล่นกับเพื่อนๆ วันนี้อยู่กับการเขียนโปรแกรมมาแล้ว <span className="num-badge">{experience}</span> ปี และตั้งใจสร้างสรรค์เว็บแอปพลิเคชันที่ตอบโจทย์ผู้ใช้จริง
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#works"
                className="btn-pop px-5 py-2 text-sm font-bold inline-flex items-center gap-1.5"
              >
                ดูสิ่งที่สร้างไว้ <ArrowRight className="w-4 h-4" />
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fafaf7] border border-[#e2e2d8] text-xs font-semibold text-[#161616]">
                <MapPin className="w-3.5 h-3.5 text-[#ff4500]" /> {data.location}
              </span>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-dashed border-[#e2e2d8]">
              <div>
                <p className="font-display text-3xl font-extrabold text-[#ff4500]">
                  {experience}+
                </p>
                <p className="text-xs font-semibold text-[#525252] mt-0.5">ปีที่เขียนโค้ด</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-[#161616]">
                  {age}
                </p>
                <p className="text-xs font-semibold text-[#525252] mt-0.5">อายุ (ปี)</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-[#161616]">
                  100%
                </p>
                <p className="text-xs font-semibold text-[#525252] mt-0.5">ความตั้งใจ</p>
              </div>
            </div>
          </div>

          {/* Right Profile Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-xs">
              <div className="slant absolute -bottom-2 -left-2 z-0 h-full w-full bg-[#ff4500] border-1.5 border-[#161616]" />
              <div className="relative z-10 overflow-hidden border-1.5 border-[#161616] bg-white">
                <img
                  src={data.profileImage}
                  alt={data.displayName}
                  className="w-full aspect-[4/5] object-cover"
                  loading="eager"
                />
                <div className="p-3 bg-[#161616] text-white flex items-center justify-between text-xs font-mono">
                  <span>TonnamInwtai00789</span>
                  <span className="text-[#ff4500] font-bold">{data.emoji}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio & Bangkok Time Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bio & Currently at */}
        <div className="md:col-span-7 card-paper p-6 bg-white border-1.5 border-[#161616]">
          <h2 className="text-xl font-bold text-[#161616] mb-2 flex items-center gap-2">
            สวัสดีครับ ผมชื่อ <span className="text-[#ff4500] font-extrabold">{data.nickname}</span> 👋
          </h2>

          <p className="text-[#525252] text-sm leading-relaxed mb-4 font-normal">
            ผมอายุ <span className="num-badge">{age}</span> ปี ทำงานและสร้างสรรค์โปรเจกต์ซอฟต์แวร์จากกรุงเทพฯ ชอบทดลองเทคโนโลยีใหม่ๆ และพัฒนาเครื่องมือที่มีประโยชน์
          </p>

          <div className="space-y-2 pt-3 border-t-1.5 border-[#161616]">
            <p className="text-xs font-extrabold text-[#161616] uppercase tracking-wider">กำลังทำอยู่ในปัจจุบัน</p>
            {data.positions?.map((pos, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 border border-[#e2e2d8] hover:border-[#161616] transition-colors">
                <img src={pos.logo} alt={pos.organization} className="w-8 h-8 object-cover border border-[#161616]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#161616] truncate">{pos.title}</p>
                  <a href={pos.organizationUrl} target="_blank" rel="noreferrer" className="text-xs text-[#525252] hover:text-[#ff4500] truncate block">
                    {pos.organization}
                  </a>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#f7f7f2] border border-[#e2e2d8]">
                  {pos.since}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Bangkok Clock */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="card-paper p-6 bg-white border-1.5 border-[#161616] flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#ff4500] uppercase">Bangkok, TH</span>
              <Clock className="w-4 h-4 text-[#161616]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#525252] mb-1">เวลากรุงเทพฯ ปัจจุบัน</p>
              <p className="font-mono text-3xl font-bold text-[#161616] tracking-tight">
                {currentTime || "--:--:--"}
              </p>
            </div>
          </div>

          <div className="card-paper p-4 bg-[#161616] text-white flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-[#ff4500]">STATUS</p>
              <p className="text-sm font-bold text-white">พร้อมรับงาน & โปรเจกต์ใหม่</p>
            </div>
            <a href="#contact" className="px-3 py-1.5 bg-[#ff4500] text-white text-xs font-bold border border-white hover:bg-white hover:text-[#161616] transition-colors">
              ติดต่อ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

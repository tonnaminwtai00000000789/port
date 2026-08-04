import React, { useState, useEffect } from "react";
import { MapPin, Clock, ArrowRight, Sparkles, Layers, ChevronDown } from "lucide-react";

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

  // Mouse Parallax Effect Effect handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      const layers = document.querySelectorAll(".hero-layer");
      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute("data-depth") || "10");
        const px = (-x * depth).toFixed(1);
        const py = (-y * depth).toFixed(1);
        (layer as HTMLElement).style.setProperty("--px", `${px}px`);
        (layer as HTMLElement).style.setProperty("--py", `${py}px`);
      });
    };

    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

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
    <section className="relative min-h-[85vh] flex items-center overflow-hidden border-b-2 border-[#0f172a] bg-[#f8fafc] pt-24 pb-16">
      {/* Background Slanted Bands (Flying Entrance & Breathe Animation) */}
      <div className="hero-layer pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block" data-depth="15">
        <div
          className="band slant absolute -top-[20%] right-[16%] h-[140%] w-24 bg-[#60a5fa]"
          style={{ "--ed": "0s", "--bd": "0s" } as React.CSSProperties}
        />
        <div
          className="band slant absolute -top-[20%] right-[6%] h-[140%] w-8 bg-[#0f172a]"
          style={{ "--ed": "0.1s", "--bd": "0.8s" } as React.CSSProperties}
        />
        <div
          className="band slant absolute -top-[20%] right-[1%] h-[140%] w-3 bg-[#bfdbfe]"
          style={{ "--ed": "0.2s", "--bd": "1.6s" } as React.CSSProperties}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        {/* Left Column: Hero Copy & Staggered Entrance */}
        <div className="lg:col-span-7 space-y-6">
          <div className="hero-in" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <span className="slant inline-flex px-3 py-1 bg-[#60a5fa] text-[#0f172a] text-xs font-bold border border-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
              <span className="unslant inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0f172a]" /> Digital Craftsman
              </span>
            </span>
          </div>

          <h1
            className="hero-in font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-[#0f172a] leading-none"
            style={{ "--d": "0.4s" } as React.CSSProperties}
          >
            <span className="text-[#60a5fa]">T</span>onnam
          </h1>

          <p
            className="hero-in font-display text-2xl sm:text-3xl font-extrabold leading-snug text-[#0f172a]"
            style={{ "--d": "0.6s" } as React.CSSProperties}
          >
            ผมชอบสร้างสิ่งใหม่ๆ <br />
            <span className="text-[#2563eb]">และชอบเห็นคนได้ใช้มัน</span>
          </p>

          <p
            className="hero-in text-[#475569] text-sm sm:text-base leading-relaxed max-w-lg"
            style={{ "--d": "0.8s" } as React.CSSProperties}
          >
            เริ่มจากการเขียนบอท Discord เล่นกับเพื่อนๆ วันนี้อยู่กับการเขียนโปรแกรมมาแล้ว <span className="num-badge">{experience}</span> ปี และตั้งใจสร้างสรรค์เว็บแอปพลิเคชันที่ตอบโจทย์ผู้ใช้จริง
          </p>

          <div
            className="hero-in flex flex-wrap items-center gap-3 pt-2"
            style={{ "--d": "1.0s" } as React.CSSProperties}
          >
            <a
              href="#works"
              className="btn-pop px-6 py-2.5 text-sm font-bold inline-flex items-center gap-2"
            >
              ดูสิ่งที่สร้างไว้ <ArrowRight className="w-4 h-4" />
            </a>
            <span className="slant inline-flex border border-[#0f172a] bg-white px-4 py-2 text-xs font-bold text-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
              <span className="unslant inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2563eb]" /> {data.location}
              </span>
            </span>
          </div>

          {/* Stats Counter */}
          <div
            className="hero-in grid grid-cols-3 gap-4 pt-6 border-t-2 border-dashed border-[#cbd5e1]"
            style={{ "--d": "1.15s" } as React.CSSProperties}
          >
            <div>
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#2563eb]">
                {experience}+
              </p>
              <p className="text-xs font-semibold text-[#475569] mt-0.5">ปีที่เขียนโค้ด</p>
            </div>
            <div>
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#0f172a]">
                {age}
              </p>
              <p className="text-xs font-semibold text-[#475569] mt-0.5">อายุ (ปี)</p>
            </div>
            <div>
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#0f172a]">
                100%
              </p>
              <p className="text-xs font-semibold text-[#475569] mt-0.5">ความตั้งใจ</p>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Interactive Showcase Cluster */}
        <div className="lg:col-span-5 relative hidden lg:block h-[480px]">
          {/* Card Back: Position Info */}
          <div className="hero-layer absolute bottom-4 left-0 w-[68%]" data-depth="25">
            <div className="card-in" style={{ "--d": "1.3s" } as React.CSSProperties}>
              <div className="card-floating card-paper -rotate-6 p-4 bg-white">
                <p className="text-[10px] font-mono font-bold text-[#2563eb] uppercase mb-1">องค์กรปัจจุบัน</p>
                <div className="flex items-center gap-3">
                  <img src={data.positions?.[0]?.logo} alt="logo" className="w-8 h-8 rounded-md border border-[#0f172a] object-cover" />
                  <div>
                    <p className="text-xs font-bold text-[#0f172a]">{data.positions?.[0]?.organization}</p>
                    <p className="text-[10px] text-[#475569]">{data.positions?.[0]?.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Top Right: Live Clock & Location */}
          <div className="hero-layer absolute top-2 right-0 w-[65%]" data-depth="18">
            <div className="card-in" style={{ "--d": "1.2s" } as React.CSSProperties}>
              <div className="card-floating card-paper rotate-6 p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase">Bangkok Time</span>
                  <Clock className="w-3.5 h-3.5 text-[#0f172a]" />
                </div>
                <p className="font-mono text-xl font-bold text-[#0f172a] tracking-tight">{currentTime || "--:--:--"}</p>
              </div>
            </div>
          </div>

          {/* Card Center Main: Profile Showcase */}
          <div className="hero-layer absolute top-1/2 left-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2" data-depth="10">
            <div className="card-in" style={{ "--d": "1.0s" } as React.CSSProperties}>
              <div className="card-floating card-paper -rotate-2 overflow-hidden bg-white">
                <img
                  src={data.profileImage}
                  alt={data.displayName}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-3 bg-[#0f172a] text-white flex items-center justify-between text-xs font-mono">
                  <span>TonnamInwtai00789</span>
                  <span className="text-[#60a5fa] font-bold">{data.emoji}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

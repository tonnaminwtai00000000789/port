import { useState, useEffect } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

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

export default function Hero({ data }: { data: HeroData }) {
  const [currentTime, setCurrentTime] = useState("");
  const [age, setAge] = useState(19);
  const [experience, setExperience] = useState(4);

  useEffect(() => {
    // Calculate age
    const birthDate = new Date(data.birthDate);
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

    // Calculate experience
    const startDate = new Date(data.startDate);
    const years = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
    );
    setExperience(years);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Bangkok",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <TooltipProvider>
      {/* Hero Banner with Dark Theme */}
      <div className="relative mb-8 flex justify-center flex-col items-center w-full min-h-[480px] md:h-[500px] glass-card rounded-[40px] overflow-hidden group transition-all duration-700 hover:shadow-[0_0_50px_rgba(99,102,241,0.2)]">

        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" delay-1000="" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay pointer-events-none" />

        {/* Floating Abstract Shapes for Depth */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/40 rounded-full animate-float opacity-50" />
        <div className="absolute bottom-1/3 left-1/5 w-6 h-6 border border-primary/30 rounded-lg rotate-12 animate-float opacity-30" style={{ animationDelay: '2s' }} />

        <h1
          className="absolute top-8 md:top-4 -left-10 italic text-5xl sm:text-7xl md:text-[180px] font-black text-transparent animate-slide-left opacity-10 select-none pointer-events-none z-0"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
        >
          {data.firstName.toUpperCase()}
        </h1>
        <h1
          className="absolute bottom-8 md:bottom-4 -right-10 italic text-5xl sm:text-7xl md:text-[180px] font-black text-transparent animate-slide-right opacity-10 select-none pointer-events-none z-0"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
        >
          {data.lastName.toUpperCase()}
        </h1>

        <div className="relative z-10 text-center px-4 space-y-4 md:space-y-6 max-w-full md:max-w-5xl mx-auto overflow-hidden">
          <div className="inline-block px-4 py-1.5 rounded-full glass border border-white/5 text-[10px] md:text-xs font-semibold tracking-widest text-primary uppercase animate-fade-in relative z-20">
            Digital Craftsman
          </div>

          <h1 className="text-[clamp(2.5rem,5vw+1rem,9rem)] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500/50 pb-2 animate-fade-scale leading-[0.85] filter drop-shadow-2xl text-balance break-all md:break-normal">
            {data.displayName}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 animate-fade-delay">
            <span className="px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-md text-white border border-white/10 text-xs md:text-sm font-medium hover:bg-white/10 transition-colors cursor-default whitespace-nowrap">
              aka. <span className="text-primary">{data.nickname}</span>
            </span>
            <span className="flex px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-md text-gray-300 border border-white/10 text-xs md:text-sm font-medium items-center gap-2 hover:bg-white/10 transition-colors cursor-default whitespace-nowrap">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" /> {data.location}
            </span>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <div className="p-8 bg-dark-card border border-dark-border rounded-[32px] hover:border-primary/30 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
            Hi, I'm {data.nickname} <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </h2>

          <p className="text-lg text-gray-400 mb-8 font-light leading-relaxed">
            I'm a <span className="text-white font-medium">{age} years old</span> developer from Thailand who creates magical digital experiences.
            I started coding <span className="text-primary font-bold">{experience} years ago</span>.
          </p>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-2">CURRENTLY</p>
            {data.positions.map((position, index) => (
              <div key={index} className="flex items-center gap-4 group/item hover:bg-dark-accent p-2 rounded-xl transition-colors -mx-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-dark-border bg-dark-card cursor-help">
                      <img
                        className="w-full h-full object-cover"
                        alt={position.organization}
                        src={position.logo}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Works at {position.organization}</p>
                  </TooltipContent>
                </Tooltip>

                <div className="flex-1">
                  <p className="text-white font-medium flex items-center gap-2">
                    {position.title}
                    <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                  </p>
                  <a
                    href={position.organizationUrl}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {position.organization}
                  </a>
                </div>
                <span className="text-xs text-gray-600 bg-dark-border/20 px-2 py-1 rounded-md border border-dark-border/50">
                  {position.since}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image & Status */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-dark-accent border border-dark-border rounded-[32px] overflow-hidden relative group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              alt="profile"
              src={data.profileImage}
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex justify-between items-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-dark-bg/80 backdrop-blur-md border border-dark-border p-3 rounded-2xl inline-flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-colors">
                      <span className="text-3xl filter drop-shadow-lg">{data.emoji}</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Status</span>
                        <span className="text-sm text-white font-medium">Sleepy</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Current Mood & Status</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-dark-card border border-dark-border p-4 rounded-[24px] flex items-center justify-between group hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-dark-accent rounded-full text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Local Time</p>
                  <p className="text-white font-mono">{currentTime}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-dark-card border border-dark-border p-4 rounded-[24px] flex items-center justify-between group hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-dark-accent rounded-full text-green-500">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Availability</p>
                  <p className="text-white font-medium">Open for work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

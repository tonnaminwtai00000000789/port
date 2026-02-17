import { House, Cake, User, Star, MapPin } from "lucide-react";

export interface Fact {
  title: string;
  subtitle: string;
  image: string;
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

export default function AboutMe({ data }: { data: AboutMeData }) {
  return (
    <div className="mb-24 py-24 relative">
      <div className="flex items-center gap-4 mb-16">
        <div className="p-4 rounded-[20px] glass text-orange-400">
          <Star className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
        </div>
        <div>
          <h2 className="text-xs font-black text-orange-400 tracking-[0.2em] uppercase mb-1">IDENTITY</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Beyond the Code</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
        {/* Nickname Card - Large */}
        <div className="glass-card rounded-[40px] p-12 md:p-16 relative overflow-hidden group hover:scale-[1.02] transition-all duration-700 min-h-[400px] flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-[120px]" />

          <p className="text-gray-500 text-[10px] md:text-xs font-black mb-4 md:mb-6 uppercase tracking-[0.4em] relative z-10 opacity-60">PSEUDONYM</p>
          <div className="relative group/text">
            <h1 className="text-[clamp(4rem,15vw,10rem)] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-800 leading-none relative z-10 select-none filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-110">
              {data.nickname}
            </h1>
            <h1 className="absolute inset-0 text-[clamp(4rem,15vw,10rem)] font-black tracking-tighter text-primary/10 leading-none blur-2xl group-hover:blur-3xl transition-all duration-700 select-none pointer-events-none translate-y-4">
              {data.nickname}
            </h1>
          </div>
        </div>

        {/* Status & Location Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="glass-card rounded-[40px] p-10 flex items-center justify-between group overflow-hidden relative min-h-[150px]">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-3">CURRENT PULSE</h3>
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-6xl font-black text-white tracking-tighter group-hover:text-green-400 transition-colors duration-500">{data.status}</span>
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-green-200"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card rounded-[40px] p-8 flex flex-col justify-between hover:bg-white/5 transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 opacity-60">HEADQUARTERS</p>
                <p className="text-2xl font-black text-white tracking-tight">{data.location}</p>
              </div>
            </div>
            <div className="glass-card rounded-[40px] p-8 flex flex-col justify-between hover:bg-white/5 transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-pink-500 mb-8 group-hover:scale-110 transition-transform">
                <Cake className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 opacity-60">ORIGIN DATE</p>
                <p className="text-2xl font-black text-white tracking-tight">{data.birthday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facts Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {data.facts.map((fact, index) => (
          <div key={index} className="aspect-square glass-card rounded-[32px] overflow-hidden relative group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500">
            {fact.type === 'image' && fact.image ? (
              <>
                <img src={fact.image} alt={fact.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{fact.subtitle}</p>
                  <p className="text-lg font-black text-white leading-tight tracking-tighter">{fact.title}</p>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center p-8 text-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-3xl glass-card flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                  <Star className="w-8 h-8" />
                </div>
                <p className="text-xl font-black text-white tracking-tight">{fact.title}</p>
                <p className="text-[10px] font-black text-gray-500 mt-2 uppercase tracking-widest">{fact.subtitle}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

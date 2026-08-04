import React, { useState } from "react";
import { Mail, Send, Globe, Loader2 } from "lucide-react";

export interface ContactData {
  id: number;
  email: string;
  socials: Array<{
    url: string;
    icon: string;
    platform: string;
    username: string;
  }>;
}

export function Contact({ data }: { data: ContactData }) {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", content: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1000);
  };

  if (!data) return null;

  return (
    <div id="contact" className="mb-24 py-12 md:py-24 relative">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">
        <div className="flex-1 space-y-8 md:space-y-12">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full glass border border-white/5 text-[10px] md:text-xs font-semibold tracking-widest text-primary uppercase mb-4">
              INITIATE CONTACT
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-none tracking-tighter mb-6">
              Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-blue-400 filter drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">extraordinary</span> together.
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6 w-full">
            <a
              href={`mailto:${data.email}`}
              className="group glass-card flex items-center justify-between p-6 md:p-8 rounded-[32px] md:rounded-[40px] hover:bg-white/5 transition-all duration-700 md:hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className="p-4 md:p-5 glass rounded-xl md:rounded-[24px] text-primary md:group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <Mail className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1 md:mb-2">DROP AN ENVELOPE</p>
                  <p className="text-lg md:text-2xl font-black text-white tracking-tight break-all">{data.email}</p>
                </div>
              </div>
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full glass flex items-center justify-center text-gray-500 group-hover:text-white transition-all duration-500 shrink-0">
                <Send className="w-4 h-4 md:w-6 md:h-6 md:group-hover:-rotate-45 transition-transform" />
              </div>
            </a>
          </div>

          {data.socials && data.socials.length > 0 && (
            <div className="flex flex-wrap gap-3 md:gap-4">
              {data.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 glass-card rounded-xl md:rounded-2xl text-gray-400 hover:text-white transition-all duration-500 md:hover:-translate-y-1 active:scale-95"
                >
                  <div className="text-lg md:text-xl md:group-hover:scale-110 transition-transform">
                    {social.icon && social.icon.startsWith('devicon-') ? (
                      <i className={`${social.icon}`} />
                    ) : (
                      <Globe className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{social.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-[480px]">
          <div className="glass-card rounded-[32px] md:rounded-[48px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 mb-8 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1 md:mb-2">Direct Channel</h3>
              <p className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Awaiting your coordinates</p>
            </div>

            <form className="space-y-4 md:space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Your Identity"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass bg-black/20 border-white/5 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm md:text-base text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-600 font-bold"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Return Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass bg-black/20 border-white/5 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-sm md:text-base text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-600 font-bold"
                />
              </div>
              <div className="space-y-2">
                <textarea
                  required
                  placeholder="Mission Details"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="w-full glass bg-black/20 border-white/5 rounded-xl md:rounded-[24px] px-5 md:px-6 py-4 md:py-5 text-sm md:text-base text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-600 resize-none font-bold min-h-[120px] md:min-h-[160px]"
                />
              </div>
              <button
                disabled={status === "sending"}
                className="w-full bg-primary hover:bg-indigo-500 text-white font-black py-4 md:py-6 rounded-xl md:rounded-[24px] flex items-center justify-center gap-3 md:gap-4 transition-all shadow-[0_20px_40px_rgba(99,102,241,0.2)] active:scale-95 disabled:opacity-50 group/btn"
              >
                {status === "sending" ? (
                  <>
                    <span className="text-xs md:text-base">Initializing Transmission</span>
                    <Loader2 className="w-5 md:w-6 h-5 md:h-6 animate-spin" />
                  </>
                ) : status === "sent" ? (
                  <span className="uppercase tracking-[0.2em] text-[10px] md:text-sm text-green-400">Transmission Sent!</span>
                ) : (
                  <>
                    <span className="uppercase tracking-[0.2em] text-[10px] md:text-sm">Send Transmission</span>
                    <Send className="w-4 h-4 md:w-5 md:h-5 md:group-hover:translate-x-1 md:group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Mail, Send, Globe, Loader2, CheckCircle } from "lucide-react";

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
    <section id="contact" className="py-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="slant inline-block h-6 w-2.5 rounded-xs bg-indigo-600"></span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Initiate Contact
        </h2>
        <span className="h-px flex-1 bg-slate-200 ml-2"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Email & Socials */}
        <div className="lg:col-span-6 space-y-5">
          <div className="card-light p-6 sm:p-8 rounded-xl bg-white border border-slate-200 space-y-5">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">DIRECT ENVELOPE</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1 mb-2">
                Let's build something extraordinary.
              </h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Open for software opportunities, creative technical collaborations, or just a friendly chat.
              </p>
            </div>

            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-3.5 p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-slate-900 hover:bg-indigo-600 hover:text-white transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-white text-indigo-600 flex items-center justify-center font-bold shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase font-bold text-slate-500 group-hover:text-indigo-200">Email Address</p>
                <p className="text-sm sm:text-base font-black tracking-tight truncate">{data.email}</p>
              </div>
            </a>
          </div>

          {/* Social Badges Grid */}
          {data.socials && data.socials.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {data.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600 font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-all"
                >
                  {social.icon && social.icon.startsWith("devicon-") ? (
                    <i className={`${social.icon} text-base`} />
                  ) : (
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  )}
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Direct Channel Form */}
        <div className="lg:col-span-6">
          <div className="card-light p-6 sm:p-8 rounded-xl bg-white border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-0.5">Direct Channel</h3>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mb-5">Send a quick transmission</p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Identity / Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Return Address / Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  placeholder="Transmission details..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-slate-400 resize-none min-h-[110px]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3.5 rounded-lg bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "sending" ? (
                  <>
                    <span>Sending Transmission...</span>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </>
                ) : status === "sent" ? (
                  <>
                    <span>Transmission Sent!</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                  </>
                ) : (
                  <>
                    <span>Send Transmission</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

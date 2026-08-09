import React, { useState } from "react";
import { Mail, Send, Globe, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  if (!data) return null;

  return (
    <section id="contact" className="py-10">
      {/* Section Title */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-1.5 h-6 bg-[#1d4ed8] rounded-full" />
        <h2 className="text-2xl font-bold text-[#0f172a] font-display">
          ติดต่อผม
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Email & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-6 space-y-4"
        >
          <div className="paper-card p-6 bg-white space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#1d4ed8] uppercase tracking-wider">
                CONTACT DIRECTLY
              </span>
              <h3 className="text-xl font-bold text-[#0f172a] mt-1 mb-2 font-display">
                ส่งข้อความพูดคุยหรือปรึกษาโปรเจกต์
              </h3>
              <p className="text-[#475569] text-xs leading-relaxed">
                ยินดีร่วมงาน พัฒนาโปรเจกต์ หรือแลกเปลี่ยนความคิดเห็นทางเทคโนโลยีครับ
              </p>
            </div>

            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-3 p-3 bg-[#eff6ff] rounded border border-[#bfdbfe] text-[#0f172a] hover:bg-[#1d4ed8] hover:text-white transition-colors group"
            >
              <Mail className="w-5 h-5 text-[#1d4ed8] group-hover:text-white shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase font-mono font-bold">อีเมล</p>
                <p className="text-sm font-bold truncate">{data.email}</p>
              </div>
            </a>
          </div>

          {/* Social Badges Grid */}
          {data.socials && data.socials.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white rounded border border-[#cbd5e1] text-[#0f172a] hover:border-[#1d4ed8] hover:text-[#1d4ed8] hover:bg-[#eff6ff] text-xs font-bold inline-flex items-center gap-2 transition-colors shadow-2xs font-mono"
                >
                  {social.icon && social.icon.startsWith("devicon-") ? (
                    <i className={`${social.icon}`} />
                  ) : (
                    <Globe className="w-3.5 h-3.5 text-[#1d4ed8]" />
                  )}
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Column: Direct Channel Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="lg:col-span-6"
        >
          <div className="paper-card p-6 bg-white">
            <h3 className="text-lg font-bold text-[#0f172a] mb-1 font-display">
              ส่งข้อความถึงผมโดยตรง
            </h3>
            <p className="text-[#475569] text-xs mb-4">กรอกข้อมูลเพื่อส่งข้อความด่วน</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="ชื่อของคุณ / Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8fafc] rounded border border-[#cbd5e1] text-[#0f172a] text-xs font-medium focus:outline-none focus:border-[#1d4ed8] focus:bg-white placeholder:text-[#94a3b8]"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="อีเมลสำหรับตอบกลับ / Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8fafc] rounded border border-[#cbd5e1] text-[#0f172a] text-xs font-medium focus:outline-none focus:border-[#1d4ed8] focus:bg-white placeholder:text-[#94a3b8]"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  placeholder="ข้อความของคุณ..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8fafc] rounded border border-[#cbd5e1] text-[#0f172a] text-xs font-medium focus:outline-none focus:border-[#1d4ed8] focus:bg-white placeholder:text-[#94a3b8] resize-none min-h-[100px]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="stamp-btn-blue w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "sending" ? (
                  <>
                    <span>กำลังส่งข้อความ...</span>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </>
                ) : status === "sent" ? (
                  <>
                    <span>ส่งข้อความสำเร็จ!</span>
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </>
                ) : (
                  <>
                    <span>ส่งข้อความ</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

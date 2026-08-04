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
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  if (!data) return null;

  return (
    <section id="contact" className="py-10">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="slant inline-block h-6 w-2.5 bg-[#ff4500]"></span>
        <h2 className="text-2xl font-black text-[#161616] font-display">
          ติดต่อผม
        </h2>
        <span className="h-px flex-1 bg-[#e2e2d8] ml-2"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Email & Socials */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card-paper p-6 bg-white border-1.5 border-[#161616] space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#ff4500]">CONTACT ME</span>
              <h3 className="text-2xl font-black text-[#161616] mt-1 mb-2">
                ส่งข้อความพูดคุยหรือปรึกษาโปรเจกต์
              </h3>
              <p className="text-[#525252] text-xs leading-relaxed">
                ยินดีร่วมงาน พัฒนาโปรเจกต์ หรือแลกเปลี่ยนความคิดเห็นทางเทคโนโลยีครับ
              </p>
            </div>

            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-3 p-3 bg-[#fafaf7] border border-[#161616] text-[#161616] hover:bg-[#ff4500] hover:text-white transition-colors group"
            >
              <Mail className="w-5 h-5 text-[#ff4500] group-hover:text-white shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase font-mono font-bold">อีเมล</p>
                <p className="text-sm font-black truncate">{data.email}</p>
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
                  className="px-3 py-2 bg-white border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                >
                  {social.icon && social.icon.startsWith("devicon-") ? (
                    <i className={`${social.icon}`} />
                  ) : (
                    <Globe className="w-3.5 h-3.5 text-[#ff4500]" />
                  )}
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Direct Channel Form */}
        <div className="lg:col-span-6">
          <div className="card-paper p-6 bg-white border-1.5 border-[#161616]">
            <h3 className="text-lg font-black text-[#161616] mb-1">ส่งข้อความถึงผมโดยตรง</h3>
            <p className="text-[#525252] text-xs mb-4">กรอกข้อมูลเพื่อส่งข้อความด่วน</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="ชื่อของคุณ / Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#fafaf7] border border-[#161616] text-[#161616] text-xs font-semibold focus:outline-none focus:bg-white placeholder:text-[#a3a3a3]"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="อีเมลสำหรับตอบกลับ / Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#fafaf7] border border-[#161616] text-[#161616] text-xs font-semibold focus:outline-none focus:bg-white placeholder:text-[#a3a3a3]"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  placeholder="ข้อความของคุณ..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#fafaf7] border border-[#161616] text-[#161616] text-xs font-semibold focus:outline-none focus:bg-white placeholder:text-[#a3a3a3] resize-none min-h-[100px]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-pop w-full py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
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
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Mail, Send, Globe, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { DecryptedText } from "../reactbits/DecryptedText";
import { Magnet } from "../reactbits/Magnet";

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
      <div className="mb-6">
        <span className="kuro-section-label">
          <DecryptedText text="✦ [DIRECT LINE // 05]" animateOn="view" speed={45} />
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
          ติดต่อ
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Email + Socials (Unboxed) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--kuro-pink)" }}>
              CONTACT
            </span>
            <h3 className="text-2xl font-black tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
              ส่งข้อความพูดคุยหรือติดต่องาน
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--kuro-skull-dim)" }}>
              ถ้าจะคุยเฉยๆทักdiscord,ig มาเด้ออ
            </p>
          </div>

          <Magnet strength={0.2} radius={70} className="w-full">
            <motion.a
              href={`mailto:${data.email}`}
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-3 p-3.5 rounded-xl transition-all group"
              style={{
                background: "rgba(255,105,200,0.08)",
                border: "1px solid rgba(255,105,200,0.25)",
                color: "var(--kuro-skull)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,105,200,0.15)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--kuro-pink)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,105,200,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,105,200,0.25)";
              }}
            >
              <Mail className="w-5 h-5 shrink-0" style={{ color: "var(--kuro-pink)" }} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase font-mono font-bold" style={{ color: "var(--kuro-muted-bright)" }}>อีเมล</p>
                <p className="text-sm font-bold truncate" style={{ color: "var(--kuro-skull)" }}>{data.email}</p>
              </div>
            </motion.a>
          </Magnet>

          {/* Social badges (Unboxed Magnet Pills) */}
          {data.socials?.length > 0 && (
            <div className="flex flex-wrap gap-2.5 pt-2">
              {data.socials.map((social, idx) => (
                <Magnet key={idx} strength={0.2} radius={50}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold font-mono inline-flex items-center gap-2 transition-all"
                    style={{
                      background: "rgba(25, 2, 35, 0.7)",
                      border: "1px solid var(--kuro-border)",
                      color: "var(--kuro-skull-dim)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--kuro-primary-glow)";
                      (e.currentTarget as HTMLElement).style.color = "var(--kuro-primary-glow)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--kuro-border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--kuro-skull-dim)";
                    }}
                  >
                    {social.icon?.startsWith("devicon-") ? (
                      <i className={`${social.icon} text-base`} />
                    ) : (
                      <Globe className="w-3.5 h-3.5" style={{ color: "var(--kuro-primary-glow)" }} />
                    )}
                    <span>{social.platform}</span>
                  </a>
                </Magnet>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Contact form (Unboxed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-4"
        >
          <div>
            <h3 className="text-xl font-black mb-1" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
              ส่งข้อความโดยตรง
            </h3>
            <p className="text-xs" style={{ color: "var(--kuro-muted-bright)" }}>
              กรอกข้อมูลเพื่อส่งข้อความ
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              type="text"
              required
              placeholder="ชื่อของคุณ / Your Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              type="email"
              required
              placeholder="อีเมลสำหรับตอบกลับ / Email Address"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <Textarea
              required
              rows={4}
              placeholder="ข้อความของคุณ..."
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />

            <Magnet strength={0.25} radius={80} className="w-full">
              <Button
                type="submit"
                disabled={status === "sending"}
                variant={status === "sent" ? "outline" : "pink"}
                className="w-full gap-2 uppercase tracking-wider py-5"
              >
                {status === "sending" ? (
                  <><span>กำลังส่งข้อความ...</span><Loader2 className="w-3.5 h-3.5 animate-spin" /></>
                ) : status === "sent" ? (
                  <><span>ส่งข้อความสำเร็จ!</span><CheckCircle className="w-3.5 h-3.5" style={{ color: "var(--kuro-green)" }} /></>
                ) : (
                  <><span>ส่งข้อความ</span><Send className="w-3.5 h-3.5" /></>
                )}
              </Button>
            </Magnet>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

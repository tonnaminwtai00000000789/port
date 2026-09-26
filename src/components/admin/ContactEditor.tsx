"use client";

import React from "react";
import { Save, Trash2, Plus } from "lucide-react";

interface ContactEditorProps {
  contactData: any;
  setContactData: (data: any) => void;
  saveContact: () => void;
  saving: boolean;
}

export function ContactEditor({ contactData, setContactData, saveContact, saving }: ContactEditorProps) {
  if (!contactData) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-display text-[#0f172a]">Contact & Socials Editor</h1>
          <p className="text-xs text-[#475569]">จัดการอีเมลติดต่อและช่องทาง โซเชียลมีเดีย</p>
        </div>
        <button onClick={saveContact} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกช่องทางติดต่อ"}
        </button>
      </div>

      <div className="card-paper p-6 bg-white space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#0f172a] mb-1">อีเมลติดต่อหลัก (Contact Email)</label>
          <input
            type="email"
            value={contactData.email || ""}
            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-3">
          <p className="text-xs font-bold text-[#0f172a]">รายการ Social Media</p>
          {contactData.socials?.map((soc: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-[#cbd5e1] rounded-lg">
              <input
                type="text"
                placeholder="Platform"
                value={soc.platform}
                onChange={(e) => {
                  const updated = { ...contactData };
                  updated.socials[idx].platform = e.target.value;
                  setContactData(updated);
                }}
                className="w-1/3 px-2 py-1 border border-[#0f172a] text-xs font-bold rounded bg-white"
              />
              <input
                type="text"
                placeholder="URL Link"
                value={soc.url}
                onChange={(e) => {
                  const updated = { ...contactData };
                  updated.socials[idx].url = e.target.value;
                  setContactData(updated);
                }}
                className="w-2/3 px-2 py-1 border border-[#0f172a] text-xs font-semibold rounded bg-white"
              />
              <button
                onClick={() => {
                  const updated = { ...contactData };
                  updated.socials = updated.socials.filter((_: any, i: number) => i !== idx);
                  setContactData(updated);
                }}
                className="text-rose-600 hover:text-rose-800 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              const updated = { ...contactData };
              if (!updated.socials) updated.socials = [];
              updated.socials.push({ platform: "GitHub", url: "https://github.com/", icon: "devicon-github-original", username: "tonnam" });
              setContactData(updated);
            }}
            className="text-xs font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> เพิ่มช่องทาง Social ใหม่
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Save } from "lucide-react";

interface AboutMeEditorProps {
  aboutData: any;
  setAboutData: (data: any) => void;
  saveAboutMe: () => void;
  saving: boolean;
}

export function AboutMeEditor({ aboutData, setAboutData, saveAboutMe, saving }: AboutMeEditorProps) {
  if (!aboutData) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-display text-[#0f172a]">About Me Editor</h1>
          <p className="text-xs text-[#475569]">แก้ไขข้อมูลประวัติ และสถานะปัจจุบัน</p>
        </div>
        <button onClick={saveAboutMe} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </button>
      </div>

      <div className="card-paper p-6 bg-white space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">ข้อความสถานะ (Status Pulse)</label>
            <input
              type="text"
              value={aboutData.status || ""}
              onChange={(e) => setAboutData({ ...aboutData, status: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">ชื่อจริง (Full Name)</label>
            <input
              type="text"
              value={aboutData.fullName || ""}
              onChange={(e) => setAboutData({ ...aboutData, fullName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Save, Plus, Trash2 } from "lucide-react";

interface HeroEditorProps {
  heroData: any;
  setHeroData: (data: any) => void;
  saveHero: () => void;
  saving: boolean;
}

export function HeroEditor({ heroData, setHeroData, saveHero, saving }: HeroEditorProps) {
  if (!heroData) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-display text-[#0f172a]">Hero Section Editor</h1>
          <p className="text-xs text-[#475569]">แก้ไขข้อมูลต้อนรับ ชื่อ อวตาร และตำแหน่งงาน</p>
        </div>
        <button onClick={saveHero} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </button>
      </div>

      <div className="card-paper p-6 bg-white space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">ชื่อแสดงหลัก (Display Name)</label>
            <input
              type="text"
              value={heroData.displayName || ""}
              onChange={(e) => setHeroData({ ...heroData, displayName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">ชื่อเล่น (Nickname)</label>
            <input
              type="text"
              value={heroData.nickname || ""}
              onChange={(e) => setHeroData({ ...heroData, nickname: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">สถานที่ (Location)</label>
            <input
              type="text"
              value={heroData.location || ""}
              onChange={(e) => setHeroData({ ...heroData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">URL รูปอวตาร (Profile Image)</label>
            <input
              type="text"
              value={heroData.profileImage || ""}
              onChange={(e) => setHeroData({ ...heroData, profileImage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">วันเกิด (สำหรับคำนวณอายุ YYYY-MM-DD)</label>
            <input
              type="text"
              value={heroData.birthDate || ""}
              onChange={(e) => setHeroData({ ...heroData, birthDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">วันที่เริ่มเขียนโค้ด (YYYY-MM-DD)</label>
            <input
              type="text"
              value={heroData.startDate || ""}
              onChange={(e) => setHeroData({ ...heroData, startDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
            />
          </div>
        </div>

        {/* Currently Working / Positions Editor */}
        <div className="pt-5 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">กำลังทำอยู่ในปัจจุบัน (Positions & Organizations)</p>
            <button
              type="button"
              onClick={() => {
                const currentPositions = heroData.positions || [];
                setHeroData({
                  ...heroData,
                  positions: [
                    ...currentPositions,
                    {
                      logo: "https://theijon.online/logo.jpg",
                      title: "ตำแหน่งงาน",
                      organization: "ชื่อองค์กร",
                      organizationUrl: "https://example.com",
                      since: "Since 2026",
                    },
                  ],
                });
              }}
              className="text-xs font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> เพิ่มองค์กร / ตำแหน่งใหม่
            </button>
          </div>

          <div className="space-y-3">
            {heroData.positions?.map((pos: any, posIdx: number) => (
              <div key={posIdx} className="p-4 bg-slate-50 border border-[#cbd5e1] rounded-xl space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-[#2563eb]">ตำแหน่ง #{posIdx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = heroData.positions.filter((_: any, i: number) => i !== posIdx);
                      setHeroData({ ...heroData, positions: updated });
                    }}
                    className="text-xs text-rose-600 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> ลบตำแหน่งนี้
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#0f172a] mb-1">ตำแหน่ง (Title)</label>
                    <input
                      type="text"
                      placeholder="the founder of"
                      value={pos.title || ""}
                      onChange={(e) => {
                        const updated = [...heroData.positions];
                        updated[posIdx].title = e.target.value;
                        setHeroData({ ...heroData, positions: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#0f172a] text-xs font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#0f172a] mb-1">ชื่อองค์กร (Organization)</label>
                    <input
                      type="text"
                      placeholder="The ijon"
                      value={pos.organization || ""}
                      onChange={(e) => {
                        const updated = [...heroData.positions];
                        updated[posIdx].organization = e.target.value;
                        setHeroData({ ...heroData, positions: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#0f172a] text-xs font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#0f172a] mb-1">URL เว็บไซต์องค์กร (Organization URL)</label>
                    <input
                      type="text"
                      placeholder="https://theijon.online/"
                      value={pos.organizationUrl || ""}
                      onChange={(e) => {
                        const updated = [...heroData.positions];
                        updated[posIdx].organizationUrl = e.target.value;
                        setHeroData({ ...heroData, positions: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#0f172a] text-xs font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#0f172a] mb-1">ข้อความระยะเวลา (Since / Timeframe)</label>
                    <input
                      type="text"
                      placeholder="Since Jan 2025"
                      value={pos.since || ""}
                      onChange={(e) => {
                        const updated = [...heroData.positions];
                        updated[posIdx].since = e.target.value;
                        setHeroData({ ...heroData, positions: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#0f172a] text-xs font-semibold bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#0f172a] mb-1">URL รูปโลโก้องค์กร (Logo URL)</label>
                  <input
                    type="text"
                    placeholder="https://theijon.online/logo.jpg"
                    value={pos.logo || ""}
                    onChange={(e) => {
                      const updated = [...heroData.positions];
                      updated[posIdx].logo = e.target.value;
                      setHeroData({ ...heroData, positions: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#0f172a] text-xs font-semibold bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

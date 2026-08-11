import React from "react";
import { Save, Trash2, Image as ImageIcon, Plus } from "lucide-react";

interface WorksEditorProps {
  worksData: any[];
  setWorksData: (data: any[]) => void;
  saveWorks: () => void;
  saving: boolean;
}

export function WorksEditor({ worksData, setWorksData, saveWorks, saving }: WorksEditorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-display text-[#0f172a]">Portfolio Works Editor</h1>
          <p className="text-xs text-[#475569]">เพิ่มและแก้ไขโปรเจกต์ผลงานพร้อมรูปภาพ ({worksData.length} รายการ)</p>
        </div>
        <button onClick={saveWorks} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกโปรเจกต์"}
        </button>
      </div>

      <div className="space-y-6">
        {worksData.map((work, idx) => (
          <div key={idx} className="card-paper p-6 bg-white border-1.5 border-[#0f172a] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-[#2563eb]">Project #{idx + 1}</span>
              <button
                onClick={() => setWorksData(worksData.filter((_, i) => i !== idx))}
                className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" /> ลบโปรเจกต์
              </button>
            </div>

            {/* Image URL & Preview Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 p-3 rounded-lg border border-[#cbd5e1]">
              <div className="md:col-span-3 aspect-video rounded-md overflow-hidden border border-[#0f172a] bg-white flex items-center justify-center shrink-0">
                {work.image ? (
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-[#94a3b8]" />
                )}
              </div>
              <div className="md:col-span-9 space-y-1">
                <label className="block text-xs font-bold text-[#0f172a] flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-[#2563eb]" /> URL รูปภาพโปรเจกต์ (Image URL)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/project-cover.jpg"
                  value={work.image || ""}
                  onChange={(e) => {
                    const updated = [...worksData];
                    updated[idx].image = e.target.value;
                    setWorksData(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#0f172a] mb-1">ชื่อโปรเจกต์</label>
                <input
                  type="text"
                  placeholder="ชื่อโปรเจกต์"
                  value={work.title || ""}
                  onChange={(e) => {
                    const updated = [...worksData];
                    updated[idx].title = e.target.value;
                    setWorksData(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#0f172a] mb-1">URL เว็บไซต์โปรเจกต์ (Project URL)</label>
                <input
                  type="text"
                  placeholder="https://myproject.com"
                  value={work.url || (work.links && work.links[0]?.url) || ""}
                  onChange={(e) => {
                    const updated = [...worksData];
                    const newUrl = e.target.value;
                    updated[idx].url = newUrl;
                    updated[idx].links = [{ url: newUrl, type: "website" }];
                    setWorksData(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#0f172a] mb-1">ปี (Year)</label>
                <input
                  type="text"
                  placeholder="2026"
                  value={work.year || ""}
                  onChange={(e) => {
                    const updated = [...worksData];
                    updated[idx].year = e.target.value;
                    setWorksData(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#0f172a] mb-1">คำอธิบายโปรเจกต์</label>
              <textarea
                rows={2}
                placeholder="รายละเอียดสรุปเกี่ยวกับโปรเจกต์..."
                value={work.description || ""}
                onChange={(e) => {
                  const updated = [...worksData];
                  updated[idx].description = e.target.value;
                  setWorksData(updated);
                }}
                className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-medium resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setWorksData([
              ...worksData,
              { id: Date.now(), title: "โปรเจกต์ใหม่", description: "รายละเอียดโปรเจกต์", image: "https://theijon.online/images/tonnam.png", year: "2026", size: "large", tags: [], links: [] },
            ])
          }
          className="w-full py-3 border-2 border-dashed border-[#0f172a] rounded-xl text-xs font-bold text-[#0f172a] hover:bg-slate-100 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> เพิ่มโปรเจกต์ใหม่
        </button>
      </div>
    </div>
  );
}

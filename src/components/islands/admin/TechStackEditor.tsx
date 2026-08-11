import React from "react";
import { Save, Code, Trash2, Plus } from "lucide-react";

interface TechStackEditorProps {
  techData: any[];
  setTechData: (data: any[]) => void;
  saveTechStack: () => void;
  saving: boolean;
}

export function TechStackEditor({ techData, setTechData, saveTechStack, saving }: TechStackEditorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-display text-[#0f172a]">Tech Stack Editor</h1>
          <p className="text-xs text-[#475569]">จัดการหมวดหมู่ทักษะ และสัญลักษณ์เครื่องมือทั้งหมด ({techData.length} หมวดหมู่)</p>
        </div>
        <button onClick={saveTechStack} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึก Tech Stack"}
        </button>
      </div>

      <div className="space-y-6">
        {techData.map((cat, catIdx) => (
          <div key={catIdx} className="card-paper p-6 bg-white border-1.5 border-[#0f172a] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#2563eb]" />
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => {
                    const updated = [...techData];
                    updated[catIdx].category = e.target.value;
                    setTechData(updated);
                  }}
                  className="font-bold text-sm text-[#0f172a] bg-slate-50 px-2 py-1 border border-[#0f172a] rounded-md"
                />
              </div>
              <button
                onClick={() => setTechData(techData.filter((_, i) => i !== catIdx))}
                className="text-xs text-rose-600 hover:underline font-bold inline-flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> ลบหมวดหมู่
              </button>
            </div>

            {/* Items Grid */}
            <div className="space-y-2">
              <p className="text-[10px] font-mono font-bold text-[#475569] uppercase">รายการเครื่องมือในหมวดหมู่นี้</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.technologies?.map((tech: any, techIdx: number) => (
                  <div key={techIdx} className="flex items-center gap-2 p-2 bg-slate-50 border border-[#cbd5e1] rounded-lg">
                    <input
                      type="text"
                      placeholder="ชื่อเครื่องมือ"
                      value={tech.name}
                      onChange={(e) => {
                        const updated = [...techData];
                        updated[catIdx].technologies[techIdx].name = e.target.value;
                        setTechData(updated);
                      }}
                      className="w-1/2 px-2 py-1 border border-[#0f172a] text-xs font-semibold rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Icon Class / URL"
                      value={tech.icon}
                      onChange={(e) => {
                        const updated = [...techData];
                        updated[catIdx].technologies[techIdx].icon = e.target.value;
                        setTechData(updated);
                      }}
                      className="w-1/2 px-2 py-1 border border-[#0f172a] text-[10px] font-mono rounded bg-white"
                    />
                    <button
                      onClick={() => {
                        const updated = [...techData];
                        updated[catIdx].technologies = updated[catIdx].technologies.filter((_: any, i: number) => i !== techIdx);
                        setTechData(updated);
                      }}
                      className="text-rose-600 hover:text-rose-800 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const updated = [...techData];
                  if (!updated[catIdx].technologies) updated[catIdx].technologies = [];
                  updated[catIdx].technologies.push({ name: "ใหม่", icon: "devicon-javascript-plain colored" });
                  setTechData(updated);
                }}
                className="mt-2 text-xs font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> เพิ่มเครื่องมือในหมวดนี้
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setTechData([
              ...techData,
              { id: Date.now(), category: "หมวดหมู่ใหม่", order: techData.length + 1, technologies: [] },
            ])
          }
          className="w-full py-3 border-2 border-dashed border-[#0f172a] rounded-xl text-xs font-bold text-[#0f172a] hover:bg-slate-100 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> เพิ่มหมวดหมู่ Tech Stack ใหม่
        </button>
      </div>
    </div>
  );
}

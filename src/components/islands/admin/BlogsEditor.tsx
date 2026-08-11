import React from "react";
import { Save, Trash2, Image as ImageIcon, Plus } from "lucide-react";

interface BlogsEditorProps {
  blogsData: any[];
  setBlogsData: (data: any[]) => void;
  saveBlogs: () => void;
  saving: boolean;
}

export function BlogsEditor({ blogsData, setBlogsData, saveBlogs, saving }: BlogsEditorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-display text-[#0f172a]">Blog Posts Editor</h1>
          <p className="text-xs text-[#475569]">จัดการบทความและโพสต์พร้อมรูปภาพปก ({blogsData.length} บทความ)</p>
        </div>
        <button onClick={saveBlogs} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกบทความ"}
        </button>
      </div>

      <div className="space-y-6">
        {blogsData.map((blog, idx) => (
          <div key={idx} className="card-paper p-6 bg-white border-1.5 border-[#0f172a] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-[#2563eb]">Post #{idx + 1}</span>
              <button
                onClick={() => setBlogsData(blogsData.filter((_, i) => i !== idx))}
                className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" /> ลบบทความ
              </button>
            </div>

            {/* Image URL & Preview Row for Blog */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 p-3 rounded-lg border border-[#cbd5e1]">
              <div className="md:col-span-3 aspect-video rounded-md overflow-hidden border border-[#0f172a] bg-white flex items-center justify-center shrink-0">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-[#94a3b8]" />
                )}
              </div>
              <div className="md:col-span-9 space-y-1">
                <label className="block text-xs font-bold text-[#0f172a] flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-[#2563eb]" /> URL รูปปกบทความ (Cover Image URL)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/blog-cover.jpg"
                  value={blog.image || ""}
                  onChange={(e) => {
                    const updated = [...blogsData];
                    updated[idx].image = e.target.value;
                    setBlogsData(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#0f172a] mb-1">หัวข้อบทความ (Title)</label>
                <input
                  type="text"
                  placeholder="หัวข้อบทความ"
                  value={blog.title || ""}
                  onChange={(e) => {
                    const updated = [...blogsData];
                    updated[idx].title = e.target.value;
                    setBlogsData(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#0f172a] mb-1">Slug URL (e.g. my-post)</label>
                <input
                  type="text"
                  placeholder="my-post"
                  value={blog.slug || ""}
                  onChange={(e) => {
                    const updated = [...blogsData];
                    updated[idx].slug = e.target.value;
                    setBlogsData(updated);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#0f172a] mb-1">เนื้อหาบทความ (Markdown/Text)</label>
              <textarea
                rows={4}
                placeholder="เนื้อหาบทความ..."
                value={blog.content || ""}
                onChange={(e) => {
                  const updated = [...blogsData];
                  updated[idx].content = e.target.value;
                  setBlogsData(updated);
                }}
                className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-medium resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setBlogsData([
              ...blogsData,
              { id: Date.now(), title: "บทความใหม่", slug: `post-${Date.now()}`, image: "https://theijon.online/images/tonnam.png", date: new Date().toISOString().split('T')[0], content: "เนื้อหาบทความใหม่...", published: true },
            ])
          }
          className="w-full py-3 border-2 border-dashed border-[#0f172a] rounded-xl text-xs font-bold text-[#0f172a] hover:bg-slate-100 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> เพิ่มบทความใหม่
        </button>
      </div>
    </div>
  );
}

import React from "react";
import {
  LayoutDashboard,
  User,
  Settings,
  Code,
  Briefcase,
  FileText,
  Mail,
  MessageSquare,
  LogOut,
} from "lucide-react";

export type AdminTab = "hero" | "aboutme" | "techstack" | "works" | "blogs" | "contact" | "inbox";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  techCount: number;
  worksCount: number;
  blogsCount: number;
  inboxCount: number;
  handleLogout: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  techCount,
  worksCount,
  blogsCount,
  inboxCount,
  handleLogout,
}: AdminSidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-white border-r-2 border-[#0f172a] p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-[#60a5fa] border border-[#0f172a] text-[#0f172a] flex items-center justify-center font-bold shadow-xs">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-black text-lg text-[#0f172a]">Admin Control</h2>
            <a href="/" className="text-xs text-[#2563eb] font-bold hover:underline">
              หน้าหลักเว็บ →
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          <button
            onClick={() => setActiveTab("hero")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "hero" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            <User className="w-4 h-4 text-[#60a5fa]" /> Hero Section
          </button>
          <button
            onClick={() => setActiveTab("aboutme")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "aboutme" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            <Settings className="w-4 h-4 text-[#60a5fa]" /> About Me
          </button>
          <button
            onClick={() => setActiveTab("techstack")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "techstack" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            <Code className="w-4 h-4 text-[#60a5fa]" /> Tech Stack ({techCount})
          </button>
          <button
            onClick={() => setActiveTab("works")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "works" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#60a5fa]" /> Portfolio Works ({worksCount})
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "blogs" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            <FileText className="w-4 h-4 text-[#60a5fa]" /> Blog Posts ({blogsCount})
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "contact" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            <Mail className="w-4 h-4 text-[#60a5fa]" /> Contact & Socials
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "inbox" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#60a5fa]" /> Inbox ({inboxCount})
          </button>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors mt-6"
      >
        <LogOut className="w-4 h-4" /> ออกจากระบบ
      </button>
    </aside>
  );
}

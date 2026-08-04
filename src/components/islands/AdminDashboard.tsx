import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Settings,
  FileText,
  Code,
  Briefcase,
  Mail,
  LogOut,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  KeyRound,
  ArrowLeft,
  Globe,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import {
  getHeroData,
  getAboutMeData,
  getTechStackData,
  getWorksData,
  getContactData,
  getBlogPosts,
} from "../../lib/data";

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "hero" | "aboutme" | "techstack" | "works" | "blogs" | "contact" | "inbox"
  >("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Form states
  const [heroData, setHeroData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [techData, setTechData] = useState<any[]>([]);
  const [worksData, setWorksData] = useState<any[]>([]);
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [contactData, setContactData] = useState<any>(null);
  const [inboxData, setInboxData] = useState<any[]>([]);

  useEffect(() => {
    const authSession = sessionStorage.getItem("admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const loadAllData = async () => {
    try {
      const [h, a, t, w, c, b] = await Promise.all([
        getHeroData(),
        getAboutMeData(),
        getTechStackData(),
        getWorksData(),
        getContactData(),
        getBlogPosts(),
      ]);

      if (h) setHeroData(h);
      if (a) setAboutData(a);
      if (t) setTechData(t);
      if (w) setWorksData(w);
      if (c) setContactData(c);
      if (b) setBlogsData(b);

      if (isSupabaseConfigured()) {
        const { data: inbox } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
        if (inbox) setInboxData(inbox);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" || password === "tonnam1234") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError("");
      loadAllData();
    } else {
      setLoginError("รหัสผ่านไม่ถูกต้อง (ลอง admin123 หรือ tonnam1234)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const showNotification = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Save Handlers
  const saveHero = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("hero").upsert({ ...heroData });
        if (error) throw error;
      }
      showNotification("success", "บันทึกข้อมูล Hero Section เรียบร้อยแล้ว!");
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const saveAboutMe = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("about_me").upsert({ ...aboutData });
        if (error) throw error;
      }
      showNotification("success", "บันทึกข้อมูล About Me เรียบร้อยแล้ว!");
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const saveTechStack = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("tech_stack").upsert(techData);
        if (error) throw error;
      }
      showNotification("success", "บันทึกข้อมูล Tech Stack เรียบร้อยแล้ว!");
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const saveWorks = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("works").upsert(worksData);
        if (error) throw error;
      }
      showNotification("success", "บันทึกข้อมูล Portfolio Works เรียบร้อยแล้ว!");
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const saveBlogs = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("blog").upsert(blogsData);
        if (error) throw error;
      }
      showNotification("success", "บันทึกข้อมูล Blog Posts เรียบร้อยแล้ว!");
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const saveContact = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from("contact").upsert({ ...contactData });
        if (error) throw error;
      }
      showNotification("success", "บันทึกข้อมูล Contact เรียบร้อยแล้ว!");
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="card-paper p-8 max-w-md w-full bg-white border-1.5 border-[#0f172a] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#60a5fa] border border-[#0f172a] text-[#0f172a] flex items-center justify-center mx-auto shadow-xs">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black font-display text-[#0f172a]">Admin Access</h1>
            <p className="text-xs text-[#475569]">เข้าสู่ระบบจัดการฐานข้อมูล Supabase</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0f172a] mb-1">รหัสผ่านเข้าใช้งาน (Passcode)</label>
              <input
                type="password"
                required
                placeholder="กรอกรหัสผ่าน (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-[#0f172a] text-xs font-semibold focus:outline-none focus:bg-white"
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {loginError}
              </p>
            )}

            <button type="submit" className="btn-pop w-full py-3 text-xs uppercase tracking-wider">
              เข้าสู่ระบบ Admin
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 text-center">
            <a href="/" className="text-xs font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> กลับไปยังหน้าเว็บไซต์
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[#0f172a] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
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
              <Code className="w-4 h-4 text-[#60a5fa]" /> Tech Stack ({techData.length})
            </button>
            <button
              onClick={() => setActiveTab("works")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "works" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#60a5fa]" /> Portfolio Works ({worksData.length})
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "blogs" ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-slate-100"
              }`}
            >
              <FileText className="w-4 h-4 text-[#60a5fa]" /> Blog Posts ({blogsData.length})
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
              <MessageSquare className="w-4 h-4 text-[#60a5fa]" /> Inbox ({inboxData.length})
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

      {/* Main Form Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-5xl">
        {message && (
          <div
            className={`p-4 rounded-xl mb-6 border font-bold text-xs flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-rose-50 text-rose-800 border-rose-300"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        {/* HERO EDITOR TAB */}
        {activeTab === "hero" && heroData && (
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
            </div>
          </div>
        )}

        {/* ABOUT ME TAB */}
        {activeTab === "aboutme" && aboutData && (
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
        )}

        {/* TECH STACK EDITOR TAB */}
        {activeTab === "techstack" && (
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
        )}

        {/* WORKS EDITOR TAB */}
        {activeTab === "works" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black font-display text-[#0f172a]">Portfolio Works Editor</h1>
                <p className="text-xs text-[#475569]">เพิ่มและแก้ไขโปรเจกต์ผลงาน ({worksData.length} รายการ)</p>
              </div>
              <button onClick={saveWorks} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
                <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกโปรเจกต์"}
              </button>
            </div>

            <div className="space-y-4">
              {worksData.map((work, idx) => (
                <div key={idx} className="card-paper p-5 bg-white border-1.5 border-[#0f172a] space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-[#2563eb]">Project #{idx + 1}</span>
                    <button
                      onClick={() => setWorksData(worksData.filter((_, i) => i !== idx))}
                      className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> ลบโปรเจกต์
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="ชื่อโปรเจกต์"
                      value={work.title}
                      onChange={(e) => {
                        const updated = [...worksData];
                        updated[idx].title = e.target.value;
                        setWorksData(updated);
                      }}
                      className="px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="คำอธิบายสั้นๆ"
                      value={work.description}
                      onChange={(e) => {
                        const updated = [...worksData];
                        updated[idx].description = e.target.value;
                        setWorksData(updated);
                      }}
                      className="px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-semibold"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setWorksData([
                    ...worksData,
                    { id: Date.now(), title: "ใหม่ โปรเจกต์", description: "รายละเอียด", image: "https://theijon.online/images/tonnam.png", year: "2026", size: "large", tags: [], links: [] },
                  ])
                }
                className="w-full py-3 border-2 border-dashed border-[#0f172a] rounded-xl text-xs font-bold text-[#0f172a] hover:bg-slate-100 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> เพิ่มโปรเจกต์ใหม่
              </button>
            </div>
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black font-display text-[#0f172a]">Blog Posts Editor</h1>
                <p className="text-xs text-[#475569]">จัดการบทความและโพสต์ ({blogsData.length} บทความ)</p>
              </div>
              <button onClick={saveBlogs} disabled={saving} className="btn-pop px-5 py-2.5 text-xs inline-flex items-center gap-2">
                <Save className="w-4 h-4" /> {saving ? "กำลังบันทึก..." : "บันทึกบทความ"}
              </button>
            </div>

            <div className="space-y-4">
              {blogsData.map((blog, idx) => (
                <div key={idx} className="card-paper p-5 bg-white border-1.5 border-[#0f172a] space-y-3">
                  <input
                    type="text"
                    placeholder="หัวข้อบทความ"
                    value={blog.title}
                    onChange={(e) => {
                      const updated = [...blogsData];
                      updated[idx].title = e.target.value;
                      setBlogsData(updated);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-bold"
                  />
                  <textarea
                    rows={3}
                    placeholder="เนื้อหาบทความ"
                    value={blog.content}
                    onChange={(e) => {
                      const updated = [...blogsData];
                      updated[idx].content = e.target.value;
                      setBlogsData(updated);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-[#0f172a] text-xs font-medium resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT & SOCIALS TAB */}
        {activeTab === "contact" && contactData && (
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
        )}

        {/* INBOX TAB */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black font-display text-[#0f172a]">Inbox Messages</h1>
              <p className="text-xs text-[#475569]">ข้อความติดต่อที่ส่งมาจากผู้เยี่ยมชมเว็บไซต์ ({inboxData.length} ข้อความ)</p>
            </div>

            <div className="space-y-3">
              {inboxData.length === 0 ? (
                <div className="card-paper p-8 text-center text-xs font-bold text-[#475569] bg-white">
                  ยังไม่มีข้อความใหม่ใน Inbox
                </div>
              ) : (
                inboxData.map((msg, idx) => (
                  <div key={idx} className="card-paper p-4 bg-white border-1.5 border-[#0f172a] space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-[#0f172a]">{msg.name} ({msg.email})</h4>
                      <span className="text-[10px] text-[#475569]">{msg.created_at || "เพิ่งส่งเมื่อครู่"}</span>
                    </div>
                    <p className="text-xs text-[#475569]">{msg.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

import { AdminLogin } from "./admin/AdminLogin";
import { AdminSidebar, type AdminTab } from "./admin/AdminSidebar";
import { HeroEditor } from "./admin/HeroEditor";
import { AboutMeEditor } from "./admin/AboutMeEditor";
import { TechStackEditor } from "./admin/TechStackEditor";
import { WorksEditor } from "./admin/WorksEditor";
import { BlogsEditor } from "./admin/BlogsEditor";
import { ContactEditor } from "./admin/ContactEditor";
import { InboxViewer } from "./admin/InboxViewer";

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<AdminTab>("hero");
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
      const res = await fetch("/api/admin");
      if (!res.ok) throw new Error("Failed to load admin data");
      const data = await res.json();

      if (data.hero) setHeroData(data.hero);
      if (data.aboutMe) setAboutData(data.aboutMe);
      if (data.techStack) setTechData(data.techStack);
      if (data.works) setWorksData(data.works);
      if (data.contact) setContactData(data.contact);
      if (data.blogs) setBlogsData(data.blogs);
      if (data.messages) setInboxData(data.messages);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      password ===
      "ชื่อของฉันคือ เอเลน เยเกอร์ กำลังสื่อสารถึงลูกหลานของยูมีร์ทุกคนผ่านพลังของไททันบรรพบุรุษพลังในการแข็งตัวของกำแพงทั้งหมดบนเกาะพาราดีได้ถูกคลายออกแล้วและไททันทุกตนที่ถูกฝังอยู่ข้างในก็ได้เริ่มก้าวเดินแล้วเป้าหมายของฉันคือการปกป้องผู้คนบนเกาะพาราดีที่ฉันได้เกิดและเติบโตขึ้นมาแต่ทว่าทั้งโลกนั้นกลับปรารถนาให้ผู้คนบนเกาะพาราดีต้องตายไม่ใช่แค่คนบนเกาะนี้เท่านั้นแต่พวกมันจะไม่หยุดจนกว่าลูกหลานของยูมีร์จะถูกฆ่าจนหมดฉันจะหยุดความปรารถนานั้นซะไททันในกำแพงจะเหยียบย่ำธรณีทั่วผืนปฐพีนอกเกาะนี้จนกว่าทุกชีวิตบนนั้น จะถูกสังหารสิ้นไปจากโลกนี้"
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError("");
      loadAllData();
    } else {
      setLoginError("invaild");
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

  const saveAction = async (action: string, payload: any, successMsg: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, payload }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to save");

      showNotification("success", successMsg);
      await loadAllData();
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/" }),
      });
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Save Handlers
  const saveHero = () => saveAction("save_hero", heroData, "บันทึกข้อมูล Hero Section ใน D1 เรียบร้อยแล้ว!");
  const saveAboutMe = () => saveAction("save_about", aboutData, "บันทึกข้อมูล About Me ใน D1 เรียบร้อยแล้ว!");
  const saveTechStack = () => saveAction("save_tech", techData, "บันทึกข้อมูล Tech Stack ใน D1 เรียบร้อยแล้ว!");
  const saveWorks = () => saveAction("save_works", worksData, "บันทึกข้อมูล Portfolio Works ใน D1 เรียบร้อยแล้ว!");
  const saveBlogs = () => saveAction("save_blogs", blogsData, "บันทึกข้อมูล Blog Posts ใน D1 เรียบร้อยแล้ว!");
  const saveContact = () => saveAction("save_contact", contactData, "บันทึกข้อมูล Contact ใน D1 เรียบร้อยแล้ว!");

  if (!isAuthenticated) {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[#0f172a] flex flex-col md:flex-row">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        techCount={techData.length}
        worksCount={worksData.length}
        blogsCount={blogsData.length}
        inboxCount={inboxData.length}
        handleLogout={handleLogout}
      />

      <main className="flex-1 p-6 sm:p-10 max-w-5xl">
        {message && (
          <div
            className={`p-4 rounded-xl mb-6 border font-bold text-xs flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        {/* Tab 1: Hero */}
        {activeTab === "hero" && (
          <HeroEditor heroData={heroData} setHeroData={setHeroData} saving={saving} saveHero={saveHero} />
        )}

        {/* Tab 2: About Me */}
        {activeTab === "aboutme" && (
          <AboutMeEditor aboutData={aboutData} setAboutData={setAboutData} saving={saving} saveAboutMe={saveAboutMe} />
        )}

        {/* Tab 3: Tech Stack */}
        {activeTab === "techstack" && (
          <TechStackEditor techData={techData} setTechData={setTechData} saving={saving} saveTechStack={saveTechStack} />
        )}

        {/* Tab 4: Works */}
        {activeTab === "works" && (
          <WorksEditor worksData={worksData} setWorksData={setWorksData} saving={saving} saveWorks={saveWorks} />
        )}

        {/* Tab 5: Blogs */}
        {activeTab === "blogs" && (
          <BlogsEditor blogsData={blogsData} setBlogsData={setBlogsData} saving={saving} saveBlogs={saveBlogs} />
        )}

        {/* Tab 6: Contact */}
        {activeTab === "contact" && (
          <ContactEditor contactData={contactData} setContactData={setContactData} saving={saving} saveContact={saveContact} />
        )}

        {/* Tab 7: Inbox */}
        {activeTab === "inbox" && <InboxViewer inboxData={inboxData} />}
      </main>
    </div>
  );
}

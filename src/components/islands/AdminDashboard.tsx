import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import {
  getHeroData,
  getAboutMeData,
  getTechStackData,
  getWorksData,
  getContactData,
  getBlogPosts,
} from "../../lib/data";

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
    if (password === "ชื่อของฉันคือ เอเลน เยเกอร์ กำลังสื่อสารถึงลูกหลานของยูมีร์ทุกคนผ่านพลังของไททันบรรพบุรุษพลังในการแข็งตัวของกำแพงทั้งหมดบนเกาะพาราดีได้ถูกคลายออกแล้วและไททันทุกตนที่ถูกฝังอยู่ข้างในก็ได้เริ่มก้าวเดินแล้วเป้าหมายของฉันคือการปกป้องผู้คนบนเกาะพาราดีที่ฉันได้เกิดและเติบโตขึ้นมาแต่ทว่าทั้งโลกนั้นกลับปรารถนาให้ผู้คนบนเกาะพาราดีต้องตายไม่ใช่แค่คนบนเกาะนี้เท่านั้นแต่พวกมันจะไม่หยุดจนกว่าลูกหลานของยูมีร์จะถูกฆ่าจนหมดฉันจะหยุดความปรารถนานั้นซะไททันในกำแพงจะเหยียบย่ำธรณีทั่วผืนปฐพีนอกเกาะนี้จนกว่าทุกชีวิตบนนั้น จะถูกสังหารสิ้นไปจากโลกนี้") {
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

  const notifyRevalidate = async (key?: string) => {
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
    } catch (e) {
      console.error("Revalidate failed", e);
    }
  };

  // Save Handlers
  const saveHero = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        const { id, displayName, display_name, firstName, first_name, lastName, last_name, profileImage, profile_image, birthDate, birth_date, startDate, start_date, ...rest } = heroData || {};

        const snakePayload: any = {
          ...rest,
          display_name: displayName || display_name || "",
          first_name: firstName || first_name || "",
          last_name: lastName || last_name || "",
          profile_image: profileImage || profile_image || "",
          birth_date: birthDate || birth_date || "",
          start_date: startDate || start_date || "",
        };

        const camelPayload: any = {
          ...rest,
          displayName: displayName || display_name || "",
          firstName: firstName || first_name || "",
          lastName: lastName || last_name || "",
          profileImage: profileImage || profile_image || "",
          birthDate: birthDate || birth_date || "",
          startDate: startDate || start_date || "",
        };

        if (id && typeof id === "number" && id < 1000000000) {
          const { error } = await supabase.from("hero").update(snakePayload).eq("id", id);
          if (error) {
            const { error: err2 } = await supabase.from("hero").update(camelPayload).eq("id", id);
            if (err2) throw error;
          }
        } else {
          const { error } = await supabase.from("hero").insert(snakePayload);
          if (error) {
            const { error: err2 } = await supabase.from("hero").insert(camelPayload);
            if (err2) throw error;
          }
        }
      }
      showNotification("success", "บันทึกข้อมูล Hero Section เรียบร้อยแล้ว!");
      await loadAllData();
      await notifyRevalidate("hero");
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
        const { id, fullName, full_name, statusLink, status_link, ...rest } = aboutData || {};
        const snakePayload: any = {
          ...rest,
          full_name: fullName || full_name || "",
          status_link: statusLink || status_link || null,
        };
        const camelPayload: any = {
          ...rest,
          fullName: fullName || full_name || "",
          statusLink: statusLink || status_link || null,
        };

        if (id && typeof id === "number" && id < 1000000000) {
          const { error } = await supabase.from("about_me").update(snakePayload).eq("id", id);
          if (error) {
            const { error: err2 } = await supabase.from("about_me").update(camelPayload).eq("id", id);
            if (err2) throw error;
          }
        } else {
          const { error } = await supabase.from("about_me").insert(snakePayload);
          if (error) {
            const { error: err2 } = await supabase.from("about_me").insert(camelPayload);
            if (err2) throw error;
          }
        }
      }
      showNotification("success", "บันทึกข้อมูล About Me เรียบร้อยแล้ว!");
      await loadAllData();
      await notifyRevalidate("about_me");
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
        for (const cat of techData) {
          const { id, ...payload } = cat;
          if (id && typeof id === "number" && id < 1000000000) {
            const { error } = await supabase.from("tech_stack").update(payload).eq("id", id);
            if (error) throw error;
          } else {
            const { error } = await supabase.from("tech_stack").insert(payload);
            if (error) throw error;
          }
        }
      }
      showNotification("success", "บันทึกข้อมูล Tech Stack เรียบร้อยแล้ว!");
      await loadAllData();
      await notifyRevalidate("tech_stack");
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
        for (const work of worksData) {
          const { url, id, ...cleanWork } = work;
          const projectUrl = url || (cleanWork.links && cleanWork.links[0]?.url) || "";
          const payload: any = {
            ...cleanWork,
            links: projectUrl ? [{ url: projectUrl, type: "website" }] : cleanWork.links || [],
          };

          if (id && typeof id === "number" && id < 1000000000) {
            const { error } = await supabase.from("works").update(payload).eq("id", id);
            if (error) {
              const { error: insErr } = await supabase.from("works").insert(payload);
              if (insErr) throw insErr;
            }
          } else {
            const { error } = await supabase.from("works").insert(payload);
            if (error) throw error;
          }
        }
      }
      showNotification("success", "บันทึกข้อมูล Portfolio Works เรียบร้อยแล้ว!");
      await loadAllData();
      await notifyRevalidate("works");
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
        for (const blog of blogsData) {
          const { id, ...payload } = blog;
          if (id && typeof id === "number" && id < 1000000000) {
            const { error } = await supabase.from("blog").update(payload).eq("id", id);
            if (error) {
              const { error: insErr } = await supabase.from("blog").insert(payload);
              if (insErr) throw insErr;
            }
          } else {
            const { error } = await supabase.from("blog").insert(payload);
            if (error) throw error;
          }
        }
      }
      showNotification("success", "บันทึกข้อมูล Blog Posts เรียบร้อยแล้ว!");
      await loadAllData();
      await notifyRevalidate();
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
        const { id, ...payload } = contactData || {};
        if (id && typeof id === "number" && id < 1000000000) {
          const { error } = await supabase.from("contact").update(payload).eq("id", id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("contact").insert(payload);
          if (error) throw error;
        }
      }
      showNotification("success", "บันทึกข้อมูล Contact เรียบร้อยแล้ว!");
      await loadAllData();
      await notifyRevalidate("contact");
    } catch (err: any) {
      showNotification("error", `เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

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
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-rose-50 text-rose-800 border-rose-300"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        {activeTab === "hero" && (
          <HeroEditor
            heroData={heroData}
            setHeroData={setHeroData}
            saveHero={saveHero}
            saving={saving}
          />
        )}

        {activeTab === "aboutme" && (
          <AboutMeEditor
            aboutData={aboutData}
            setAboutData={setAboutData}
            saveAboutMe={saveAboutMe}
            saving={saving}
          />
        )}

        {activeTab === "techstack" && (
          <TechStackEditor
            techData={techData}
            setTechData={setTechData}
            saveTechStack={saveTechStack}
            saving={saving}
          />
        )}

        {activeTab === "works" && (
          <WorksEditor
            worksData={worksData}
            setWorksData={setWorksData}
            saveWorks={saveWorks}
            saving={saving}
          />
        )}

        {activeTab === "blogs" && (
          <BlogsEditor
            blogsData={blogsData}
            setBlogsData={setBlogsData}
            saveBlogs={saveBlogs}
            saving={saving}
          />
        )}

        {activeTab === "contact" && (
          <ContactEditor
            contactData={contactData}
            setContactData={setContactData}
            saveContact={saveContact}
            saving={saving}
          />
        )}

        {activeTab === "inbox" && (
          <InboxViewer inboxData={inboxData} />
        )}
      </main>
    </div>
  );
}

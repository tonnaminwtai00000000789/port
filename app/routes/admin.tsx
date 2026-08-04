import * as Tabs from "@radix-ui/react-tabs";
import { User, Settings, FileText, Code, Briefcase, LayoutDashboard, ChevronRight, Mail, MessageSquare, LogOut } from "lucide-react";
import { HeroEditor } from "../components/admin/HeroEditor";
import { AboutMeEditor } from "../components/admin/AboutMeEditor";
import { BlogsEditor } from "../components/admin/BlogsEditor";
import { TechStackEditor } from "../components/admin/TechStackEditor";
import { WorksEditor } from "../components/admin/WorksEditor";
import { ContactEditor } from "../components/admin/ContactEditor";
import { InboxEditor } from "../components/admin/InboxEditor";
import { LoginForm } from "../components/admin/LoginForm";
import { getApiUrl } from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/admin";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const apiUrl = getApiUrl("/auth/me", request);
        const response = await fetch(apiUrl, {
            credentials: "include",
            headers: {
                Cookie: request.headers.get("Cookie") || "",
            },
        });

        const data = await response.json();
        return { authenticated: data.authenticated || false };
    } catch (error) {
        return { authenticated: false };
    }
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(loaderData?.authenticated || false);
    const [isChecking, setIsChecking] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Use loader data initially, then check on client side for real-time updates
        if (loaderData?.authenticated !== undefined) {
            setIsAuthenticated(loaderData.authenticated);
            setIsChecking(false);
        } else {
            // Fallback: check authentication status on mount if loader data is not available
            setIsChecking(true);
            const checkAuth = async () => {
                try {
                    const response = await fetch(getApiUrl("/auth/me"), {
                        credentials: "include",
                    });
                    const data = await response.json();
                    setIsAuthenticated(data.authenticated || false);
                } catch (error) {
                    setIsAuthenticated(false);
                } finally {
                    setIsChecking(false);
                }
            };
            checkAuth();
        }
    }, [loaderData]);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        try {
            await fetch(getApiUrl("/auth/logout"), {
                method: "POST",
                credentials: "include",
            });
            setIsAuthenticated(false);
            toast.success("ออกจากระบบสำเร็จ");
            navigate("/");
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
        }
    };

    if (isChecking) {
        return (
            <div className="min-h-screen bg-dark-bg text-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">กำลังตรวจสอบ...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginForm onLoginSuccess={handleLoginSuccess} />;
    }
    return (
        <div className="min-h-screen bg-dark-bg text-gray-200 flex flex-col md:flex-row font-sans selection:bg-primary selection:text-white">
            {/* Mobile Header (simplified) */}
            <div className="md:hidden p-4 border-b border-dark-border flex justify-between items-center bg-dark-card sticky top-0 z-50">
                <h1 className="font-bold text-white flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-primary" /> Admin</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleLogout}
                        className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                        <LogOut className="w-3 h-3" />
                        ออกจากระบบ
                    </button>
                    <a href="/" className="text-xs text-gray-400 hover:text-white">Exit</a>
                </div>
            </div>

            <Tabs.Root defaultValue="hero" orientation="vertical" className="flex flex-col md:flex-row w-full flex-1">
                {/* Sidebar */}
                <Tabs.List className="w-full md:w-64 bg-dark-card border-r border-dark-border md:fixed md:h-screen p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible z-40 shrink-0">
                    <div className="hidden md:flex flex-col gap-4 px-4 py-6 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/20">
                                <LayoutDashboard className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg text-white leading-tight tracking-tight">Admin</h1>
                                <a href="/" className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-1 group">Back to Website <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></a>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>ออกจากระบบ</span>
                        </button>
                    </div>

                    <TabTrigger value="hero" icon={User} label="Hero Section" />
                    <TabTrigger value="inbox" icon={MessageSquare} label="Inbox" />
                    <TabTrigger value="aboutme" icon={Settings} label="About Me" />
                    <TabTrigger value="blogs" icon={FileText} label="Blog Posts" />
                    <TabTrigger value="techstack" icon={Code} label="Tech Stack" />
                    <TabTrigger value="works" icon={Briefcase} label="Portfolio" />
                    <TabTrigger value="contact" icon={Mail} label="Contact" />
                </Tabs.List>

                {/* Content Area */}
                <div className="flex-1 p-4 md:p-10 md:pl-72 w-full max-w-7xl mx-auto">
                    <Tabs.Content value="hero" className="outline-none animate-fade-in focus:outline-none">
                        <SectionHeader title="Hero Section" description="Manage your main intro, profile image, and current positions." />
                        <HeroEditor />
                    </Tabs.Content>
                    <Tabs.Content value="inbox" className="outline-none animate-fade-in focus:outline-none">
                        <SectionHeader title="Inbox" description="View and manage messages from your website visitors." />
                        <InboxEditor />
                    </Tabs.Content>
                    <Tabs.Content value="aboutme" className="outline-none animate-fade-in focus:outline-none">
                        <SectionHeader title="About Me" description="Update your personal details, stats, and fun facts." />
                        <AboutMeEditor />
                    </Tabs.Content>
                    <Tabs.Content value="blogs" className="outline-none animate-fade-in focus:outline-none">
                        <SectionHeader title="Blog Posts" description="Write and manage your articles." />
                        <BlogsEditor />
                    </Tabs.Content>
                    <Tabs.Content value="techstack" className="outline-none animate-fade-in focus:outline-none">
                        <SectionHeader title="Tech Stack" description="Showcase your tools and technologies." />
                        <TechStackEditor />
                    </Tabs.Content>
                    <Tabs.Content value="works" className="outline-none animate-fade-in focus:outline-none">
                        <SectionHeader title="Portfolio Works" description="Manage your projects and case studies." />
                        <WorksEditor />
                    </Tabs.Content>
                    <Tabs.Content value="contact" className="outline-none animate-fade-in focus:outline-none">
                        <SectionHeader title="Contact" description="Manage your contact information and social links." />
                        <ContactEditor />
                    </Tabs.Content>
                </div>
            </Tabs.Root>
        </div>
    );
}

function TabTrigger({ value, icon: Icon, label }: { value: string; icon: any; label: string }) {
    return (
        <Tabs.Trigger
            value={value}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 font-medium transition-all data-[state=active]:bg-dark-accent data-[state=active]:text-white data-[state=active]:border-l-4 data-[state=active]:border-primary hover:text-white hover:bg-dark-border/30 outline-none w-full md:w-auto justify-center md:justify-start whitespace-nowrap border-l-4 border-transparent"
        >
            <Icon className="w-5 h-5 group-data-[state=active]:text-primary transition-colors" />
            <span className="hidden md:inline text-sm">{label}</span>
        </Tabs.Trigger>
    );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="mb-8 pb-6 border-b border-dark-border">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}

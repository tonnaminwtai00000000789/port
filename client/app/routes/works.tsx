import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Route } from "./+types/works";
import { getApiUrl } from "../utils/api";
import type { HeroData } from "../root/Hero";
import { data } from "react-router";

interface Work {
    id: number;
    title: string;
    description: string;
    image: string;
    year: string;
    tags: { label: string; url: string }[];
    links: { url: string; type: "website" | "external" }[];
}

const API_URL = "/api";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const [worksRes, heroRes] = await Promise.all([
            fetch(getApiUrl("/works", request)),
            fetch(getApiUrl("/hero", request))
        ]);

        if (!worksRes.ok) throw new Error("Failed to fetch works");
        if (!heroRes.ok) throw new Error("Failed to fetch hero");

        const works: Work[] = await worksRes.json();
        const hero: HeroData = await heroRes.json();

        return data({ works, hero }, {
            headers: {
                "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
            },
        });
    } catch (err) {
        console.error("Failed to fetch works or hero:", err);
        return data({ works: [], hero: null }, {
            headers: {
                "Cache-Control": "no-store",
            },
        });
    }
}

export function headers() {
    return {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    };
}

export function meta({ data }: Route.MetaArgs) {
    const hero = data?.hero;
    const displayName = hero?.displayName || "tonnaminwtai0000789";
    return [
        { title: `${displayName} | Projects` },
        { name: "description", content: "Check out my latest web development projects, open source contributions, and technical experiments." },
        { property: "og:title", content: `${displayName} | Projects` },
        { property: "og:type", content: "website" },
    ];
}

export default function Works({ loaderData }: Route.ComponentProps) {
    const { works } = loaderData;

    return (
        <div className="min-h-screen bg-dark-bg py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-20">
                    <a href="/" className="p-3 bg-dark-accent border border-dark-border rounded-full shadow hover:border-primary hover:text-primary transition-all text-gray-400">
                        <ArrowLeft className="w-6 h-6" />
                    </a>
                    <div>
                        <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-1">PROJECTS</h2>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Recent Projects</h1>
                    </div>
                </div>

                {/* Works Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {works.map((work: Work, index: number) => (
                        <div
                            key={work.id}
                            className="group bg-dark-card border border-dark-border rounded-[32px] overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] relative"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    loading={index < 2 ? "eager" : "lazy"}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-90" />

                                <div className="absolute top-4 right-4">
                                    <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-mono px-3 py-1 rounded-full">
                                        {work.year}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow relative z-10">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{work.title}</h2>
                                    <p className="text-gray-400 font-light leading-relaxed mb-4">{work.description}</p>

                                    {work.tags && work.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {work.tags.map((tag, idx) => (
                                                <span key={idx} className="text-xs px-3 py-1 bg-dark-accent border border-dark-border rounded-full text-gray-300">
                                                    {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto flex gap-3 pt-4 border-t border-dark-border">
                                    {work.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-5 py-2.5 bg-dark-accent border border-dark-border rounded-xl text-sm font-medium text-white hover:bg-primary hover:border-primary transition-all flex items-center gap-2"
                                        >
                                            {link.type === 'website' ? <ExternalLink className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                                            {link.type === 'website' ? 'View Site' : 'View Code'}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {works.length === 0 && (
                    <div className="text-center py-20 bg-dark-card rounded-[32px] border border-dark-border">
                        <p className="text-xl text-gray-500">No works found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

import { ArrowLeft, Clock } from "lucide-react";
import type { Route } from "./+types/blogs";
import { getApiUrl } from "../utils/api";
import { data } from "react-router";

interface Blog {
    id: number;
    title: string;
    slug: string;
    image: string;
    date: string;
    published: boolean;
}

const API_URL = "/api";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const res = await fetch(getApiUrl("/blogs", request));
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const blogs: Blog[] = await res.json();
        return data({ blogs }, {
            headers: {
                "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
            },
        });
    } catch (err) {
        console.error(err);
        return data({ blogs: [] }, {
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

export function meta() {
    return [
        { title: "tonnaminwtai0000789 | Blog" },
        { name: "description", content: "Explore a collection of articles, tutorials, and thoughts on software development and design." },
        { property: "og:title", content: "Personal Blog | My Writings" },
        { property: "og:type", content: "website" },
    ];
}

export default function Blogs({ loaderData }: Route.ComponentProps) {
    const { blogs } = loaderData;

    return (
        <div className="min-h-screen bg-dark-bg py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-16">
                    <a href="/" className="p-3 bg-dark-accent border border-dark-border rounded-full shadow hover:border-primary hover:text-primary transition-all text-gray-400">
                        <ArrowLeft className="w-6 h-6" />
                    </a>
                    <div>
                        <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-1">WRITINGS</h2>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">All Blogs</h1>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog: Blog, index: number) => (
                        <a
                            key={blog.id}
                            href={`/blogs/${blog.slug}`}
                            className="group bg-dark-card border border-dark-border rounded-[32px] overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                        >
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    loading={index < 2 ? "eager" : "lazy"}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-90" />

                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-primary" /> {blog.date}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                    {blog.title}
                                </h2>

                                <div className="mt-auto pt-6 flex items-center text-primary font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    Read Article
                                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {blogs.length === 0 && (
                    <div className="text-center py-20 bg-dark-card rounded-[32px] border border-dark-border">
                        <p className="text-xl text-gray-500">No blogs found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

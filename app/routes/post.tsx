import { Newspaper, ChevronRight, ArrowLeft, Clock } from "lucide-react";
import type { Route } from "./+types/post";
import type { Blog } from "../root/Blogs";
import { getApiUrl } from "../utils/api";
import { data } from "react-router";

const API_URL = "/api";

export async function loader({ params, request }: Route.LoaderArgs) {
    const { slug } = params;
    try {
        const res = await fetch(getApiUrl(`/blogs/slug/${slug}`, request));
        if (!res.ok) {
            throw new Response("Blog post not found", { status: 404 });
        }
        const post: Blog = await res.json();
        const headers: Record<string, string> = {
            "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
        };

        if (post.image) {
            headers["Link"] = `<${post.image}>; rel=preload; as=image`;
        }

        return data({ post }, { headers });
    } catch (err) {
        if (err instanceof Response) throw err;
        console.error("Error loading blog post:", err);
        throw new Response("Internal Server Error", { status: 500 });
    }
}

export function headers() {
    return {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    };
}

export function meta({ data }: Route.MetaArgs) {
    const post = data?.post;
    if (!post) {
        return [{ title: "Blog Post Not Found" }];
    }

    const description = post.content?.substring(0, 160).replace(/[#*`]/g, '') || "Read this article on my portfolio.";

    return [
        { title: `${post.title} | Blog` },
        { name: "description", content: description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:image", content: post.image },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
    ];
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
    const { post } = loaderData;

    return (
        <div className="min-h-screen bg-dark-bg text-gray-200">
            {/* Blog Header Image */}
            <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden group">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent"></div>

                {/* Navigation - Absolute over image */}
                <div className="absolute top-8 left-4 md:left-8 z-10">
                    <a href="/" className="flex items-center gap-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full backdrop-blur-md transition border border-white/10">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </a>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4 text-primary font-medium tracking-wide">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span>{post.date}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg tracking-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <article className="prose prose-lg md:prose-xl prose-invert max-w-none">
                    {/* Custom styling for content to match theme */}
                    <div className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed text-lg">
                        {post.content}
                    </div>
                </article>

                {/* Share / Footer */}
                <div className="mt-20 pt-10 border-t border-dark-border flex justify-between items-center">
                    <p className="text-gray-500">Thanks for reading!</p>
                    <a href="/blogs" className="text-primary hover:text-primary-hover font-medium hover:underline transition-colors">
                        Read more articles
                    </a>
                </div>
            </div>
        </div>
    );
}

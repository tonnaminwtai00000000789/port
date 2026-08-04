import { C as createAstro, g as addAttribute, h as renderHead, s as renderSlot, u as renderTemplate } from "./server_uVWWhcj-.mjs";
import { t as createComponent } from "./compiler_D7PGrtXv.mjs";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createClient } from "@supabase/supabase-js";
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "Tonnam | Developer Portfolio", description = "Personal developer portfolio featuring SSR with Astro, React Islands, and Supabase database." } = Astro.props;
	return renderTemplate`<html lang="en" class="dark scroll-smooth"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Devicon CDN for tech stack icons --><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">${renderHead($$result)}</head><body class="bg-[#030405] text-slate-100 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white"><div class="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none z-0"></div><div class="relative z-10 flex flex-col flex-grow">${renderSlot($$result, $$slots["default"])}</div></body></html>`;
}, "D:/client/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/islands/HeaderNav.tsx
function HeaderNav() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 glass backdrop-blur-md border-b border-slate-800/80 px-6 py-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto flex items-center justify-between",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "/",
					className: "flex items-center gap-2 group",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform",
						children: "T"
					}), /* @__PURE__ */ jsxs("span", {
						className: "font-bold text-lg text-white tracking-wide group-hover:text-indigo-400 transition-colors",
						children: ["Tonnam", /* @__PURE__ */ jsx("span", {
							className: "text-indigo-500",
							children: ".dev"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "hidden md:flex items-center gap-8 text-sm font-medium text-slate-300",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "/#about",
							className: "hover:text-indigo-400 transition-colors",
							children: "About"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/#skills",
							className: "hover:text-indigo-400 transition-colors",
							children: "Tech Stack"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/#contact",
							className: "hover:text-indigo-400 transition-colors",
							children: "Contact"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/blog",
							className: "hover:text-indigo-400 transition-colors",
							children: "Blog"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "https://webring.wonderful.software#nsys.site",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all text-xs font-semibold",
							children: "Webring 🌐"
						})
					]
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: () => setMobileMenuOpen(!mobileMenuOpen),
					className: "md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none",
					"aria-label": "Toggle menu",
					children: /* @__PURE__ */ jsx("svg", {
						className: "w-6 h-6",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: mobileMenuOpen ? /* @__PURE__ */ jsx("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: "2",
							d: "M6 18L18 6M6 6l12 12"
						}) : /* @__PURE__ */ jsx("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: "2",
							d: "M4 6h16M4 12h16M4 18h16"
						})
					})
				})
			]
		}), mobileMenuOpen && /* @__PURE__ */ jsxs("div", {
			className: "md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col gap-4 text-slate-300 text-sm animate-fade-in",
			children: [
				/* @__PURE__ */ jsx("a", {
					href: "/#about",
					onClick: () => setMobileMenuOpen(false),
					className: "hover:text-indigo-400",
					children: "About"
				}),
				/* @__PURE__ */ jsx("a", {
					href: "/#skills",
					onClick: () => setMobileMenuOpen(false),
					className: "hover:text-indigo-400",
					children: "Tech Stack"
				}),
				/* @__PURE__ */ jsx("a", {
					href: "/#contact",
					onClick: () => setMobileMenuOpen(false),
					className: "hover:text-indigo-400",
					children: "Contact"
				}),
				/* @__PURE__ */ jsx("a", {
					href: "/blog",
					onClick: () => setMobileMenuOpen(false),
					className: "hover:text-indigo-400",
					children: "Blog"
				}),
				/* @__PURE__ */ jsx("a", {
					href: "https://webring.wonderful.software#nsys.site",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-block w-fit px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold",
					children: "Webring 🌐"
				})
			]
		})]
	});
}
//#endregion
//#region src/lib/supabase.ts
var supabaseUrl = process.env.PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
var supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
var supabase = createClient(supabaseUrl, supabaseAnonKey);
//#endregion
//#region src/lib/data.ts
var DEFAULT_HERO = {
	id: 1,
	first_name: "Supakron",
	last_name: "Klinbubpa",
	display_name: "TonnamInwtai00789",
	nickname: "Tonnam",
	birth_date: "2011-03-03",
	start_date: "2021-01-01",
	location: "Bangbon, Bangkok",
	profile_image: "https://theijon.online/images/tonnam.png",
	emoji: "😪💤",
	webring_url: "https://webring.wonderful.software#nsys.site",
	positions: [{
		logo: "https://theijon.online/logo.jpg",
		since: "Since Jan 2025",
		title: "the founder of",
		organization: "The ijon",
		organizationUrl: "https://theijon.online/"
	}]
};
var DEFAULT_ABOUT = {
	id: 1,
	nickname: "Tonnam",
	status: "IDK",
	status_link: "https://www.pornhub.org/",
	full_name: "Supakron Klinbubpa",
	birthday: "Thursday, March 3, 2011",
	location: "Bangbon, Thailand",
	facts: [{
		type: "image",
		image: "https://swebtoon-phinf.pstatic.net/20210224_142/1614130186947iB8vd_JPEG/0M_details.jpg?type=crop540_540",
		title: "Manhwa",
		subtitle: "Passions"
	}, {
		type: "image",
		image: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/250px-KFC_logo.svg.png",
		title: "KFC",
		subtitle: "Favorite Food"
	}]
};
var DEFAULT_TECH = [{
	id: 1,
	category: "Frontend Frameworks",
	order: 1,
	technologies: [
		{
			icon: "devicon-react-original colored",
			name: "React"
		},
		{
			icon: "devicon-astro-plain colored",
			name: "Astro"
		},
		{
			icon: "devicon-tailwindcss-original colored",
			name: "Tailwind CSS"
		}
	]
}, {
	id: 2,
	category: "Languages & Runtimes",
	order: 2,
	technologies: [
		{
			icon: "devicon-typescript-plain colored",
			name: "TypeScript"
		},
		{
			icon: "devicon-javascript-plain colored",
			name: "JavaScript"
		},
		{
			icon: "devicon-bun-plain colored",
			name: "Bun"
		}
	]
}];
var DEFAULT_CONTACT = {
	id: 1,
	email: "zel.da.supakron@gmail.com",
	socials: [{
		url: "https://github.com/tonnaminwtai00000000789",
		icon: "devicon-github-original",
		platform: "GitHub",
		username: "tonnaminwtai00000000789"
	}, {
		url: "https://www.instagram.com/tonnaminwtai00000000789/",
		icon: "devicon-instagram-plain colored",
		platform: "Instagram",
		username: "tonnaminwtai00000000789"
	}]
};
var DEFAULT_BLOGS = [{
	id: 1,
	title: "Welcome to my Astro + Supabase portfolio",
	slug: "welcome",
	image: "https://tr.rbxcdn.com/180DAY-6a9f37f333452ee91542001faacf5e49/576/324/Image/Jpeg/noFilter",
	date: "2026-02-17",
	content: "Welcome to my new blog powered by Astro 5, React Islands, and Supabase!",
	published: true
}];
async function getHeroData() {
	if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
		const { data } = await supabase.from("hero").select("*").limit(1).single();
		if (data) return data;
	}
	return DEFAULT_HERO;
}
async function getAboutMeData() {
	if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
		const { data } = await supabase.from("about_me").select("*").limit(1).single();
		if (data) return data;
	}
	return DEFAULT_ABOUT;
}
async function getTechStackData() {
	if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
		const { data } = await supabase.from("tech_stack").select("*").order("order", { ascending: true });
		if (data && data.length) return data;
	}
	return DEFAULT_TECH;
}
async function getContactData() {
	if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
		const { data } = await supabase.from("contact").select("*").limit(1).single();
		if (data) return data;
	}
	return DEFAULT_CONTACT;
}
async function getBlogPosts() {
	if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
		const { data } = await supabase.from("blog").select("*").eq("published", true);
		if (data && data.length) return data;
	}
	return DEFAULT_BLOGS;
}
async function getBlogPostBySlug(slug) {
	if (process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
		const { data } = await supabase.from("blog").select("*").eq("slug", slug).single();
		if (data) return data;
	}
	return DEFAULT_BLOGS.find((p) => p.slug === slug) || null;
}
//#endregion
export { getHeroData as a, $$Layout as c, getContactData as i, getBlogPostBySlug as n, getTechStackData as o, getBlogPosts as r, HeaderNav as s, getAboutMeData as t };

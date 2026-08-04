import { C as createAstro, R as __exportAll, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_uVWWhcj-.mjs";
import { t as createComponent } from "./compiler_D7PGrtXv.mjs";
import { a as getHeroData, c as $$Layout, i as getContactData, o as getTechStackData, r as getBlogPosts, s as HeaderNav, t as getAboutMeData } from "./data_DC1-joQ6.mjs";
import { t as $$BlogCard } from "./BlogCard_D48ljGwo.mjs";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/static/HeroSection.astro
createAstro("https://astro.build");
var $$HeroSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeroSection;
	const { hero } = Astro.props;
	const positions = hero?.positions || [];
	return renderTemplate`${maybeRenderHead($$result)}<section className="relative py-20 md:py-28 overflow-hidden"><div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12"><!-- Left Column: Bio & Intro --><div class="flex-1 space-y-6 text-center md:text-left z-10"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>Available for software engineering & projects</div><h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">Hi, I'm <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">${hero?.nickname || "Tonnam"}</span> ${hero?.emoji || "😪💤"}</h1><p class="text-lg text-slate-300 max-w-xl leading-relaxed">Passionate developer building high-performance web applications using modern tech stacks. Focused on clean architecture, SSR, and rich user experiences.</p>${positions.length > 0 && renderTemplate`<div class="space-y-3 pt-2">${positions.map((pos) => renderTemplate`<div class="flex items-center gap-3 justify-center md:justify-start p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">${pos.logo && renderTemplate`<img${addAttribute(pos.logo, "src")}${addAttribute(pos.organization, "alt")} class="w-8 h-8 rounded-lg object-cover border border-slate-700/60">`}<div class="text-left text-xs"><p class="text-slate-200 font-medium">${pos.title} <a${addAttribute(pos.organizationUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">${pos.organization}</a></p><p class="text-slate-500">${pos.since}</p></div></div>`)}</div>`}<!-- CTA Buttons --><div class="flex flex-wrap gap-4 justify-center md:justify-start pt-4"><a href="#contact" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105">Get In Touch</a><a href="#skills" class="px-6 py-3 rounded-xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-sm transition-all">Explore Tech Stack</a></div></div><!-- Right Column: Profile Image --><div class="relative z-10 flex-shrink-0"><div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-2 glass-card animate-float"><img${addAttribute(hero?.profile_image || "https://theijon.online/images/tonnam.png", "src")}${addAttribute(hero?.display_name || "Tonnam", "alt")} class="w-full h-full rounded-2xl object-cover border border-slate-700/50 shadow-2xl"></div></div></div></section>`;
}, "D:/client/src/components/static/HeroSection.astro", void 0);
//#endregion
//#region src/components/islands/FactsCarousel.tsx
function FactsCarousel({ facts }) {
	const [activeIndex, setActiveIndex] = useState(0);
	if (!facts || facts.length === 0) return null;
	const activeFact = facts[activeIndex];
	return /* @__PURE__ */ jsxs("div", {
		className: "glass-card rounded-2xl p-6 relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold uppercase tracking-wider text-indigo-400",
					children: "Personal Highlights & Facts"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-1.5",
					children: facts.map((_, idx) => /* @__PURE__ */ jsx("button", {
						onClick: () => setActiveIndex(idx),
						className: `w-2.5 h-2.5 rounded-full transition-all ${activeIndex === idx ? "bg-indigo-500 w-6" : "bg-slate-700 hover:bg-slate-500"}`,
						"aria-label": `Fact ${idx + 1}`
					}, idx))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 transition-all",
				children: [activeFact.image && /* @__PURE__ */ jsx("img", {
					src: activeFact.image,
					alt: activeFact.title,
					className: "w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-slate-700/60 shadow-md flex-shrink-0"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex-1 text-center sm:text-left",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-2",
						children: activeFact.subtitle
					}), /* @__PURE__ */ jsx("h3", {
						className: "text-xl font-bold text-white mb-1",
						children: activeFact.title
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between items-center mt-4 pt-3 border-t border-slate-800/60",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveIndex((prev) => prev > 0 ? prev - 1 : facts.length - 1),
						className: "text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-800",
						children: "← Previous"
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "text-xs text-slate-500 font-mono",
						children: [
							activeIndex + 1,
							" / ",
							facts.length
						]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setActiveIndex((prev) => prev < facts.length - 1 ? prev + 1 : 0),
						className: "text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-800",
						children: "Next →"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/static/AboutSection.astro
createAstro("https://astro.build");
var $$AboutSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AboutSection;
	const { aboutMe } = Astro.props;
	const facts = aboutMe?.facts || [];
	return renderTemplate`${maybeRenderHead($$result)}<section id="about" class="py-20 border-t border-slate-800/60"><div class="max-w-6xl mx-auto px-6 space-y-12"><div class="text-center space-y-3"><h2 class="text-3xl font-extrabold text-white">About Me</h2><p class="text-slate-400 text-sm max-w-lg mx-auto">Key details and quick overview of my background.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"><!-- Profile Info Card --><div class="glass-card rounded-2xl p-6 space-y-4"><h3 class="text-xl font-bold text-white mb-2 pb-2 border-b border-slate-800">${aboutMe?.full_name || "Supakron Klinbubpa"}</h3><div class="space-y-3 text-sm"><div class="flex justify-between py-1 border-b border-slate-800/60"><span class="text-slate-400">Nickname:</span><span class="text-slate-200 font-medium">${aboutMe?.nickname || "Tonnam"}</span></div><div class="flex justify-between py-1 border-b border-slate-800/60"><span class="text-slate-400">Location:</span><span class="text-slate-200 font-medium">${aboutMe?.location || "Bangbon, Thailand"}</span></div><div class="flex justify-between py-1 border-b border-slate-800/60"><span class="text-slate-400">Birthday:</span><span class="text-slate-200 font-medium">${aboutMe?.birthday || "Thursday, March 3, 2011"}</span></div>${aboutMe?.status && renderTemplate`<div class="flex justify-between py-1"><span class="text-slate-400">Status:</span><a${addAttribute(aboutMe.status_link, "href")} target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline font-medium">${aboutMe.status} 🔗</a></div>`}</div></div><!-- React Island: Facts Carousel -->${facts.length > 0 && renderTemplate`${renderComponent($$result, "FactsCarousel", FactsCarousel, {
		"client:visible": true,
		"facts": facts,
		"client:component-hydration": "visible",
		"client:component-path": "D:/client/src/components/islands/FactsCarousel.tsx",
		"client:component-export": "FactsCarousel"
	})}`}</div></div></section>`;
}, "D:/client/src/components/static/AboutSection.astro", void 0);
//#endregion
//#region src/components/islands/TechStackTabs.tsx
function TechStackTabs({ techStack }) {
	const [activeCategory, setActiveCategory] = useState("All");
	if (!techStack || techStack.length === 0) return null;
	const categories = ["All", ...techStack.map((item) => item.category)];
	const filteredCategories = activeCategory === "All" ? techStack : techStack.filter((item) => item.category === activeCategory);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2 justify-center",
			children: categories.map((cat) => /* @__PURE__ */ jsx("button", {
				onClick: () => setActiveCategory(cat),
				className: `px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${activeCategory === cat ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105" : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"}`,
				children: cat
			}, cat))
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6",
			children: filteredCategories.map((group) => /* @__PURE__ */ jsxs("div", {
				className: "glass-card rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300",
				children: [/* @__PURE__ */ jsxs("h3", {
					className: "text-lg font-semibold text-slate-200 mb-4 pb-2 border-b border-slate-800/80 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", { children: group.category }), /* @__PURE__ */ jsxs("span", {
						className: "text-xs text-indigo-400 font-normal px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20",
						children: [group.technologies?.length || 0, " tools"]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
					children: group.technologies?.map((tech, idx) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700 transition-all group",
						children: [tech.icon && tech.icon.startsWith("http") ? /* @__PURE__ */ jsx("img", {
							src: tech.icon,
							alt: tech.name,
							className: "w-6 h-6 object-contain group-hover:scale-110 transition-transform"
						}) : tech.icon ? /* @__PURE__ */ jsx("i", { className: `${tech.icon} text-xl group-hover:scale-110 transition-transform` }) : /* @__PURE__ */ jsx("div", {
							className: "w-6 h-6 rounded bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs",
							children: tech.name[0]
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs font-medium text-slate-300 group-hover:text-white transition-colors truncate",
							children: tech.name
						})]
					}, idx))
				})]
			}, group.id || group.category))
		})]
	});
}
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const hero = await getHeroData();
	const aboutMe = await getAboutMeData();
	const techStack = await getTechStackData();
	const contact = await getContactData();
	const posts = await getBlogPosts();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tonnam | Developer Portfolio" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HeaderNav", HeaderNav, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/client/src/components/islands/HeaderNav.tsx",
		"client:component-export": "HeaderNav"
	})}${maybeRenderHead($$result)}<main class="space-y-12 pb-24"><!-- Hero Section -->${renderComponent($$result, "HeroSection", $$HeroSection, { "hero": hero })}<!-- About Section -->${renderComponent($$result, "AboutSection", $$AboutSection, { "aboutMe": aboutMe })}<!-- Tech Stack Section --><section id="skills" class="py-20 border-t border-slate-800/60"><div class="max-w-6xl mx-auto px-6 space-y-12"><div class="text-center space-y-3"><h2 class="text-3xl font-extrabold text-white">Tech Stack & Tools</h2><p class="text-slate-400 text-sm max-w-lg mx-auto">Technologies and frameworks I work with regularly.</p></div>${renderComponent($$result, "TechStackTabs", TechStackTabs, {
		"client:visible": true,
		"techStack": techStack,
		"client:component-hydration": "visible",
		"client:component-path": "D:/client/src/components/islands/TechStackTabs.tsx",
		"client:component-export": "TechStackTabs"
	})}</div></section><!-- Latest Blog Posts -->${posts.length > 0 && renderTemplate`<section class="py-20 border-t border-slate-800/60"><div class="max-w-6xl mx-auto px-6 space-y-12"><div class="flex items-center justify-between"><div><h2 class="text-3xl font-extrabold text-white">Recent Articles</h2><p class="text-slate-400 text-sm mt-1">Thoughts, tutorials, and project updates.</p></div><a href="/blog" class="text-xs font-semibold text-indigo-400 hover:underline">View All Posts →</a></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${posts.slice(0, 3).map((post) => renderTemplate`${renderComponent($$result, "BlogCard", $$BlogCard, { "post": post })}`)}</div></div></section>`}<!-- Contact Section --><section id="contact" class="py-20 border-t border-slate-800/60"><div class="max-w-6xl mx-auto px-6"><div class="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6"><h2 class="text-3xl font-extrabold text-white">Let's Connect</h2><p class="text-slate-300 text-sm max-w-md mx-auto">Feel free to reach out via email or connect on social media.</p>${contact?.email && renderTemplate`<div class="pt-2"><a${addAttribute(`mailto:${contact.email}`, "href")} class="inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105">📧 ${contact.email}</a></div>`}${contact?.socials && contact.socials.length > 0 && renderTemplate`<div class="flex flex-wrap justify-center gap-4 pt-4">${contact.socials.map((social) => renderTemplate`<a${addAttribute(social.url, "href")} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all"><i${addAttribute(social.icon, "class")}></i><span>${social.platform} (${social.username})</span></a>`)}</div>`}</div></div></section></main><footer class="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 glass"><p>© ${(/* @__PURE__ */ new Date()).getFullYear()} Supakron Klinbubpa (Tonnam). Built with Astro + Islands + Supabase on Bun runtime.</p></footer>` })}`;
}, "D:/client/src/pages/index.astro", void 0);
var $$file = "D:/client/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };

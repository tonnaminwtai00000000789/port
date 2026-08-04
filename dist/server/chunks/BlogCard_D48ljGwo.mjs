import { C as createAstro, g as addAttribute, m as maybeRenderHead, u as renderTemplate } from "./server_uVWWhcj-.mjs";
import { t as createComponent } from "./compiler_D7PGrtXv.mjs";
//#region src/components/static/BlogCard.astro
createAstro("https://astro.build");
var $$BlogCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlogCard;
	const { post } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article class="glass-card rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 flex flex-col group">${post.image && renderTemplate`<div class="h-48 overflow-hidden relative"><img${addAttribute(post.image, "src")}${addAttribute(post.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-transparent opacity-80"></div></div>`}<div class="p-6 flex flex-col flex-grow justify-between space-y-4"><div><span class="text-xs font-mono text-indigo-400">${post.date}</span><h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mt-1 line-clamp-2">${post.title}</h3><p class="text-slate-400 text-sm mt-2 line-clamp-3">${post.content.replace(/^#+\s+/gm, "")}</p></div><a${addAttribute(`/blog/${post.slug}`, "href")} class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-2 border-t border-slate-800/80">Read Full Post →</a></div></article>`;
}, "D:/client/src/components/static/BlogCard.astro", void 0);
//#endregion
export { $$BlogCard as t };

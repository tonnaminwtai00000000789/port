import { C as createAstro, R as __exportAll, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_uVWWhcj-.mjs";
import { t as createComponent } from "./compiler_D7PGrtXv.mjs";
import { c as $$Layout, n as getBlogPostBySlug, s as HeaderNav } from "./data_B7pZ49cj.mjs";
//#region src/pages/blog/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	if (!slug) return Astro.redirect("/blog");
	const post = await getBlogPostBySlug(slug);
	if (!post) return Astro.redirect("/404");
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.title} | Tonnam Blog` }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HeaderNav", HeaderNav, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/client/src/components/islands/HeaderNav.tsx",
		"client:component-export": "HeaderNav"
	})}${maybeRenderHead($$result)}<main class="max-w-4xl mx-auto px-6 py-16 space-y-8 flex-grow"><a href="/blog" class="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300">← Back to all posts</a><header class="space-y-4"><span class="text-xs font-mono text-indigo-400 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 inline-block">${post.date}</span><h1 class="text-3xl sm:text-5xl font-extrabold text-white leading-tight">${post.title}</h1></header>${post.image && renderTemplate`<div class="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl max-h-[400px]"><img${addAttribute(post.image, "src")}${addAttribute(post.title, "alt")} class="w-full h-full object-cover"></div>`}<article class="glass-card rounded-2xl p-8 sm:p-12 text-slate-200 leading-relaxed whitespace-pre-line text-base">${post.content}</article></main><footer class="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 glass"><p>© ${(/* @__PURE__ */ new Date()).getFullYear()} Supakron Klinbubpa. Astro + Supabase.</p></footer>` })}`;
}, "D:/client/src/pages/blog/[slug].astro", void 0);
var $$file = "D:/client/src/pages/blog/[slug].astro";
var $$url = "/blog/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };

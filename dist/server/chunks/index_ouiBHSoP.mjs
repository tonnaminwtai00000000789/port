import { R as __exportAll, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_uVWWhcj-.mjs";
import { t as createComponent } from "./compiler_D7PGrtXv.mjs";
import { c as $$Layout, r as getBlogPosts, s as HeaderNav } from "./data_5sh028PM.mjs";
import { t as $$BlogCard } from "./BlogCard_D48ljGwo.mjs";
//#region src/pages/blog/index.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const posts = await getBlogPosts();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog | Tonnam Portfolio" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HeaderNav", HeaderNav, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/client/src/components/islands/HeaderNav.tsx",
		"client:component-export": "HeaderNav"
	})}${maybeRenderHead($$result)}<main class="max-w-6xl mx-auto px-6 py-16 space-y-12 flex-grow"><div class="space-y-4 text-center max-w-xl mx-auto"><h1 class="text-4xl font-extrabold text-white">Articles & Writings</h1><p class="text-slate-400 text-sm">Thoughts, project logs, and development updates.</p></div>${posts.length === 0 ? renderTemplate`<div class="glass-card rounded-2xl p-12 text-center text-slate-400">No blog posts found yet. Check back soon!</div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-3 gap-6">${posts.map((post) => renderTemplate`${renderComponent($$result, "BlogCard", $$BlogCard, { "post": post })}`)}</div>`}</main><footer class="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 glass"><p>© ${(/* @__PURE__ */ new Date()).getFullYear()} Supakron Klinbubpa. Built with Astro + Supabase.</p></footer>` })}`;
}, "D:/client/src/pages/blog/index.astro", void 0);
var $$file = "D:/client/src/pages/blog/index.astro";
var $$url = "/blog";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/index@_@astro
var page = () => blog_exports;
//#endregion
export { page };

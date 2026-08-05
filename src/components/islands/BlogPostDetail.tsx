import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogRow } from "../../lib/supabase";

export function BlogPostDetail({ post }: { post: BlogRow }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Navigation Bar */}
      <div className="flex items-center justify-between pb-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0f172a] border-[1.5px] border-[#0f172a] text-xs font-bold shadow-[2px_2px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#2563eb]" />
              <span>กลับไปหน้าที่แล้ว</span>
            </button>
          </div>

      {/* Hero Header Banner */}
      <div className="card-paper overflow-hidden bg-[#0f172a] border-1.5 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] relative">
        <div className="w-full h-[32vh] md:h-[40vh] relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#60a5fa] text-[#0f172a] px-2.5 py-1 text-xs font-mono font-bold border border-[#0f172a]">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-display leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Main Content */}
      <div className="card-paper p-6 sm:p-10 bg-white border-1.5 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] space-y-8">
        <div className="prose prose-slate max-w-none">
          <div className="whitespace-pre-wrap font-sans text-[#0f172a] leading-relaxed text-base sm:text-lg">
            {post.content}
          </div>
        </div>

        <div className="pt-6 border-t-1.5 border-[#e2e8f0] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-[#475569]">
          <p>ขอบคุณที่เข้ามาอ่านบทความครับ 🙏</p>
          <a
            href="/blogs"
            className="text-[#2563eb] hover:underline font-extrabold inline-flex items-center gap-1"
          >
            อ่านบทความอื่นๆ →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

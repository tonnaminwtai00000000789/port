import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogRow } from "../../lib/supabase";

export function BlogPostDetail({ post }: { post: BlogRow }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Navigation Bar */}
      <div className="flex items-center justify-between pb-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0f172a] border border-[#1e293b] text-xs font-bold rounded-lg shadow-xs hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-all cursor-pointer font-mono"
        >
          <ArrowLeft className="w-4 h-4 text-[#1d4ed8]" />
          <span>กลับไปหน้าที่แล้ว</span>
        </button>
      </div>

      {/* Hero Header Banner */}
      <div className="paper-card overflow-hidden bg-[#0f172a] relative">
        <div className="w-full h-[32vh] md:h-[40vh] relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#1d4ed8] text-white px-2.5 py-1 text-xs font-mono font-bold rounded">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white font-display leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Main Content */}
      <div className="paper-card p-6 sm:p-10 bg-white space-y-8">
        <div className="prose prose-slate max-w-none">
          <div className="whitespace-pre-wrap font-sans text-[#0f172a] leading-relaxed text-base sm:text-lg">
            {post.content}
          </div>
        </div>

        <div className="pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-[#475569] font-sans">
          <p>ขอบคุณที่เข้ามาอ่านบทความครับ 🙏</p>
          <a
            href="/blogs"
            className="text-[#1d4ed8] hover:underline font-bold inline-flex items-center gap-1 font-mono"
          >
            อ่านบทความอื่นๆ →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

import React, { useState } from "react";
import { ArrowLeft, Clock, Check, Copy, BookOpen, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogRow } from "../../lib/supabase";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// Code block with Copy button component
function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden font-mono text-xs shadow-lg" style={{ border: "1px solid var(--kuro-border)", background: "rgba(18, 2, 25, 0.95)" }}>
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 text-[11px] font-bold select-none" style={{ background: "rgba(30, 0, 40, 0.8)", borderBottom: "1px solid var(--kuro-border)" }}>
        <span className="uppercase text-[var(--kuro-pink)] tracking-wider font-mono">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all hover:bg-[rgba(155,48,217,0.2)]"
          style={{ color: "var(--kuro-skull-dim)", border: "1px solid var(--kuro-border)" }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[var(--kuro-green)]" />
              <span className="text-[var(--kuro-green)]">คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>คัดลอก</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed select-text font-mono" style={{ color: "#e2c5ff" }}>
        <code>{codeString}</code>
      </pre>
    </div>
  );
}

export function BlogPostDetail({ post }: { post: BlogRow }) {
  const [linkCopied, setLinkCopied] = useState(false);

  // Estimate reading time
  const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 150));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 cursor-pointer"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าที่แล้ว</span>
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="pink" className="gap-1 text-[11px] font-mono font-bold">
            <BookOpen className="w-3 h-3" />
            <span>ใช้เวลาอ่าน ~{readingTime} นาที</span>
          </Badge>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        className="kuro-card overflow-hidden relative rounded-xl"
        style={{ border: "1px solid var(--kuro-border)" }}
      >
        <div className="w-full h-[32vh] md:h-[40vh] relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, var(--kuro-bg) 10%, rgba(13,0,16,0.6) 50%, transparent 100%)`,
            }}
          />
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold"
                style={{
                  background: "rgba(255,105,200,0.15)",
                  border: "1px solid rgba(255,105,200,0.3)",
                  color: "var(--kuro-pink)",
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <Badge variant="outline" className="text-xs font-mono font-bold">
                BLOG // ARTICLE
              </Badge>
            </div>
            <h1
              className="text-2xl sm:text-4xl font-black leading-tight tracking-tight"
              style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Markdown Content Box */}
      <div className="kuro-card p-6 sm:p-10 space-y-8 rounded-xl shadow-xl">
        <div className="prose prose-invert max-w-none space-y-4 leading-relaxed" style={{ color: "var(--kuro-skull-dim)", fontFamily: "var(--font-sans)" }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl font-black mt-8 mb-4 tracking-tight" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-black mt-6 mb-3 tracking-tight pb-2" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)", borderBottom: "1px solid var(--kuro-border)" }}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold mt-5 mb-2" style={{ color: "var(--kuro-skull)", fontFamily: "var(--font-display)" }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: "var(--kuro-skull-dim)" }}>
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-extrabold" style={{ color: "var(--kuro-skull)" }}>
                  {children}
                </strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="pl-4 py-2 my-4 border-l-4 rounded-r-lg font-mono text-sm italic" style={{ borderColor: "var(--kuro-pink)", background: "rgba(255,105,200,0.06)", color: "var(--kuro-skull-dim)" }}>
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 my-4 pl-2 text-base sm:text-lg">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 my-4 pl-2 text-base sm:text-lg">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed" style={{ color: "var(--kuro-skull-dim)" }}>
                  {children}
                </li>
              ),
              code: ({ inline, className, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code className="px-1.5 py-0.5 rounded-md font-mono text-xs font-bold mx-0.5" style={{ background: "rgba(155,48,217,0.18)", color: "var(--kuro-pink)", border: "1px solid var(--kuro-border)" }} {...props}>
                      {children}
                    </code>
                  );
                }
                return <CodeBlock className={className}>{children}</CodeBlock>;
              },
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer" className="font-bold underline hover:opacity-80 transition-opacity" style={{ color: "var(--kuro-primary-glow)" }}>
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold"
          style={{ borderTop: "1px solid var(--kuro-border)", color: "var(--kuro-muted-bright)" }}
        >
          <div className="flex items-center gap-3">
            <img src="/kuromi/sanrio-kuromi-cute-512x512.png" alt="Kuromi" className="w-8 h-8 object-contain" />
            <div>
              <p className="font-bold" style={{ color: "var(--kuro-skull)" }}>ขอบคุณที่เข้ามาอ่านบทความครับ 🙏</p>
              <p className="text-[11px] font-mono" style={{ color: "var(--kuro-muted)" }}>เขียนโดย Tonnam (ต้นน้ำ)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors hover:bg-[rgba(155,48,217,0.2)] cursor-pointer"
              style={{ border: "1px solid var(--kuro-border)", color: "var(--kuro-pink)" }}
            >
              {linkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--kuro-green)]" />
                  <span className="text-[var(--kuro-green)]">คัดลอกลิงก์แล้ว!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>แชร์บทความ</span>
                </>
              )}
            </button>
            <a
              href="/blogs"
              className="font-bold font-mono inline-flex items-center gap-1 hover:underline transition-colors"
              style={{ color: "var(--kuro-primary-glow)" }}
            >
              อ่านบทความอื่นๆ →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

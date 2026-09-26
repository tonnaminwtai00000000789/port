import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getWorksData, getHeroData } from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Tonnam · ผลงานทั้งหมด",
    description: "ผลงานและโปรเจกต์ทั้งหมดของ Tonnam",
  };
}

export default async function WorksPage() {
  const [works, hero] = await Promise.all([getWorksData(), getHeroData()]);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 pt-10">
          <Link
            href="/"
            className="p-2.5 rounded-xl transition-all flex items-center justify-center border hover:border-[var(--kuro-primary-glow)] hover:text-[var(--kuro-primary-glow)]"
            style={{
              borderColor: "var(--kuro-border)",
              background: "rgba(30,0,40,0.6)",
              color: "var(--kuro-skull-dim)",
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="kuro-section-label">WORKS ARCHIVE</span>
            <h1
              className="text-3xl font-black"
              style={{
                color: "var(--kuro-skull)",
                fontFamily: "var(--font-display)",
              }}
            >
              ผลงานทั้งหมด
            </h1>
          </div>
          <img
            src="/kuromi/List-kuromi.webp"
            alt="Kuromi"
            className="w-12 h-12 object-contain ml-auto opacity-70"
          />
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work) => (
            <div
              key={work.id}
              className="kuro-card overflow-hidden flex flex-col justify-between group"
            >
              <div
                className="aspect-video overflow-hidden relative border-b"
                style={{ borderColor: "var(--kuro-border)" }}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold kuro-badge-pink">
                  {work.year}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h2
                    className="text-xl font-black transition-colors hover:text-[var(--kuro-primary-glow)]"
                    style={{
                      color: "var(--kuro-skull)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {work.title}
                  </h2>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--kuro-muted-bright)" }}
                  >
                    {work.description}
                  </p>

                  {work.tags && work.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {work.tags.map((tag: any, idx: number) => (
                        <span key={idx} className="kuro-badge">
                          {tag.label || tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="flex items-center gap-2 pt-2 border-t"
                  style={{ borderColor: "var(--kuro-border)" }}
                >
                  {work.links?.map((link: any, idx: number) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        link.type === "website"
                          ? "kuro-btn px-4 py-2 text-xs inline-flex items-center gap-1.5"
                          : "kuro-btn-outline px-4 py-2 text-xs inline-flex items-center gap-1.5"
                      }
                    >
                      {link.type === "website" ? (
                        <>
                          เปิดดูเว็บไซต์ <ExternalLink className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          ซอร์สโค้ด <i className="devicon-github-original text-sm" />
                        </>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

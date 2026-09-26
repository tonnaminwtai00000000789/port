import type { Metadata } from "next";
import { Nunito, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundEffect } from "@/components/islands/BackgroundEffect";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tonnam · Supakron Klinbubpa",
  description: "My portfolio/bio website",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tonnam · Supakron Klinbubpa",
    description: "My portfolio/bio website",
    images: ["https://theijon.online/images/tonnam.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`${nunito.variable} ${spaceGrotesk.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col relative"
        style={{
          backgroundColor: "var(--kuro-bg)",
          color: "var(--kuro-skull)",
        }}
      >
        <BackgroundEffect />
        <div className="flex-1 flex flex-col">{children}</div>
        <footer
          className="mt-auto border-t py-6 px-6 text-xs relative z-10"
          style={{
            borderColor: "var(--kuro-border)",
            background: "rgba(13, 0, 16, 0.95)",
            color: "var(--kuro-muted)",
          }}
        >
          <div
            className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex items-center gap-3">
              <img
                src="/kuromi/List-kuromi.webp"
                alt="Kuromi"
                className="w-8 h-8 object-contain opacity-75"
              />
              <p>© {new Date().getFullYear()} Tonnam · Supakron Klinbubpa</p>
            </div>
            <p className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--kuro-primary-glow)" }}
              >
                ✦ KUROMI.DEV ✦
              </span>
              <span style={{ color: "var(--kuro-border-bright)" }}>|</span>
              <a
                href="#"
                className="font-bold transition-colors hover:underline"
                style={{ color: "var(--kuro-pink)" }}
              >
                TOP ↑
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Route } from "./+types/home";
import Hero, { type HeroData } from "../root/Hero";
import Work, { type Work as WorkData } from "../root/Work";
import TechStack, { type TechStackCategory } from "../root/TechStack";
import Aboutme, { type AboutMeData } from "../root/Aboutme";
import BlogSection, { type Blog } from "../root/Blogs";
import Contact, { type ContactData } from "../root/Contact";
import { getApiUrl } from "../utils/api";
import { data } from "react-router";

const API_URL = "/api";

interface AllData {
  hero: HeroData;
  aboutme: AboutMeData;
  blogs: Blog[];
  techstack: TechStackCategory[];
  works: WorkData[];
  contact: ContactData | null;
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const res = await fetch(getApiUrl("/home-data", request));
    if (!res.ok) {
      throw new Error(`Failed to load home data: ${res.statusText}`);
    }

    const homeData = await res.json() as AllData;
    const profileImage = homeData.hero?.profileImage;

    const headers: Record<string, string> = {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    };

    if (profileImage) {
      headers["Link"] = `<${profileImage}>; rel=preload; as=image`;
    }

    return data(homeData, { headers });
  } catch (err) {
    console.error("Error loading data in loader:", err);
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export function headers() {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
  };
}

export function meta({ data }: Route.MetaArgs) {
  const hero = data?.hero;
  const name = hero ? `${hero.displayName}` : "";
  const bio = hero ? `Developer based in ${hero.location}. ${hero.displayName}` : "";

  return [
    { title: `${name}` },
    { name: "description", content: bio },
    { property: "og:title", content: `${name}` },
    { property: "og:description", content: bio },
    { property: "og:image", content: hero?.profileImage || "" },
    { property: "og:type", content: "website" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  if (!data) return null;

  return (
    <div className="animate-fade-in bg-dark-bg min-h-screen text-gray-200 relative overflow-hidden">
      {/* Mystical Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="flex justify-center py-10 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-6xl space-y-12 md:space-y-20">
          <Hero data={data.hero} />
          <Work data={data.works} />
          <TechStack data={data.techstack} />
          <Aboutme data={data.aboutme} />
          <BlogSection data={data.blogs} />
          {data.contact && <Contact data={data.contact} />}
        </div>
      </div>
    </div>
  );
}

import { HeaderNav } from "@/components/layout/HeaderNav";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { TechStack } from "@/components/sections/TechStack";
import { Aboutme } from "@/components/sections/Aboutme";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { Contact } from "@/components/sections/Contact";

import {
  getHeroData,
  getAboutMeData,
  getTechStackData,
  getWorksData,
  getContactData,
  getBlogPosts,
} from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata() {
  const hero = await getHeroData();
  const displayName = hero?.displayName || "TonnamInwtai00789";
  return {
    title: `Tonnam · ${displayName}`,
    description: "My Personal portfolio/bio",
    openGraph: {
      title: `Tonnam · ${displayName}`,
      description: "My Personal portfolio/bio",
      images: hero?.profileImage ? [hero.profileImage] : [],
    },
  };
}

export default async function HomePage() {
  // Parallel fetching per Vercel Best Practices (eliminating waterfalls)
  const [hero, aboutMe, techStack, works, contact, posts] = await Promise.all([
    getHeroData(),
    getAboutMeData(),
    getTechStackData(),
    getWorksData(),
    getContactData(),
    getBlogPosts(),
  ]);

  return (
    <>
      <HeaderNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 flex-1 w-full space-y-16 sm:space-y-24 pt-24 pb-16">
        {hero && <Hero data={hero} />}
        {works && works.length > 0 && <Work data={works} />}
        {techStack && techStack.length > 0 && <TechStack data={techStack} />}
        {aboutMe && <Aboutme data={aboutMe} />}
        {posts && posts.length > 0 && <BlogsSection data={posts} />}
        {contact && <Contact data={contact} />}
      </main>
    </>
  );
}

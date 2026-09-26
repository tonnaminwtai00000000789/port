import { HeaderNav } from "@/components/layout/HeaderNav";
import { BlogsList } from "@/components/sections/BlogsList";
import { getBlogPosts } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Tonnam · บทความทั้งหมด",
  description: "บทความ ความคิด และประสบการณ์การพัฒนาซอฟต์แวร์โดย Tonnam",
};

export default async function BlogsPage() {
  const blogs = await getBlogPosts();

  return (
    <>
      <HeaderNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-28 pb-16 flex-1 w-full">
        <BlogsList blogs={blogs} />
      </main>
    </>
  );
}

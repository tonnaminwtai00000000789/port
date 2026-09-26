import { notFound } from "next/navigation";
import { HeaderNav } from "@/components/islands/HeaderNav";
import { BlogPostDetail } from "@/components/islands/BlogPostDetail";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getBlogPostBySlug(decodedSlug) || await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Not Found · Tonnam",
    };
  }

  return {
    title: `${post.title} · Tonnam`,
    description: post.content ? post.content.slice(0, 150) : post.title,
    openGraph: {
      title: `${post.title} · Tonnam`,
      description: post.content ? post.content.slice(0, 150) : post.title,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getBlogPostBySlug(decodedSlug) || await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <HeaderNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-28 pb-16 flex-1 w-full space-y-8">
        <BlogPostDetail post={post} />
      </main>
    </>
  );
}

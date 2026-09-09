import { notFound } from "next/navigation";
import {
  getSingleBlog,
  getRelatedBlogs,
} from "@/data/blogDetails";
import BlogDetailClient from "./BlogDetailClient";
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({
  params,
}: Props) {

  const { slug } = await params;
  const blog = await getSingleBlog(slug);
  if (!blog) {
    notFound();
  }
  const relatedBlogs =
    await getRelatedBlogs(
      blog.category,
      blog.slug
    );
    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`;
  return (

      <BlogDetailClient
    blog={{
      ...blog,
      sections: blog.sections ?? [],
      tableOfContents: blog.tableOfContents ?? [],
    }}
    relatedBlogs={relatedBlogs}
    shareUrl={shareUrl}
  />
  );
}
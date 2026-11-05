import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MetaData } from "@/lib/metadata";
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
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getSingleBlog(slug);

  const canonicalUrl = `https://ziaeedentureclinic.ca/blog/${slug}`;

  if (!blog) {
    return {
      ...MetaData(null, {
        title: "Blog | Ziaee Denture Clinic",
        description:
          "Read the latest dental and denture care articles from Ziaee Denture Clinic.",
      }),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        url: canonicalUrl,
      },
    };
  }

  return {
    ...MetaData(blog.seo, {
      title: `${blog.title} | Ziaee Denture Clinic`,
      description:
        blog.excerpt ||
        "Read the latest dental and denture care articles from Ziaee Denture Clinic.",
    }),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
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
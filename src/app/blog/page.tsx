import BlogClient from "./BlogClient";
import { getBlogs, blogBanner, getBlogBanner } from "@/data/blog";

export default async function BlogPage() {
  const blogBanner = await getBlogBanner();
  const blogs = await getBlogs();

  return (
    <BlogClient
      blogs={blogs}
      banner={blogBanner}
    />
  );
}
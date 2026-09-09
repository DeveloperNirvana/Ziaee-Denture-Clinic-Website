'use client';
import { useMemo, useState } from 'react';
import Container from '@/components/common/Container';
import BlogCard from '@/components/cards/BlogCard';
import Heading from '@/components/common/Heading';
import InnerBanner, { type InnerBannerData } from '@/components/common/InnerBanner';
interface Blog {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt?: string;
  date: string;
  readTime: string;
  image: string;
}
interface Props {
  blogs: Blog[];
  banner: InnerBannerData;
}
export default function BlogClient({ blogs, banner }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visible, setVisible] = useState(8);
  const categories = useMemo(() => {
    return ['All', ...new Set(blogs.map((item) => item.category))];
  }, [blogs]);
  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'All') {
      return blogs;
    }
    return blogs.filter((item) => item.category === activeCategory);
  }, [blogs, activeCategory]);
  return (
    <>
      <InnerBanner data={banner} variant="split" />
      <section className="space-py">
        <Container>
          <div className="mb-6 lg:mb-9 flex flex-col gap-6">
            <Heading variant="xxl" className="font-semibold!">
              Popular Post
            </Heading>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisible(12);
                  }}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-500 ${
                    activeCategory === category
                      ? 'bg-primary border-primary text-white'
                      : 'border-black/10 bg-white hover:bg-primary hover:border-primary hover:text-white'
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredBlogs.slice(0, visible).map((item) => (
              <BlogCard key={item.id} data={item} />
            ))}
          </div>
          {visible < filteredBlogs.length && (
            <div className="mt-8 flex justify-center lg:mt-11">
              <button
                onClick={() => setVisible((prev) => prev + 8)}
                className="bg-primary hover:bg-primary/80 rounded-full px-10 py-3 text-white transition duration-500">
                View More
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

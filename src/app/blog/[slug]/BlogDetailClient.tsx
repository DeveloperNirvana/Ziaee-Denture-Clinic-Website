"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import InnerBanner from "@/components/common/InnerBanner";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import BlogCard from "@/components/cards/BlogCard";
import Swipers from "@/components/common/Swipers";


interface BlogSection {
  id: string;
  title: string;
  content: string;
}


interface BlogDetail {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;

  tableOfContents?: {
    id: string;
    label: string;
  }[];

  sections?: BlogSection[];
}


interface BlogCardData {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}


interface Props {
  blog: BlogDetail;
  relatedBlogs: BlogCardData[];
  shareUrl: string;
}


export default function BlogDetailClient({
  blog,
  relatedBlogs,
  shareUrl,
  
}: Props) {

  
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-140px 0px -60% 0px'
      }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const hasSections =
    Boolean(
      blog.sections &&
      blog.sections.length > 0
    );


  const hasTableOfContents =
    Boolean(
      blog.tableOfContents &&
      blog.tableOfContents.length > 0
    );
function truncateWords(text: string, limit: number = 20) {
  const words = text
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/);

  if (words.length <= limit) {
    return words.join(" ");
  }

  return `${words.slice(0, limit).join(" ")}...`;
}


const shareTitle = blog.title;
 const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const header = document.querySelector('header');
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 120;
    const offset = element.getBoundingClientRect().top + window.scrollY - headerHeight - 32;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  };

  return (
  <>
    <InnerBanner
      variant="centered"
      data={{
        title: blog.title,
        description: truncateWords(blog.excerpt, 20),
        date: blog.date,
        readTime: blog.readTime,
        breadcrumbs: [
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: blog.title,
          },
        ],
      }}
    />

    <section className="py-12 lg:pb-20">
      <Container>
          <div
  className={`grid gap-12 gap-x-16 ${
    hasTableOfContents
      ? "lg:grid-cols-[280px_minmax(0,1fr)]"
      : "grid-cols-1"
  }`}
>
          {hasTableOfContents && (
            <aside className="hidden lg:block">
              <div className="sticky top-33">
                <h3 className="mb-6 text-sm font-normal uppercase text-secondary">Table of Content</h3>
           <ul className="space-y-4 lg:space-y-8">
            {blog.tableOfContents?.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-base leading-snug transition ${
                    activeId === item.id
                      ? "font-semibold text-secondary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
              </div>
            </aside>
          )}
          <div>
           <div className="relative mb-10 h-[250px] overflow-hidden rounded-3xl sm:h-[350px] lg:h-[535px]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

            {hasSections ? (
              <article className="">
                {blog.sections?.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    data-section
                    className="mb-6 border-b border-white-blue pb-6 last:mb-0 last:border-0 last:pb-0">
                   <div
                      className="prose prose-lg max-w-none prose-headings:text-secondary text-secondary prose-headings:font-bold prose-h2:mb-3 prose-h2:text-2xl prose-h2:uppercase prose-h3:mt-5 prose-h3:text-xl prose-p:leading-tight prose-ul:mt-4 prose-ul:last:m-b0 prose-ol:mt-4 prose-li:my-1 prose-a:text-primary prose-strong:font-medium"
                      dangerouslySetInnerHTML={{
                        __html: section.content
                      }}
                    />
                  </section>
                ))}
              </article>
            ) : (
              <article
                className="
                  prose
                  prose-lg
                  max-w-none
                  text-secondary
                  prose-headings:text-secondary
                  prose-headings:font-bold
                  prose-h2:uppercase
                  prose-h3:text-xl
                  prose-p:leading-relaxed
                  prose-ul:mt-4
                  prose-ol:mt-4
                  prose-li:my-1
                  prose-a:text-primary
                  prose-strong:font-semibold
                "
                dangerouslySetInnerHTML={{
                  __html: blog.content ?? "",
                }}
              />
            )}
            <div className="mt-6 border-t border-white-blue pt-6 flex items-center gap-4 text-secondary">
                <span>Share:</span>
                {/* Facebook */}
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on Facebook"
    className="transition hover:opacity-70"
  >
    <FaFacebookF size={18} />
  </a>

  {/* X (Twitter) */}
  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareTitle)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on X"
    className="transition hover:opacity-70"
  >
    <FaXTwitter size={18} />
  </a>

  {/* LinkedIn */}
  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on LinkedIn"
    className="transition hover:opacity-70"
  >
    <FaLinkedinIn size={18} />
  </a>

  {/* Email */}
  <a
    href={`mailto:?subject=${encodeURIComponent(
      shareTitle
    )}&body=${encodeURIComponent(shareUrl)}`}
    aria-label="Share by Email"
    className="transition hover:opacity-70"
  >
    <MdOutlineEmail size={20} />
  </a>
              </div>
          </div>
        </div>
      </Container>
    </section>

    {relatedBlogs.length > 0 && (
      <section className="border-t border-white-blue  space-py">
        <Container>
          <Heading className="font-bold! text-secondary text-center uppercase lg:text-[40px]!" variant="xl">
            Recommended for you
          </Heading>

          <Swipers
            className="pt-10!"
            slidesPerView={1.2}
            spaceBetween={16}
            loop
            autoplay
            speed={1600}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {relatedBlogs.map((item) => (
              <BlogCard
                key={item.id}
                data={item}
              />
            ))}
          </Swipers>
        </Container>
      </section>
    )}
  </>
);
}
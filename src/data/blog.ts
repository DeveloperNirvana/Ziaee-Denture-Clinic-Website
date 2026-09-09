import { fetchGraphQL } from "@/lib/graphql";
import type { InnerBannerData } from '@/components/common/InnerBanner';
export const blogBanner: InnerBannerData = {
  title: 'What to Expect at Your First Denture Appointment',
  description:
    'A simple guide to your first visit, including what to bring, what questions to ask, and how your treatment options may be discussed.',
  buttons: [
    {
      label: 'Read Full Article',
      href: '/contact-us',
      color: 'white'
    }
  ],
  image: '/images/blog-banner.png',
  date: 'June 10, 2026',
  readTime: '4 min read',
};

export async function getBlogBanner(): Promise<InnerBannerData> {
  const data = await fetchGraphQL(GET_BLOGS);

  const post = data.posts.nodes[0];

  if (!post) {
    return {
      title: "",
      description: "",
      buttons: [],
      image: "/images/blog-banner.png",
      date: "",
      readTime: "",
    };
  }

  const excerpt =
    post.excerpt?.replace(/<[^>]*>/g, "") || "";

  return {
    title: post.title,
    description: excerpt,
    buttons: [
      {
        label: "Read Full Article",
        href: `/blog/${post.slug}`,
        color: "white",
      },
    ],
    image:
      post.featuredImage?.node?.sourceUrl ||
      "/images/blog-banner.png",
    date: new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: `${Math.max(
      1,
      Math.ceil(excerpt.split(" ").length / 200)
    )} min read`,
  };
}
export const blogData = [
  {
    id: 1,
    slug: 'understanding-cdcp-coverage',
    category: 'CDCP COVERAGE',
    title: 'UNDERSTANDING CDCP COVERAGE',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-1.png'
  },
  {
    id: 2,
    slug: 'signs-your-dentures-need-adjustment',
    category: 'FIT & COMFORT',
    title: 'SIGNS YOUR DENTURES NEED ADJUSTMENT',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-2.png'
  },
  {
    id: 3,
    slug: 'complete-guide-to-partial-dentures',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 8, 2026',
    readTime: '5 min read',
    image: '/images/blog-3.png'
  },
  {
    id: 4,
    slug: 'denture-cleaning-best-practices',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 7, 2026',
    readTime: '3 min read',
    image: '/images/blog-4.png'
  },
  {
    id: 5,
    slug: 'understanding-cdcp-coverage',
    category: 'CDCP COVERAGE',
    title: 'UNDERSTANDING CDCP COVERAGE',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-5.png'
  },
  {
    id: 6,
    slug: 'signs-your-dentures-need-adjustment',
    category: 'FIT & COMFORT',
    title: 'SIGNS YOUR DENTURES NEED ADJUSTMENT',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-6.png'
  },
  {
    id: 7,
    slug: 'complete-guide-to-partial-dentures',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 8, 2026',
    readTime: '5 min read',
    image: '/images/blog-7.png'
  },
  {
    id: 8,
    slug: 'denture-cleaning-best-practices',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 7, 2026',
    readTime: '3 min read',
    image: '/images/blog-8.png'
  },
  {
    id: 9,
    slug: 'understanding-cdcp-coverage',
    category: 'CDCP COVERAGE',
    title: 'UNDERSTANDING CDCP COVERAGE',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-1.png'
  },
  {
    id: 10,
    slug: 'signs-your-dentures-need-adjustment',
    category: 'FIT & COMFORT',
    title: 'SIGNS YOUR DENTURES NEED ADJUSTMENT',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-9.png'
  },
  {
    id: 11,
    slug: 'complete-guide-to-partial-dentures',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 8, 2026',
    readTime: '5 min read',
    image: '/images/blog-10.png'
  },
  {
    id: 12,
    slug: 'denture-cleaning-best-practices',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 7, 2026',
    readTime: '3 min read',
    image: '/images/blog-11.png'
  },
  {
    id: 13,
    slug: 'understanding-cdcp-coverage',
    category: 'CDCP COVERAGE',
    title: 'UNDERSTANDING CDCP COVERAGE',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-1.png'
  },
  {
    id: 14,
    slug: 'signs-your-dentures-need-adjustment',
    category: 'FIT & COMFORT',
    title: 'SIGNS YOUR DENTURES NEED ADJUSTMENT',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-2.png'
  },
  {
    id: 15,
    slug: 'complete-guide-to-partial-dentures',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 8, 2026',
    readTime: '5 min read',
    image: '/images/blog-3.png'
  },
  {
    id: 16,
    slug: 'denture-cleaning-best-practices',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 7, 2026',
    readTime: '3 min read',
    image: '/images/blog-4.png'
  },
  {
    id: 17,
    slug: 'understanding-cdcp-coverage',
    category: 'CDCP COVERAGE',
    title: 'UNDERSTANDING CDCP COVERAGE',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-5.png'
  },
  {
    id: 18,
    slug: 'signs-your-dentures-need-adjustment',
    category: 'FIT & COMFORT',
    title: 'SIGNS YOUR DENTURES NEED ADJUSTMENT',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-6.png'
  },
  {
    id: 19,
    slug: 'complete-guide-to-partial-dentures',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 8, 2026',
    readTime: '5 min read',
    image: '/images/blog-7.png'
  },
  {
    id: 20,
    slug: 'denture-cleaning-best-practices',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 7, 2026',
    readTime: '3 min read',
    image: '/images/blog-8.png'
  },
  {
    id: 21,
    slug: 'understanding-cdcp-coverage',
    category: 'CDCP COVERAGE',
    title: 'UNDERSTANDING CDCP COVERAGE',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-1.png'
  },
  {
    id: 22,
    slug: 'signs-your-dentures-need-adjustment',
    category: 'FIT & COMFORT',
    title: 'SIGNS YOUR DENTURES NEED ADJUSTMENT',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: '/images/blog-9.png'
  },
  {
    id: 23,
    slug: 'complete-guide-to-partial-dentures',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 8, 2026',
    readTime: '5 min read',
    image: '/images/blog-10.png'
  },
  {
    id: 24,
    slug: 'denture-cleaning-best-practices',
    category: 'CDCP COVERAGE',
    title: 'Understanding CDCP Coverage',
    date: 'June 7, 2026',
    readTime: '3 min read',
    image: '/images/blog-11.png'
  }
];



const GET_BLOGS = `
query GetBlogs {
  posts(first: 100,) {
    nodes {
      databaseId
      title
      slug
      excerpt
      date

      featuredImage {
        node {
          sourceUrl
        }
      }

      categories {
        nodes {
          name
        }
      }
    }
  }
}
`;

export async function getBlogs() {
const data = await fetchGraphQL(GET_BLOGS);

  return data.posts.nodes.slice(1).map((post: any) => ({
  id: post.databaseId,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt?.replace(/<[^>]*>/g, "") || "",
  category: post.categories?.nodes?.[0]?.name || "General",
  

    date: new Date(post.date).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    ),

    readTime: `${Math.max(
      1,
      Math.ceil(
        (post.excerpt?.replace(
          /<[^>]*>?/gm,
          ""
        ).split(" ").length || 0) / 200
      )
    )} min read`,

    image:
      post.featuredImage?.node?.sourceUrl ||
      "/images/blog-placeholder.png",
  }));
}

export async function getHomeBlogs() {
  const data = await fetchGraphQL(GET_BLOGS);

  return data.posts.nodes.map((post: any) => {
    const description =
      post.excerpt?.replace(/<[^>]*>/g, "").trim() || "";

    return {
      id: post.databaseId,
      title: post.title,

      // Used by CareGuideCard
      description,
      tagline: post.categories?.nodes?.[0]?.name || "General",
      link: `/blog/${post.slug}`,

      date: new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),

      readTime: `${Math.max(
        1,
        Math.ceil(description.split(/\s+/).length / 200)
      )} min read`,

      image:
        post.featuredImage?.node?.sourceUrl ||
        "/images/blog-placeholder.png",
    };
  });
}
import { fetchGraphQL } from "@/lib/graphql";
import type { InnerBannerData } from '@/components/common/InnerBanner';
export const blogBannerDetail: InnerBannerData = {
  title: 'WHAT TO EXPECT AT YOUR FIRST DENTURE APPOINTMENT',
  description:
    'A simple guide to your first visit, including what to bring, what questions to ask, and how your treatment options may be discussed.',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'What To Expect At Your First Denture Appointment' }
  ],
  date: 'June 10, 2026',
  readTime: '4 min read'
};
export const blogDetails = [
  {
    slug: 'what-to-expect-first-denture-appointment',
    title: 'WHAT TO EXPECT AT YOUR FIRST DENTURE APPOINTMENT',
    image: '/images/blog-detail.jpg',
    tableOfContents: [
      {
        id: 'intro',
        label: 'Comprehensive Denture Clinic Services for Comfortable, Natural-Looking Smiles'
      },
      {
        id: 'what-are-dentures',
        label: 'What Are Dentures?'
      },
      {
        id: 'services',
        label: 'Our Denture Clinic Services'
      },
      {
        id: 'why-choose-us',
        label: 'Why Choose Our Denture Clinic?'
      },
      {
        id: 'restore-smile',
        label: 'Restore Your Smile Today'
      }
    ],
    sections: [
      {
        id: 'intro',
        content: `
          <h2>Comprehensive Denture Clinic Services for Comfortable, Natural-Looking Smiles</h2>
          <p>
            Missing teeth can affect more than just your appearance—they can impact your ability to eat, speak, and enjoy everyday life. At a professional denture clinic, patients receive personalized solutions designed to restore oral function, improve confidence, and create beautiful, natural-looking smiles.
          </p>
          <p>
          Whether you've lost a few teeth or require a complete tooth replacement solution, modern dentures offer comfortable, durable, and aesthetically pleasing options tailored to your needs. With advanced technology and customized treatment plans, today's dentures fit better and look more natural than ever before.
          </p>
          <p>
This guide explores the various denture clinic services available and how they can help you regain a healthy, confident smile.</p>
        `
      },
      {
        id: 'what-are-dentures',
        content: `
          <h2>What Are Dentures?</h2>
          <p>
         Dentures are removable prosthetic devices designed to replace missing teeth and surrounding tissues. They help restore normal chewing function, improve speech, maintain facial structure, and enhance overall oral health.  </p>
   <p>
Modern dentures are custom-crafted to fit comfortably while closely resembling the appearance of natural teeth.</p>
   <p>
Professional denture clinics provide comprehensive care from consultation and design to fitting, adjustments, repairs, and ongoing maintenance.
        
       
          </p>
        `
      },
      {
        id: 'services',
        content: `
          <h2>Our Denture Clinic Services</h2>
          <h3>Complete Dentures</h3>
          <p>
           Complete dentures are recommended for patients who have lost all of their upper, lower, or both sets of teeth.
          </p>
          <p>These custom-made dentures are designed to:</p>
          <ul>
<li>Restore full chewing ability</li>
<li>Improve facial appearance</li>
<li>Support lips and cheeks</li>
<li>Enhance speech clarity</li>
<li>Boost self-confidence</li>
          </ul>
          <p>Complete dentures are carefully fitted to ensure maximum comfort and functionality.</p>
        `
      },
      {
        id: 'why-choose-us',
        content: `
          <h2>Why Choose Our Denture Clinic?</h2>
          <p>
            We are committed to providing compassionate, patient-focused care with personalized treatment solutions.
          </p>
          <h3>Our Difference:</h3>
          <ul>
 <li>Experienced denture professionals</li>
 <li>Customized treatment plans</li>
 <li>Advanced denture technology</li>
 <li>Natural-looking results</li>
 <li>Comfortable and precise fittings</li>
 <li>Affordable treatment options</li>
 <li>Friendly and supportive environment</li>
 <li>Ongoing maintenance and aftercare</li>
          </ul>
        `
      },
      {
        id: 'restore-smile',
        content: `
          <h2>Restore Your Smile Today</h2>
          <p>
           A healthy smile can transform your confidence, comfort, and quality of life. Whether you need complete dentures, partial dentures, repairs, or implant-supported solutions, professional denture care can help you smile, speak, and eat with confidence again.
          </p>
          <p>
            <strong>
             Book your consultation today and take the first step toward a comfortable, natural-looking smile that lasts for years to come.
            </strong>
          </p>
        `
      }
    ]
  }
];

export const relateBlogData = [
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
]

function generateSectionId(title: string, index: number) {
  return `${title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")}-${index + 1}`;
}
const GET_RELATED_BLOGS = `
query GetRelatedBlogs($category: String!) {
  posts(
    first: 4
    where: {
      categoryName: $category
    }
  ) {
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
export async function getRelatedBlogs(
  category: string,
  currentSlug: string
) {
  const data = await fetchGraphQL(GET_RELATED_BLOGS, {
    category,
  });

  if (!data?.posts?.nodes) {
    return [];
  }

  return data.posts.nodes
    .filter((post: any) => post.slug !== currentSlug)
    .slice(0, 4)
    .map((post: any) => {
      const excerpt =
        post.excerpt?.replace(/<[^>]*>/g, "") ?? "";

      return {
        id: post.databaseId,
        slug: post.slug,
        title: post.title,
        excerpt,
        category:
          post.categories?.nodes?.[0]?.name ?? "General",
        image:
          post.featuredImage?.node?.sourceUrl ??
          "/images/blog-placeholder.png",
        date: new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        readTime: `${Math.max(
          1,
          Math.ceil(
            excerpt.split(/\s+/).filter(Boolean).length / 200
          )
        )} min read`,
      };
    });
}

const GET_SINGLE_BLOG = `
query GetSingleBlog($slug: ID!) {

  post(id: $slug, idType: SLUG) {

    databaseId
    title
    slug
    content
    excerpt
    date

    featuredImage {
      node {
        sourceUrl
        altText
      }
    }

    categories {
      nodes {
        name
      }
    }

    blogDetails {

      blogSections {

        addTitle

        addContent

      }

    }

  }

}
`;



export async function getSingleBlog(slug: string) {

  const data = await fetchGraphQL(GET_SINGLE_BLOG, {
    slug,
  });


  if (!data?.post) {
    return null;
  }

  const post = data.post;
  const content = post.content ?? "";
  const excerpt = post.excerpt ?? "";
  const plainContent =
    content.replace(/<[^>]*>/g, "");



const sections =
  post.blogDetails?.blogSections?.length
    ? post.blogDetails.blogSections
        .filter(
          (section: any) =>
            section.addTitle ||
            section.addContent
        )
        .map(
          (section: any, index: number) => {

            const title =
              section.addTitle ?? "";


            return {

              id: generateSectionId(
                title,
                index
              ),

              title,

              content:
                section.addContent ?? "",

            };

          }
        )

    : [];



/**
 * Table of Contents
 * Show only when ACF sections exist
 */
const tableOfContents =
  sections.length > 0
    ? sections.map(
        (section: any) => ({
          id:
            section.id,

          label:
            section.title,
        })
      )

    : [];


  return {


    id:
      post.databaseId,


    slug:
      post.slug,


    title:
      post.title,


    content,


    excerpt:
      excerpt.replace(/<[^>]*>/g, ""),



    category:
      post.categories?.nodes?.[0]?.name ??
      "General",



    image:
      post.featuredImage?.node?.sourceUrl ??
      "/images/blog-placeholder.png",



    imageAlt:
      post.featuredImage?.node?.altText ??
      post.title,



    date:
      new Date(post.date).toLocaleDateString(
        "en-US",
        {
          month:"long",
          day:"numeric",
          year:"numeric",
        }
      ),



    readTime:
      `${Math.max(
        1,
        Math.ceil(
          plainContent
            .split(/\s+/)
            .filter(Boolean)
            .length / 200
        )
      )} min read`,



    sections,


    tableOfContents,


  };

}
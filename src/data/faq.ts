import type { InnerBannerData } from '@/components/common/InnerBanner';
import { fetchGraphQL } from "@/lib/graphql";
export const faqBanner: InnerBannerData = {
  tagline: 'Need Help',
  title: 'Frequently Asked Questions',
  description: 'Have a question? We have answer.',
  headingClassName: 'max-w-200'
};
export const faqDataList = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'g1',
        question: 'Do I need a referral to book an appointment?',
        answer: 'In most cases, you can contact the clinic directly to request an appointment.'
      },
      {
        id: 'g2',
        question: 'Do you accept CDCP patients?',
        answer: 'Yes, CDCP patients are welcome. Coverage depends on eligibility and approved treatment.'
      },
      {
        id: 'g3',
        question: 'What happens during the first visit?',
        answer: 'We’ll discuss your needs, review your current denture situation if you have one, and explain possible treatment options.'
      },
      {
        id: 'g4',
        question: 'Do you offer digital scanning?',
        answer: 'Yes, the clinic uses modern scanning and imaging technology to support accurate denture planning.'
      },
      {
        id: 'g5',
        question: 'Can my existing dentures be adjusted?',
        answer: 'Many dentures can be adjusted or relined to improve comfort and fit.'
      },
      {
        id: 'g6',
        question: 'How do I book an appointment?',
        answer: 'You can request an appointment online or contact the clinic directly.'
      },
      {
        id: 'g7',
        question: 'Will dentures affect my speech?',
        answer: 'It may take a short adjustment period, but most patients adapt quickly and speech improves over time.'
      },
      {
        id: 'g8',
        question: 'How do I clean and maintain my dentures?',
        answer: 'Dentures should be cleaned daily using a soft brush and proper denture cleaner, and soaked overnight when not in use.'
      },
      {
        id: 'g9',
        question: 'Can damaged dentures be repaired?',
        answer: 'Yes, in many cases damaged dentures can be repaired depending on the severity of the issue.'
      },
      {
        id: 'g10',
        question: 'How often should I have my dentures checked?',
        answer: 'Regular check-ups are recommended at least once a year to ensure proper fit and oral health.'
      },
      {
        id: 'g11',
        question: 'What are implant-supported dentures?',
        answer: 'Implant-supported dentures are secured using dental implants for improved stability and comfort.'
      },
      {
        id: 'g12',
        question: 'How long do dentures last?',
        answer: 'Dentures typically last 5–10 years depending on care, usage, and oral changes over time.'
      },
      {
        id: 'g13',
        question: 'Are dentures comfortable to wear?',
        answer: 'Yes, with proper fitting and adjustment, dentures become comfortable and natural to wear over time.'
      }
    ]
  },
  {
    id: 'Help',
    title: 'Help',
    items: [
      {
        id: 'h1',
        question: 'How long does it take to get new dentures?',
        answer: 'The process typically takes a few appointments over 1–3 weeks, depending on your treatment plan and customization needs.'
      },
      {
        id: 'h2',
        question: 'Can existing dentures be adjusted or repaired?',
        answer: 'Yes, we can adjust, reline, and repair most dentures to improve comfort, fit, and functionality.'
      },
      {
        id: 'h3',
        question: 'Will dentures affect my speech or eating habits?',
        answer: 'There may be a short adjustment period, but most patients quickly adapt and regain confidence in speaking and eating.'
      },
      {
        id: 'h4',
        question: 'How should I clean and maintain my dentures?',
        answer: 'Clean your dentures daily with a soft brush and denture cleanser. Avoid hot water and store them properly when not in use.'
      },
      {
        id: 'h5',
        question: 'How often should dentures be replaced?',
        answer: 'Most dentures last between 5–10 years, though regular check-ups are recommended to ensure proper fit and comfort.'
      },
      {
        id: 'h6',
        question: 'Do you offer same-day denture services?',
        answer: 'Certain repairs and adjustments may be completed on the same day. Contact us to discuss your specific requirements.'
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 's1',
        question: 'How can I contact support?',
        answer: 'You can contact our support team via phone, email, or through the contact form on our website.'
      },
      {
        id: 's2',
        question: 'What are your working hours?',
        answer: 'We are open Monday to Friday from 9:00 AM to 6:00 PM and Saturday from 10:00 AM to 4:00 PM.'
      },
      {
        id: 's3',
        question: 'Do you provide emergency services?',
        answer: 'Yes, emergency dental services are available. Please call our hotline immediately.'
      }
    ]
  },
  {
    id: 'booking',
    title: 'Book an appointment',
    items: [
      {
        id: 'b1',
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment online through our booking system or by calling reception.'
      },
      {
        id: 'b2',
        question: 'Can I reschedule my appointment?',
        answer: 'Yes, appointments can be rescheduled up to 24 hours in advance.'
      },
      {
        id: 'b3',
        question: 'Do you accept walk-ins?',
        answer: 'Walk-ins are accepted depending on availability, but booking is recommended.'
      }
    ]
  }
];


export interface FaqPageData extends InnerBannerData {
  seo: {
    title: string;
    metaDesc: string;
    canonical: string;

    opengraphTitle: string;
    opengraphDescription: string;
    opengraphType: string;
    opengraphSiteName: string;
    opengraphUrl: string;
    opengraphPublishedTime: string;
    opengraphModifiedTime: string;

    opengraphImage: {
      sourceUrl: string;
      altText: string;
      width: number | null;
      height: number | null;
    };

    twitterTitle: string;
    twitterDescription: string;

    twitterImage: {
      sourceUrl: string;
      altText: string;
    };

    schema: {
      raw: string;
    };
  } | null;
}
/**
 * FAQ Banner
 */
const GET_FAQ_BANNER = `
  query GetFaqBanner {
    page(id: 467, idType: DATABASE_ID) {
   title
      slug
      uri

      seo {
        title
        metaDesc
        canonical

        opengraphTitle
        opengraphDescription
        opengraphType
        opengraphSiteName
        opengraphUrl
        opengraphPublishedTime
        opengraphModifiedTime

        opengraphImage {
          sourceUrl
          altText

          mediaDetails {
            width
            height
          }
        }

        twitterTitle
        twitterDescription

        twitterImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }

        schema {
          raw
        }
      }

      faqPage {
        banner {
          tagline
          title
          description
        }
      }
    }
  }
`;

export async function getFaqBanner(): Promise<FaqPageData | null> {
  const data = await fetchGraphQL(GET_FAQ_BANNER);

  const page = data?.page;
  const banner = page?.faqPage?.banner;

  if (!banner) {
    return null;
  }

  return {
    tagline: banner.tagline ?? '',
    title: banner.title ?? '',
    description: banner.description ?? '',
    headingClassName: 'max-w-200',

    seo: page?.seo
      ? {
          title: page.seo.title ?? '',
          metaDesc: page.seo.metaDesc ?? '',
          canonical: page.seo.canonical ?? '',

          opengraphTitle: page.seo.opengraphTitle ?? '',
          opengraphDescription:
            page.seo.opengraphDescription ?? '',
          opengraphType: page.seo.opengraphType ?? '',
          opengraphSiteName:
            page.seo.opengraphSiteName ?? '',
          opengraphUrl: page.seo.opengraphUrl ?? '',
          opengraphPublishedTime:
            page.seo.opengraphPublishedTime ?? '',
          opengraphModifiedTime:
            page.seo.opengraphModifiedTime ?? '',

          opengraphImage: {
            sourceUrl:
              page.seo.opengraphImage?.sourceUrl ?? '',
            altText:
              page.seo.opengraphImage?.altText ?? '',
            width:
              page.seo.opengraphImage?.mediaDetails?.width ?? null,
            height:
              page.seo.opengraphImage?.mediaDetails?.height ?? null,
          },

          twitterTitle:
            page.seo.twitterTitle ?? '',
          twitterDescription:
            page.seo.twitterDescription ?? '',

          twitterImage: {
            sourceUrl:
              page.seo.twitterImage?.sourceUrl ?? '',
            altText:
              page.seo.twitterImage?.altText ?? '',
          },

          schema: {
            raw: page.seo.schema?.raw ?? '',
          },
        }
      : null,
  };
}

const GET_FAQS = `
query GetGeneralFAQs {
  faqCategory(id: "general", idType: SLUG) {
    faqs(first: 6) {
      nodes {
        id
        title
        content
      }
    }
  }
}
`;

export async function getFaqs() {
  const data = await fetchGraphQL(GET_FAQS);

  return (
    data?.faqCategory?.faqs?.nodes?.map((faq: any) => ({
      id: faq.id,
      question: faq.title,
      answer: faq.content,
    })) || []
  );
}

const GET_FAQ_GROUPS = `
query GetFAQGroups {
  faqCategories(first: 20) {
    nodes {
      id
      name
      faqs(first: 10) {
        nodes {
          id
          title
          content
        }
      }
    }
  }
}
`;

export async function getFaqGroups() {
  const data = await fetchGraphQL(GET_FAQ_GROUPS);

  return data.faqCategories.nodes.map((group: any) => ({
    id: group.id,
    title: group.name,
    items: group.faqs.nodes.map((faq: any) => ({
      id: faq.id,
      question: faq.title,
      answer: faq.content,
    })),
  }));
}


const GET_FAQ_GROUPS_CATEGORY = `
  query GetFAQGroupsCategory {
    faqCategories {
      nodes {
        id
        databaseId
        name

        faqs {
          nodes {
            id
            title
            content
          }
        }
      }
    }
  }
`;

export async function getFaqsCategory(
  categoryId?: string | number
) {
  if (!categoryId) {
    return [];
  }

  const data = await fetchGraphQL(GET_FAQ_GROUPS_CATEGORY);

  const categories = data?.faqCategories?.nodes || [];

  const category = categories.find(
    (item: any) =>
      String(item.databaseId) === String(categoryId)
  );

  if (!category) {
    return [];
  }

  return (
    category.faqs?.nodes?.map((faq: any) => ({
      id: faq.id,
      question: faq.title,
      answer: faq.content,
    })) || []
  );
}


const GET_FAQS_PAGE = `
  query GetFAQs($categoryId: ID!) {
    faqCategory(id: $categoryId, idType: DATABASE_ID) {
      faqs(first: 6) {
        nodes {
          id
          title
          content
        }
      }
    }
  }
`;

const GET_PAGE_FAQ_CATEGORY = `
  query GetPageFaqCategory($uri: ID!) {
    page(id: $uri, idType: URI) {
      faqSection {
        faqCategory {
          nodes {
            databaseId
          }
        }
      }
    }
  }
`;

export async function getFaqCategoryId(uri: string) {
  const data = await fetchGraphQL(GET_PAGE_FAQ_CATEGORY, {
    uri,
  });

  return (
    data?.page?.faqSection?.faqCategory?.nodes?.[0]?.databaseId ||
    null
  );
}

export async function getFaqsPage(categoryId: number | null) {
  if (!categoryId) {
    return [];
  }

  const data = await fetchGraphQL(GET_FAQS_PAGE, {
    categoryId,
  });

  return (
    data?.faqCategory?.faqs?.nodes?.map((faq: any) => ({
      id: faq.id,
      question: faq.title,
      answer: faq.content,
    })) || []
  );
}
import { fetchGraphQL } from '@/lib/graphql';
import type { ImageContentSectionData } from '@/components/common/ImageContentSection';
import { SeoType } from './page';
export const hero = {
  badge: {
    image: '/images/badge.png',
    alt: 'Always on the right path'
  },
  image: '/images/cdcp-banner.jpg',
  imgAlt: 'CDCP information',
  title: {
    highlight: 'CDCP information',
    text: 'Visit Us at Ziaee Denture Clinic.'
  },
  button: {
    label: 'Request an Appointment',
    href: '/contact-us'
  }
};
export const operates = {
  title: {
    highlight: 'The Canadian Dental Care Plan',
    text: 'operates under a mixed model'
  },
  content: `
      <p>The Canadian Dental Care Plan (CDCP) is a federal government program that helps eligible Canadians access affordable dental care. It is designed for people who do not have access to private dental insurance and meet certain income requirements.
      </p>
    `,
    image:'/images/people-celebrating-canada.jpg',
    imgAlt: 'Canadian Dental Care Pla',
};

export const coverage: ImageContentSectionData = {
  tagline: 'CDCP COVERAGE',
  title: {
    normal: '',
    highlight: 'Who',
    suffix: 'Qualifies?'
  },
  content: `
    <p>To be eligible for the CDCP, you must:</p>
   <ul class="list-disc pl-7 space-y-2">
 <li> Be a Canadian resident for tax purposes.</li>
 <li> Have filed your most recent Canadian tax return.</li>
 <li> Have an adjusted family net income of less than $90,000 per year.</li>
 <li> Not have access to dental insurance through an employer, pension, professional association, or private plan. This applies even if you choose not to enroll in the available coverage.</li>
    </ul>
    <p>To learn more about the plan and eligibility, visit CDCP Official Website. If you qualify, you can start the application process online. </p>
  `,
  image: '/images/old-man-sitting-dentist-office.jpg',
  imageAlt: 'Qualifies',
  imagePosition: 'left',
  button: {
    label: 'Apply Now',
    href: '/contact-us'
  }
};

export const GET_CDCP_PAGE = `
query GetCdcpPage {
  page(id: "cdcp-coverage", idType: URI) {
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
    cdcpPage {
      hero {
        image {
          node {
            sourceUrl
            altText
          }
        }
        titleHighlight
        title
        buttonLabel
        buttonLink
      }

      operates {
        titleHighlight
        title
        content
        image {
          node {
            sourceUrl
            altText
          }
        }
      }

      coverage {
        tagline
        titleHighlight
        titleSuffix
        content
        image {
          node {
            sourceUrl
            altText
          }
        }
        buttonLabel
        buttonLink
      }
    }
  }
}
`;

export interface CdcpPageData {
   title?: string;
  slug?: string;
  uri?: string;
  seo?: SeoType | null;
  hero: {
    image: string;
    imgAlt: string;
    title: {
      highlight: string;
      text: string;
    };
    button: {
      label: string;
      href: string;
    };
  };

  operates: {
    title: {
      highlight: string;
      text: string;
    };
    content: string;
    image: string;
    imgAlt: string;
  };

  coverage: ImageContentSectionData;
}

export async function getCdcpPage(): Promise<CdcpPageData | null> {
  try {
    const data = await fetchGraphQL(GET_CDCP_PAGE);

    const page = data?.page;

    if (!page?.cdcpPage) {
      return null;
    }

    const cdcpPage = page.cdcpPage;

    const coverageData: ImageContentSectionData = {
      tagline: cdcpPage.coverage?.tagline ?? "",

      title: {
        normal: "",
        highlight: cdcpPage.coverage?.titleHighlight ?? "",
        suffix: cdcpPage.coverage?.titleSuffix ?? "",
      },

      content: cdcpPage.coverage?.content ?? "",

      image:
        cdcpPage.coverage?.image?.node?.sourceUrl ?? "",

      imageAlt:
        cdcpPage.coverage?.image?.node?.altText ?? "",

      imagePosition: "left",

      button: {
        label: cdcpPage.coverage?.buttonLabel ?? "",
        href: cdcpPage.coverage?.buttonLink ?? "",
      },
    };

    return {
      title: page.title ?? "",
      slug: page.slug ?? "",
      uri: page.uri ?? "",

      seo: (page.seo ?? null) as SeoType | null,

      hero: {
        image:
          cdcpPage.hero?.image?.node?.sourceUrl ?? "",

        imgAlt:
          cdcpPage.hero?.image?.node?.altText ?? "",

        title: {
          highlight:
            cdcpPage.hero?.titleHighlight ?? "",

          text:
            cdcpPage.hero?.title ?? "",
        },

        button: {
          label:
            cdcpPage.hero?.buttonLabel ?? "",

          href:
            cdcpPage.hero?.buttonLink ?? "",
        },
      },

      operates: {
        title: {
          highlight:
            cdcpPage.operates?.titleHighlight ?? "",

          text:
            cdcpPage.operates?.title ?? "",
        },

        content:
          cdcpPage.operates?.content ?? "",

        image:
          cdcpPage.operates?.image?.node?.sourceUrl ?? "",

        imgAlt:
          cdcpPage.operates?.image?.node?.altText ?? "",
      },

      coverage: coverageData,
    };
  } catch (error) {
    console.error("CDCP Page GraphQL Error:", error);

    return null;
  }
}
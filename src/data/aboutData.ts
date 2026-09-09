import { fetchGraphQL } from "@/lib/graphql";
import type { ImageContentSectionData } from '@/components/common/ImageContentSection';
import { SeoType } from "./page";

export const hero = {
  badge: {
    image: '/images/badge.png',
    alt: 'Always on the right path'
  },
  image: '/images/artificial-jaw-dentist-s-office.jpg',
  imgAlt: 'PARTIAL DENTURES',
  title: {
    highlight: 'WELCOME TO',
    text: 'ZIAEE DENTURE CLINIC'
  },
  content: `    
      <p>At Ziaee Denture Clinic, we provide personalized denture care in a calm and modern setting. Our clinic carries our family name, <strong>Ziaee</strong>, which comes from the word Zia, meaning light or radiance. To us, this heritage represents our core purpose: helping bring clarity to your care and bringing a natural, confident smile back to your life.</p>
      <p>
   Whether you need new dentures, adjustments, relines, or repairs, our team is here to make sure you feel comfortable, informed, and supported every step of the way.
      </p>
      <p>
  We know dental care can feel overwhelming, so we keep our process simple and transparent. Before any treatment begins, we explain your coverage, eligibility, and any out-of-pocket costs in clear terms. We welcome Canadian Dental Care Plan (CDCP) patients and are always happy to help you navigate your options.
      </p>
      <p>Using modern technology like digital scanning, 3D design, precision milling, alongside traditional impressions, we focus on getting you an accurate, comfortable fit. From full custom dentures to quick repairs, our goal is simple: to help you eat, speak, and smile with ease.
</p>
    `,
  button: {
    label: 'Request an Assessment',
    href: '/contact-us'
  }
};
//whyUsData
export const whyUsData = {
  subtitle: 'WHY US',
  title: {
    highlight: 'Personalized denture care',
    text: 'designed for comfort and confidence'
  },
  stats: [
    {
      value: 98,
      suffix: '%',
      label: 'Patient Satisfaction',
      image: '/images/patient-satisfaction.png'
    },
    {
      value: 4.9,
      suffix: '*',
      label: 'Average Rating',
      image: '/images/rating.png'
    },
    {
      value: 2,
      suffix: 'K+',
      label: 'Patients Cared For',
      image: '/images/patients.png'
    }
  ]
};
export const meetSections: ImageContentSectionData = {
  title: {
    normal: '',
    highlight: 'A CLEAR',
    suffix: 'PATH TO COMFORT'
  },
  content: `
    <p>Denture care can seem overwhelming, especially if you are new to it. At Ziaee Denture Clinic, we make things simple, clear, and supportive from the start.</p>
    <p>We believe great care starts with listening. At your first visit, we learn about your needs, concerns, and denture history. This helps us understand what feels uncomfortable and what you want to improve.</p>
    <p>From your first custom fit assessment to comfort adjustments and follow-up care, our team guides you every step of the way. We explain your treatment options clearly and help you find comfortable, personalized solutions for daily use and confidence.</p>
  `,
  image: '/images/meet-our-denturist.jpg',
  imageAlt: 'Meet Our Denturist',
  imagePosition: 'left',
  button: {
    label: 'Request an Assessment',
    href: '/contact-us'
  }
};
export const testimonials = {
  tagline: 'CDCP COVERAGE',
  title: {
    highlight: 'HAPPY',
    text: 'PATIENTS SAYING'
  },
  backgroundImage: '/images/testimonial.jpg',
  items: [
    {
      quote:
        'I was nervous about getting dentures, but the entire team made the process comfortable and stress-free. My new dentures fit perfectly, and I can finally smile with confidence again.',
      author: 'SARAH M.'
    },
    {
      quote:
        'The staff was caring, patient, and attentive to my needs. They explained every step and made sure my dentures felt natural. I could not be happier with the results.',
      author: 'ROBERT T.'
    },
    {
      quote:
        'After years of struggling with missing teeth, this clinic gave me a new sense of confidence. Eating and speaking have become so much easier.',
      author: 'LINDA P.',
      featured: true
    },
    {
      quote:
        'Excellent service from start to finish. The team listened to my concerns and created dentures that look natural and feel comfortable every day.',
      author: 'MICHAEL D.'
    },
    {
      quote:
        'I appreciate the professionalism and kindness shown throughout my treatment. My dentures fit beautifully, and my quality of life has improved tremendously.',
      author: 'PATRICIA W.'
    }
  ]
};


export const GET_ABOUT_PAGE = `
query GetAboutPage {
  page(id: "about-us", idType: URI) {
      title
      slug

      seo {
        title
        metaDesc
        canonical

        opengraphTitle
        opengraphDescription
        opengraphType
        opengraphSiteName
        opengraphUrl

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
      }
    aboutPage {
      hero {
        titleHighlight
        title
        content
        buttonLabel
        buttonLink
      }

      whyUs {
        subtitle
        titleHighlight
        title
      }

      meetSection {
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

export interface AboutPageData {
   seo?: SeoType | null;

  title?: string | null;
  hero: {
    title: {
      highlight: string;
      text: string;
    };
    content: string;
    button: {
      label: string;
      href: string;
    };
  };

  whyUsData: {
    subtitle: string;
    title: {
      highlight: string;
      text: string;
    };
  };

  meetSections: ImageContentSectionData;
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  const data = await fetchGraphQL(GET_ABOUT_PAGE);

  const page = data?.page?.aboutPage;

  if (!page) return null;
const seo = data?.page?.seo ?? null;
  const meetSections: ImageContentSectionData = {
    title: {
      normal: '',
      highlight: page.meetSection?.titleHighlight ?? '',
      suffix: page.meetSection?.titleSuffix ?? '',
    },
    content: page.meetSection?.content ?? '',
    image: page.meetSection?.image?.node?.sourceUrl ?? '',
    imageAlt: page.meetSection?.image?.node?.altText ?? '',
    imagePosition: 'left',
    button: {
      label: page.meetSection?.buttonLabel ?? '',
      href: page.meetSection?.buttonLink ?? '',
    },
  };

  return {
    seo,

      title:
        data?.page?.title ?? null,
    hero: {
      title: {
        highlight: page.hero?.titleHighlight ?? '',
        text: page.hero?.title ?? '',
      },
      content: page.hero?.content ?? '',
      button: {
        label: page.hero?.buttonLabel ?? '',
        href: page.hero?.buttonLink ?? '',
      },
    },

    whyUsData: {
      subtitle: page.whyUs?.subtitle ?? '',
      title: {
        highlight: page.whyUs?.titleHighlight ?? '',
        text: page.whyUs?.title ?? '',
      },
    },

    meetSections,
  };
}
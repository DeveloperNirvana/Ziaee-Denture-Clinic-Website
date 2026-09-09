import type { InnerBannerData } from '@/components/common/InnerBanner';
import type { SeoType } from '@/data/page';

import { fetchGraphQL } from '@/lib/graphql';

export const servicesBanner: InnerBannerData = {
  tagline: 'OUR SERVICES',

  title:
    'DIGITAL DENTURE SERVICES IN VANCOUVER, BC',

  description:
    'From new dentures to adjustments and repairs, Ziaee Denture Clinic helps patients find comfortable, personalized solutions for everyday function and confidence.',

  buttons: [
    {
      label: 'Request an Assessment',
      href: '/contact-us',
      color: 'white',
    },
  ],

  badge: {
    image: '/images/badge.png',
    alt: 'Always on the right path',
  },
};

export const servicesListData = {
  tagline: 'OUR SERVICES',

  title: {
    highlight: 'DENTURE',
    text: 'SERVICES MADE CLEAR',
  },

  description:
    'From new dentures to adjustments and repairs, Ziaee Denture Clinic helps patients find comfortable, personalized solutions for everyday function and confidence.',

  buttonText: 'View All Services',

  buttonLink: '/services',

  services: [
    // Keep your existing fallback services here
  ],
};

export const serviceCta = {
  title: 'Smile with confidence',

  image: '/images/smiley-woman-posing.png',

  alt: 'Always on the right path',

  buttons: [
    {
      label: 'Request an Assessment',
      href: '/contact-us',
      color: 'white',
    },
  ],
};


/* =========================================================
   SERVICES + YOAST SEO
========================================================= */

const GET_SERVICES = `
  query GetServicesPage {

    page(id: "services", idType: URI) {

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

      children(
        first: 15
      ) {
        nodes {

          ... on Page {

            title
            slug
            uri
            menuOrder
            excerpt

            serviceCard {
              cardLabel
            }

            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function getServices() {
  try {
    const data =
      await fetchGraphQL(GET_SERVICES);

    const page = data?.page;

    const pages: any[] =
      page?.children?.nodes ?? [];

    const services = pages
      .sort(
        (a, b) =>
          (a.menuOrder ?? 0) -
          (b.menuOrder ?? 0)
      )
      .map((page) => ({
        label:
          page.serviceCard?.cardLabel || '',

        title: page.title,

        description:
          page.excerpt?.replace(
            /<[^>]*>/g,
            ''
          ) || '',

        image:
          page.featuredImage?.node
            ?.sourceUrl || '',

        href: page.uri,
      }));

    return {
      services,

      seo:
        page?.seo ?? null,

      title:
        page?.title ?? null,
    };
  } catch (error) {
    console.error(
      'Services GraphQL Error:',
      error
    );

    return {
      services: [],
      seo: null,
      title: null,
    };
  }
};


/* =========================================================
   SERVICES BANNER
========================================================= */

const GET_SERVICES_BANNER = `
  query GetServicesBanner {

    page(id: "services", idType: URI) {

      servicesPage {

        banner {

          tagline
          title
          description

          buttons {
            label
            href
            color
          }

          badge {

            image {

              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function getServicesBanner(): Promise<
  InnerBannerData | null
> {
  try {
    const data =
      await fetchGraphQL(
        GET_SERVICES_BANNER
      );

    const banner =
      data?.page?.servicesPage?.banner;

    if (!banner) {
      return null;
    }

    return {
      tagline:
        banner.tagline ?? '',

      title:
        banner.title ?? '',

      description:
        banner.description ?? '',

      buttons:
        banner.buttons?.length
          ? banner.buttons.map(
              (button: any) => ({
                label:
                  button.label ?? '',

                href:
                  button.href ?? '',

                color:
                  button.color ?? 'white',
              })
            )
          : [],

      badge: {
        image:
          banner.badge?.image?.node
            ?.sourceUrl ?? '',

        alt:
          banner.badge?.image?.node
            ?.altText ?? '',
      },
    };
  } catch (error) {
    console.error(
      'Services Banner GraphQL Error:',
      error
    );

    return null;
  }
}
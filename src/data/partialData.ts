import type { ImageContentSectionData } from '@/components/common/ImageContentSection';
import { fetchGraphQL } from "@/lib/graphql";
const needSections: ImageContentSectionData = {
  title: {
    normal: '',
    highlight: 'When',
    suffix: 'do I need Partial Dentures?'
  },
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.</p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
  `,
  image: '/images/old-man-sitting-dentist-s-office.jpg',
  imageAlt: 'Partial Dentures',
  imagePosition: 'right',
  button: {
    label: 'Request an Assessment',
    href: '/contact-us'
  }
};
const removableSections: ImageContentSectionData = {
  title: {
    normal: 'What does it it feel like wearing',
    highlight: 'Removable Partial',
    suffix: 'Denturist'
  },
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. </p>
    <p>
Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.</p>
  `,
  image: '/images/close-up-old-person-portrait.jpg',
  imageAlt: 'Removable Partial Dentures',
  imagePosition: 'left',
  button: {
    label: 'Request an Assessment',
    href: '/contact-us'
  }
};
export const partialData = {
  hero: {
    badge: {
      image: '/images/badge.png',
      alt: 'Always on the right path'
    },
    image: '/images/artificial-jaw-dentist-s-office.jpg',
    imgAlt: 'PARTIAL DENTURES',
    title: {
      highlight: 'PARTIAL DENTURES',
      text: 'WE HELP GREAT PEOPLE GET GREAT DENTURES'
    },
    button: {
      label: 'Request an Appointment',
      href: '/contact-us'
    }
  },
  qualityDentures: {
    title: {
      highlight: 'QUALITY DENTURES',
      text: 'CUSTOM MADE TO YOUR NEEDS'
    },
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>
      Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. 
      </p>
      <p>
      Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
      </p>
    `
  },
  needSections,
  removableSections
};




const GET_SERVICE = `
query GetServicePage($uri: ID!) {
  page(id: $uri, idType: URI) {
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
    serviceDetails {
     faqCategory {
          nodes {
            databaseId
          }
        }
      hero {
        heroTitleHighlight
        heroTitle
        heroImage {
          node {
            sourceUrl
          }
        }
        heroImageAlt
        heroButtonText
        heroButtonLink
      }

      qualitySection {
        titleHighlight
        title
        content
      }

      sectionOne {
        titleNormal
        titleHighlight
        titleSuffix
        content
        image {
          node {
            sourceUrl
          }
        }
        imageAlt
        imagePosition
        buttonText
        buttonLink
      }

      sectionTwo {
        titleNormal
        titleHighlight
        titleSuffix
        content
        image {
          node {
            sourceUrl
          }
        }
        imageAlt
        imagePosition
        buttonText
        buttonLink
      }
    }
  }
}
`;
export async function getServiceDetailsPage(
  slug: string
) {
  try {
    const data = await fetchGraphQL(
      GET_SERVICE,
      {
        uri: `/services/${slug}`,
      }
    );

    const page = data?.page;

    const serviceDetails =
      page?.serviceDetails;

    if (!serviceDetails) {
      return null;
    }

    // ACF Taxonomy field returns a connection.
    // Get the selected taxonomy term database ID.

    const faqCategory =
      serviceDetails?.faqCategory
        ?.nodes?.[0]?.databaseId ?? null;

    return {
      ...serviceDetails,

      title:
        page?.title ?? '',

      slug:
        page?.slug ?? '',

      seo:
        page?.seo ?? null,

      faqCategory,
    };
  } catch (error) {
    console.error(
      'Service Details GraphQL Error:',
      error
    );

    return null;
  }
}
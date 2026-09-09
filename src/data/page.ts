import { fetchGraphQL } from '@/lib/graphql';

export type OpenGraphImageType = {
  sourceUrl?: string | null;
  altText?: string | null;

  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
};

export type SeoType = {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;

  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphType?: string | null;
  opengraphSiteName?: string | null;
  opengraphUrl?: string | null;

  opengraphImage?: OpenGraphImageType | null;

  twitterTitle?: string | null;
  twitterDescription?: string | null;

  twitterImage?: OpenGraphImageType | null;
};

export type WordPressPage = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri?: string;
  content?: string;

  /**
   * Yoast SEO data
   */
  seo?: SeoType | null;

  innerBannerSection?: {
    tagline?: string;
    title?: string;
    description?: string;

    image?: {
      node?: {
        sourceUrl?: string;
        altText?: string;
      };
    };
  };
};

export async function getPageBySlug(
  slug: string[]
): Promise<WordPressPage | null> {
  try {
    const uri = `/${slug.join('/')}/`;

    const query = `
      query GetPage($uri: ID!) {
        page(id: $uri, idType: URI) {
          id
          databaseId
          title
          slug
          uri
          content

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

          innerBannerSection {
            tagline
            title
            description

            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `;

    const data = await fetchGraphQL(query, {
      uri,
    });

    return data?.page || null;
  } catch (error) {
    console.error(
      'Error fetching WordPress page:',
      error
    );

    return null;
  }
}
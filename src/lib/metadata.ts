import type { Metadata } from 'next';
import { SITE_URL, WP_URL } from '@/lib/env';

export interface OpenGraphImageType {
  sourceUrl?: string | null;
  altText?: string | null;

  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
}

export interface SeoType {
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
}

const clean = (
  value?: string | null
): string | undefined => {
  return value?.trim()
    ? value.trim()
    : undefined;
};

function toFrontendUrl(
  url?: string | null
): string | undefined {
  const value = clean(url);

  if (!value) {
    return undefined;
  }

  const normalise = (
    pathname: string
  ): string => {
    return pathname.replace(/\/+$/, '') || '';
  };

  if (value.startsWith('/')) {
    return `${SITE_URL}${normalise(value)}`;
  }

  try {
    const parsed = new URL(value);

    /*
     * Convert WordPress URL to
     * Next.js frontend URL.
     */
    if (
      parsed.origin ===
      new URL(WP_URL).origin
    ) {
      return `${SITE_URL}${normalise(
        parsed.pathname
      )}${parsed.search}`;
    }

    return value;
  } catch {
    return undefined;
  }
}

function ogImage(
  image?: OpenGraphImageType | null
) {
  const url = clean(image?.sourceUrl);

  if (!url) {
    return undefined;
  }

  return [
    {
      url,

      alt: clean(image?.altText),

      width:
        image?.mediaDetails?.width ??
        undefined,

      height:
        image?.mediaDetails?.height ??
        undefined,
    },
  ];
}

export function MetaData(
  seo?: SeoType | null,
  fallback?: Metadata
): Metadata {
  const title =
    clean(seo?.title) ??
    fallback?.title ??
    undefined;

  const description =
    clean(seo?.metaDesc) ??
    fallback?.description ??
    undefined;

  const canonical =
    toFrontendUrl(seo?.canonical);

  const images = ogImage(
    seo?.opengraphImage
  );

  const twitterImageUrl =
    clean(
      seo?.twitterImage?.sourceUrl
    );

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    alternates: canonical
      ? {
          canonical,
        }
      : undefined,

    openGraph: {
      type:
        seo?.opengraphType === 'article'
          ? 'article'
          : 'website',

      title:
        clean(
          seo?.opengraphTitle
        ) ?? title,

      description:
        clean(
          seo?.opengraphDescription
        ) ?? description,

      siteName:
        clean(
          seo?.opengraphSiteName
        ),

      url:
        toFrontendUrl(
          seo?.opengraphUrl
        ) ?? canonical,

      images,
    },

    twitter: {
      card: 'summary_large_image',

      title:
        clean(
          seo?.twitterTitle
        ) ??
        clean(
          seo?.opengraphTitle
        ) ??
        title,

      description:
        clean(
          seo?.twitterDescription
        ) ??
        clean(
          seo?.opengraphDescription
        ) ??
        description,

      images:
        twitterImageUrl ??
        images?.[0]?.url,
    },
  };
}
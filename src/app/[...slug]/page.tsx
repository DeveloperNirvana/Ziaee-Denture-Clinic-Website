import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/components/common/Container';
import InnerBanner from '@/components/common/InnerBanner';

import { getPageBySlug } from '@/data/page';
import { MetaData } from '@/lib/metadata';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

/**
 * Generate SEO metadata from Yoast SEO
 */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return MetaData(page.seo, {
    title: page.title,
  });
}

export default async function SinglePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* Inner Banner */}
      {page.innerBannerSection && (
        <InnerBanner
          data={{
            tagline:
              page.innerBannerSection.tagline || '',

            title:
              page.innerBannerSection.title ||
              page.title,

            description:
              page.innerBannerSection.description || '',

            image:
              page.innerBannerSection.image?.node
                ?.sourceUrl || '',

            imageAlt:
              page.innerBannerSection.image?.node
                ?.altText || page.title,
          }}
        />
      )}

      {/* Page Content */}
      <section className="py-10 lg:py-16">
        <Container>
          {page.content && (
            <div
              className="mt-8 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: page.content,
              }}
            />
          )}
        </Container>
      </section>
    </>
  );
}
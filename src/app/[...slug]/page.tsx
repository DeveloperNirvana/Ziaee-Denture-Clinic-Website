import type { Metadata } from 'next';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';

// Placeholder pages — keep them out of search indexes until real content ships.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};
export default async function SinglePage({ params }: PageProps) {
  const { slug } = await params;
  const title = slug
    .join(' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return (
    <>
        <section className="py-10 lg:py-16">
        <Container>
          <Heading>{title} Page</Heading>
        </Container>
      </section>
    </>
  );
}

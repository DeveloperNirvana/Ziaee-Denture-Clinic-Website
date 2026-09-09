import Link from 'next/link';

import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import InnerBanner from '@/components/common/InnerBanner';

export default function NotFound() {
  return (
    <>
       <InnerBanner
        variant="centered"
        data={{
          tagline: '404',
          title: 'Page',
          description:
            'Sorry, the page you are looking for could not be found.',
        }}
      />

      <section className="py-12 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h2" variant="xl">
              Oops! Page Not Found
            </Heading>

            <p className="mt-4 text-gray-600">
              The page you are looking for may have been removed,
              renamed, or is temporarily unavailable.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-white transition hover:opacity-90"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
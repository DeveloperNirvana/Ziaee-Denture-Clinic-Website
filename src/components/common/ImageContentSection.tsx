'use client';

import Image from 'next/image';
import Container from '../common/Container';
import Heading from '../common/Heading';
import Button from '../common/Button';
import Tagline from './Tagline';

export interface ImageContentSectionData {
  tagline?: string;
  title: {
    normal?: string;
    highlight?: string;
    suffix?: string;
  };
  content: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  button?: {
    label: string;
    href: string;
  };
}

interface ImageContentSectionProps {
  data?: ImageContentSectionData;
  className?: string;
}

export default function ImageContentSection({
  data,
  className = '',
}: ImageContentSectionProps) {
  if (!data) return null;

  const isImageLeft = data.imagePosition === 'left';

  return (
    <section className={`space-py ${className}`}>
      <Container>
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className={isImageLeft ? 'lg:order-1' : 'lg:order-2'}>
            {data.image && (
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={data.image}
                  alt={data.imageAlt || 'Service Image'}
                  width={800}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className={isImageLeft ? 'order-2' : 'order-1'}>
            {data.tagline && (
              <Tagline title={data.tagline} className="mb-2" />
            )}

            <Heading
              as="h2"
              variant="xxl"
              className="max-w-xl leading-none uppercase text-secondary"
            >
              {data.title.normal}{' '}
              {data.title.highlight && (
                <span className="font-bold text-primary">
                  {data.title.highlight}
                </span>
              )}{' '}
              {data.title.suffix}
            </Heading>

            {data.content && (
              <div
                className="mt-4 max-w-none space-y-5 text-base text-secondary"
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
              />
            )}

            {data.button?.label && data.button?.href && (
              <div className="mt-10">
                <Button
                  href={data.button.href}
                  arrow
                  arrowStyle="circle"
                  rounded="full"
                  className="pr-1"
                  color="primary"
                >
                  {data.button.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import Button, { type ButtonItem } from '@/components/common/Button';
import Heading from './Heading';
import Tagline from './Tagline';
export type BreadcrumbItem = {
  label: string;
  href?: string;
};
export type InnerBannerData = {
  tagline?: string;
  title?: string;
  description?: string;
  buttons?: ButtonItem[];
  headingClassName?: string;
  descriptionClassName?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
  date?: string;
  readTime?: string;
  badge?: {
    image: string;
    alt?: string;
  };
};
type InnerBannerProps = {
  data: InnerBannerData;
  variant?: 'default' | 'centered' | 'split';
  className?: string;
};
export default function InnerBanner({ data, variant = 'default', className = '' }: InnerBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const rawImageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [80, -80]);
  const imageY = useSpring(rawImageY, {
    stiffness: 90,
    damping: 24,
    mass: 0.8
  });
  const breadcrumbs = data.breadcrumbs ?? [];
  const buttons = data.buttons ?? [];
  const renderBreadcrumbs = () => {
    if (!breadcrumbs.length) return null;
    return (
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/90 md:text-base">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <div key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-opacity hover:opacity-80">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {!isLast && <span>/</span>}
            </div>
          );
        })}
      </nav>
    );
  };
  const renderButtons = () => {
    if (!buttons.length) return null;
    return (
      <div className="flex flex-wrap gap-4">
        {buttons.map((button, index) => (
          <Button
            key={`${button.label}-${index}`}
            href={button.href}
            target={button.target}
            rel={button.rel}
            type={button.type}
            variant={button.variant ?? 'solid'}
            color={button.color ?? 'primary'}
            size={button.size ?? 'md'}
            rounded={button.rounded ?? 'full'}
            animation={button.animation ?? 'slide-right'}
            leftIcon={button.leftIcon}
            rightIcon={button.rightIcon}
            disabled={button.disabled}
            arrow={true}
            arrowStyle="circle"
            loading={button.loading}
            fullWidth={button.fullWidth}
            className={`pr-1 ${button.className}`}
            onClick={button.onClick}>
            {button.label}
          </Button>
        ))}
      </div>
    );
  };
  return (
    <section ref={sectionRef} className={`relative overflow-hidden bg-white-blue px-4 pb-4 pt-4 lg:pt0 ${className}`}>
      {variant !== 'split' && (
        <>
          {data.image ? (
            <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 scale-110">
              <Image fill priority sizes="100vw" src={data.image} alt={data.imageAlt || data.title || 'Banner'} className="object-cover opacity-30" />
            </motion.div>
          ) : (
            <div className="absolute top-4 lg:top-0 left-4 right-4 bottom-4 bg-secondary rounded-xl" />
          )}
        </>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {variant === 'centered' && (
          <div className="flex  flex-col items-center justify-center text-center py-10 lg:py-30">
                  {data.date && data.readTime && (
                  <div className="mb-7  text-sm text-white/30 ">
                    {data.date} • {data.readTime}
                  </div>
                )}
            {data.tagline && <Tagline title={data.tagline} className="mb-4 text-white" />}
            {data.title && (
              <Heading as="h1" variant="xxl" className={`text-white-blue font-semibold!  ${data.headingClassName ?? ''}`}>
                {data.title}
              </Heading>
            )}
            {data.description && <p className={`mt-6 max-w-2xl text-white/90 ${data.descriptionClassName ?? ''}`}>{data.description}</p>}
            {renderButtons()}
            {breadcrumbs.length > 0 && <div className="mt-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-10">{renderBreadcrumbs()}</div>}
          </div>
        )}
        {(!variant || variant === 'default') && (
          <div className="grid gap-6 lg:gap-12 lg:grid-cols-12  py-6 lg:pb-20 lg:pt-35 xl:pt-40">
            <div className="lg:col-span-7">
              {data.title && (
                <Heading as="h1" variant="xxl" className={`text-white  ${data.headingClassName ?? ''}`}>
                  {data.tagline && <span className="text-[100%] block text-white-blue font-bold">{data.tagline}</span>} {data.title}
                </Heading>
              )}
            </div>
            <div className="lg:col-span-5">
              {data.description && (
                <p className={`text-base xl:text-xl leading-snug text-white-blue font-bold ${data.descriptionClassName ?? ''}`}>
                  {data.description}
                </p>
              )}
              {breadcrumbs.length > 0 && <div className="mt-6 ">{renderBreadcrumbs()}</div>}
              {(buttons.length > 0) && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
                  {renderButtons()}           
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {variant === 'split' && (
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="bg-secondary lg:py-40 rounded-xl">
            <div className="mx-auto flex h-full lg:max-w-3xl items-center p-6 lg:px-14">
              <div>
                {data.tagline && <Tagline title={data.tagline} className="mb-4 text-white" />}
                {data.title && (
                  <Heading as="h1" variant="xxl" className={`text-white-blue  font-semibold!  ${data.headingClassName ?? ''}`}>
                    {data.title}
                  </Heading>
                )}
                {data.description && <p className={`mt-6 lg:max-w-xl text-white ${data.descriptionClassName ?? ''}`}>{data.description}</p>}
                {data.date && data.readTime && (
                  <div className="mt-5  text-sm text-white/30 ">
                    {data.date} • {data.readTime}
                  </div>
                )}
                {buttons.length > 0 && <div className="mt-5 lg:mt-12">{renderButtons()}</div>}
              </div>
            </div>
          </div>
          <div className="relative min-h-120 lg:min-h-full rounded-xl">
            {data.image && (
              <Image sizes="100vw" fill priority src={data.image} alt={data.imageAlt || data.title || 'Banner'} className="object-cover rounded-xl" />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

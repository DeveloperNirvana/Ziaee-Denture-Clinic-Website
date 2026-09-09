'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import Container from '../common/Container';
import 'swiper/css';
import 'swiper/css/pagination';
type ServiceCardType = {
  category: string;
  title: string;
  description: string;
  href: string;
};
type BannerSlideType = {
  highlight?: string;
  title?: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
};
type HomeBannerDataType = {
  highlight?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  mainImage: string;
  mainImageAlt: string;
  badgeImage?: string;
  buttonIcon?: IconType;
  serviceCard: ServiceCardType;
  slides?: BannerSlideType[];
};
type HomeBannerPropsType = {
  data: HomeBannerDataType;
};
export default function HomeBanner({ data }: HomeBannerPropsType) {
  const {
    highlight,
    title,
    description,
    buttonText,
    buttonHref,
    mainImage,
    mainImageAlt,
    buttonIcon: ButtonIcon = FiArrowUpRight,
    serviceCard,
    slides,
  } = data;
  const bannerSlides: BannerSlideType[] = slides?.length
    ? slides
    : [
        {
          highlight: highlight ?? '',
          title: title ?? '',
          description: description ?? '',
          buttonText: buttonText ?? '',
          buttonHref: buttonHref ?? '#',
        },
        {
          highlight: 'CDCP',
          title: 'CANADIAN DENTAL CARE PLAN (CDCP) PATIENTS WELCOME',
          description:
            'We warmly welcome eligible Canadian Dental Care Plan patients. Our friendly team will walk you through your coverage, assist with your paperwork, and explain your treatment options clearly before we begin.',
          buttonText: 'Learn About CDCP Coverage',
          buttonHref: '/cdcp-coverage',
        },
      ];
  return (
    <section className="w-full bg-white-blue pt-5 lg:pt-0">
      <Container className="lg:max-w-[98%]!">
        <div className="grid overflow-hidden rounded-2xl lg:grid-cols-2 gap-3">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={mainImage}
              alt={mainImageAlt}
              priority
              width={705}
              height={830}
              className="w-full rounded-2xl"
            />
            <div className="mt-4 sm:mt-0 w-full sm:absolute sm:bottom-4 sm:left-4 flex flex-wrap overflow-hidden md:bottom-8 md:left-8">
              <div className="w-full sm:w-57.5">
                <div className="flex-1 rounded-2xl bg-black/50 sm:bg-white/40 backdrop-blur-3xl xl:bg-white/20 p-3 text-white xl:backdrop-blur-md">
                  <span className="mb-1 text-[10px] text-white-blue uppercase">
                    {serviceCard?.category ?? ''}
                  </span>
                  <h3 className="mb-4 text-xl font-bold uppercase leading-tight text-white-blue">
                    {serviceCard?.title ?? ''}
                  </h3>
                  <p className="text-sm text-white-blue">
                    {serviceCard?.description ?? ''}
                  </p>
                </div>
              </div>
              <Link
                href={serviceCard?.href ?? '#'}
                className="mt-2 sm:mt-0 flex w-full h-15 sm:h-auto sm:w-25 items-center justify-center rounded-2xl bg-secondary/15 sm:bg-white-blue hover:bg-white-blue/80 duration-300"
              >
                <ButtonIcon className="text-4xl text-secondary" />
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center bg-secondary px-6 py-10 md:py-16 text-center lg:px-16 overflow-hidden rounded-2xl">
            <div className="w-full max-w-130">
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: '.custom-swiper-pagination',
                  clickable: true,
                  bulletActiveClass: '!bg-white !w-6 !rounded-full',
                  bulletClass:
                    'inline-block w-2.5 h-2.5 bg-white/40 rounded-full mx-1 duration-300 cursor-pointer',
                }}
                className="w-full"
              >
                {bannerSlides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <motion.h1
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                      }}
                      className="text-4xl font-normal uppercase leading-[1.1]! text-white md:text-[40px] xl:text-[42px]"
                    >
                      {slide.highlight ? (
                        <motion.span
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.15,
                            duration: 0.6,
                            ease: 'easeInOut',
                          }}
                          className="text-[120%] font-bold block text-white-blue"
                        >
                          {slide.highlight}
                        </motion.span>
                      ) : null}
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.45,
                        duration: 1,
                        ease: 'easeInOut',
                      }}
                      className="mx-auto mt-1 max-w-md text-sm leading-snug text-white md:text-base"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.6,
                        duration: 1,
                        ease: 'easeInOut',
                      }}
                    >
                      <Button
                        href={slide.buttonHref ?? buttonHref}
                        rounded="full"
                        size="md"
                        arrow
                        arrowStyle="circle"
                        color="white"
                        className="pr-1 mt-8 inline-flex"
                      >
                        {slide.buttonText}
                      </Button>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="custom-swiper-pagination relative z-10 mt-8 flex items-center justify-center" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
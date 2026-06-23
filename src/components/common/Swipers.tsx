'use client';
import { Children, ReactNode, RefObject, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
  FreeMode,
  Keyboard,
  Mousewheel,
  Scrollbar,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCards,
  EffectCoverflow,
  Thumbs,
  Controller
} from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import type { SwiperProps } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
type SwipersProps = SwiperProps & {
  children: ReactNode;
  slideClassName?: string;
  prevRef?: RefObject<HTMLElement | null>;
  nextRef?: RefObject<HTMLElement | null>;
  paginationRef?: RefObject<HTMLElement | null>;
  continuous?: boolean;
  continuousSpeed?: number;
};
export default function Swipers({
  children,
  slideClassName,
  prevRef,
  nextRef,
  paginationRef,
  continuous = false,
  continuousSpeed = 8000,
  onBeforeInit,
  ...props
}: SwipersProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    if (prevRef?.current || nextRef?.current || paginationRef?.current) {
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
        swiper.params.navigation.prevEl = prevRef?.current;
        swiper.params.navigation.nextEl = nextRef?.current;
      }
      if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
        swiper.params.pagination.el = paginationRef?.current;
      }
      swiper.navigation?.destroy();
      swiper.navigation?.init();
      swiper.navigation?.update();
      swiper.pagination?.destroy();
      swiper.pagination?.init();
      swiper.pagination?.render();
      swiper.pagination?.update();
    }
    if (continuous) {
      swiper.wrapperEl.style.transitionTimingFunction = 'linear';
    }
  }, [prevRef, nextRef, paginationRef, continuous]);
  return (
    <Swiper
      observer
      observeParents
      resizeObserver
      className="w-full"
      modules={[
        Navigation,
        Pagination,
        Autoplay,
        FreeMode,
        Keyboard,
        Mousewheel,
        Scrollbar,
        EffectFade,
        EffectCube,
        EffectFlip,
        EffectCards,
        EffectCoverflow,
        Thumbs,
        Controller
      ]}
      loop={continuous ? true : props.loop}
      allowTouchMove={continuous ? false : props.allowTouchMove}
      speed={continuous ? continuousSpeed : props.speed}
      autoplay={
        continuous
          ? {
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }
          : props.autoplay
      }
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
        if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
          swiper.params.navigation.prevEl = prevRef?.current ?? null;
          swiper.params.navigation.nextEl = nextRef?.current ?? null;
        }
        if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
          swiper.params.pagination.el = paginationRef?.current ?? null;
        }
        if (continuous) {
          swiper.wrapperEl.style.transitionTimingFunction = 'linear';
        }
        onBeforeInit?.(swiper);
      }}
      {...props}>
      {Children.map(children, (child, index) => (
        <SwiperSlide key={index} className={slideClassName}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

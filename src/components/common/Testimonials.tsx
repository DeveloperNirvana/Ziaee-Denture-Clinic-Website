'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Container from '../common/Container';
import Heading from '../common/Heading';
interface TestimonialsProps {
  data: {
    tagline: string;
    title: {
      highlight: string;
      text: string;
    };
    backgroundImage: string;
    items: {
      quote: string;
      author: string;
      featured?: boolean;
    }[];
  };
}
export default function Testimonials({ data }: TestimonialsProps) {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);
  return (
    <section className="pb-10 pt-14 lg:pt-25 relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image src={data.backgroundImage} alt={data.title.text} fill className="object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-secondary/65" />
      </div>
      <Container>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative">
            <div className="grid md:grid-cols-[0.8fr_1.5fr] items-center gap-3">
              <p className="text-base uppercase tracking-wide text-white-blue">{data.tagline}</p>
              <Heading as="h2" variant="xl" className=" text-white uppercase">
                <span className="font-bold">{data.title.highlight}</span> {data.title.text}
              </Heading>
            </div>
            <div className="mt-10 lg:mt-20 xl:mt-70">
              <Swiper
                spaceBetween={8}
                slidesPerView={1.15}
                breakpoints={{
                  640: {
                    slidesPerView: 2
                  },
                  768: {
                    slidesPerView: 3
                  },
                  1024: {
                    slidesPerView: 4
                  },
                  1280: {
                    slidesPerView: 5
                  }
                }}>
                {data.items.map((item, index) => (
                  <SwiperSlide key={index} className="h-auto">
                    <div className="flex h-full min-h-80 flex-col justify-between rounded-xl p-5  bg-white/90 text-secondary backdrop-blur-3xl hover:bg-[#58C9C1] hover:text-white  duration-700">
                      <p className="text-base leading-tight">{item.quote}</p>
                      <p className="mt-6 text-lg font-bold uppercase lg:text-xl">— {item.author}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

'use client';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '@/components/common/Button';
import CoverageCard from '../cards/CoverageCard';
import CoverageCardMobile from '../cards/CoverageCardMobile';
import Container from '../common/Container';
import Heading from '../common/Heading';
import Swipers from '../common/Swipers';
import Tagline from '../common/Tagline';
export interface CoverageSectionProps {
  data: {
    subtitle: string;
    title: {
      highlight: string;
      text: string;
    };
    description: string;
    backgroundImage: string;
    button: {
      label: string;
      href: string;
    };
    disclaimer: string;
    cards: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
}
export default function CoverageBlock({ data }: CoverageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['14%', '-14%']);
  const movePercentage = Math.max(50, (data.cards.length - 2) * 35);
  const cardsX = useTransform(scrollYProgress, [0, 1], ['30%', `-${movePercentage}%`]);
  const smoothCardsX = useSpring(cardsX, {
    stiffness: 222,
    damping: 120,
    mass: 0.8
  });
  return (
    <>
      <section ref={sectionRef} className="relative h-auto lg:h-[600vh] overflow-hidden lg:overflow-visible">
        <div className="lg:sticky lg:top-0 h-auto lg:h-200 overflow-hidden py-14 lg:py-25">
          <motion.div style={{ y: imageY }} className="absolute inset-0">
            <Image src={data.backgroundImage} alt={data.title.text} fill priority className="object-cover scale-130" />
          </motion.div>
          <div className="absolute inset-0 bg-secondary/50" />
          <Container className="relative z-15">
            <div className="grid lg:grid-cols-[410px_1fr] w-full">
              <Tagline title={data.subtitle} className="text-white-blue" />
              <div>
                <Heading className="text-white-blue" variant="xxl">
                  <span className="font-bold text-white">{data.title.highlight}</span> {data.title.text}
                </Heading>
                <p className="mt-3 lg:max-w-124.5 text-base text-white">{data.description}</p>
                <Button href={data.button.href} color="white" rounded="full" arrow arrowStyle="circle" className="mt-8 pr-1">
                  {data.button.label}
                </Button>
              </div>
            </div>
            <motion.div style={{ x: smoothCardsX }} className="gap-6 h-55 mt-25 items-start will-change-transform  hidden lg:flex">
              {data.cards.map((card, index) => (
                <CoverageCard key={card.title} card={card} index={index} progress={scrollYProgress} totalCards={data.cards.length} />
              ))}
            </motion.div>
            <div className="mt-10 lg:hidden">
              <Swipers
                slidesPerView={1.1}
                spaceBetween={16}
                speed= {1600}
                loop
                breakpoints={{
                  640: {
                    slidesPerView: 1.2
                  },
                  768: {
                    slidesPerView: 2
                  }
                }}>
                {data.cards.map((card) => (
                  <CoverageCardMobile key={card.title} data={card} />
                ))}
              </Swipers>
            </div>
            <p className="mt-10 w-full text-sm text-white-blue/50">{data.disclaimer}</p>
          </Container>
        </div>
      </section>
    </>
  );
}

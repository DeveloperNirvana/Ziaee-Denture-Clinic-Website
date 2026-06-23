'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
interface TechnologyCardsProps {
  data: {
    eyebrow: string;
    title: string;
    image: string;
    description: string;
    note: string;
  }[];
}
export default function TechnologyCards({ data }: TechnologyCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length]);
  const getPosition = (index: number) => {
    return (index - activeIndex + data.length) % data.length;
  };
  return (
    <div className="relative pt-140 sm:pt-170 lg:h-180 w-full text-base text-secondary max-w-160 mx-auto lg:mx-0">
      {data.map((card, index) => {
        const position = getPosition(index);
        if (position > 2) return null;
        return (
          <motion.div
            key={`${card.title}-${index}`}
            className="absolute inset-0 overflow-hidden"
            animate={{
              scale: position === 0 ? 1 : position === 1 ? 0.96 : 0.92,
              y: position === 0 ? 0 : position === 1 ? 24 : 48,
              x: position === 0 ? 0 : position === 1 ? 24 : 48,
              opacity: position === 0 ? 1 : position === 1 ? 0.85 : 0.65
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              zIndex: 30 - position
            }}>
            <div className="flex flex-col px-4 pb-2  bg-white">
              <span className="text-[10px] uppercase text-secondary transition-colors duration-500">{`{ ${card.eyebrow} }`}</span>
              <h3 className=" text-xl font-bold uppercase leading-tight text-secondary transition-colors duration-500">{card.title}</h3>
            </div>
            <div className="flex flex-col">
              <div className="relative w-full">
                <Image src={card.image} alt={card.title} width={660} height={499} className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col pb-6 px-4 bg-white mt-6 lg:pr-20 leading-snug">
                  <p>{card.description}</p>
                  <p className="mt-3 text-sm text-secondary/15">{card.note}</p>
            </div>
          </motion.div>
        );
      })}
      <div className="relative lg:absolute lg:bottom-35 lg:right-4 z-50 flex items-center justify-center gap-2 mt-8">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary' : 'bg-primary/30'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

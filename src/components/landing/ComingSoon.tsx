'use client';
import Image from 'next/image';
import { HiArrowUpRight } from 'react-icons/hi2';
import { FaFacebookF, FaInstagram } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
const icons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  location: IoLocationSharp
};
type SocialIcon = 'facebook' | 'instagram' | 'location';
type Props = {
  data: {
    logo: {
      title: string;
      subtitle: string;
    };
    hero: {
      title: string;
      description: string;
      image: string;
    };
    newsletter: {
      tag: string;
      title: string;
      placeholder: string;
      buttonLabel?: string;
    };
    socialLinks: {
      icon: SocialIcon;
      href: string;
      label: string;
    }[];
  };
};
export default function ComingSoon({ data }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const fillWidth = useTransform(scrollYProgress, [0, 1], ['-200%', '200%']);
  const letters = data.hero.title.split('');
  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white-blue xl:bg-transparent">
      <div className="grid lg:grid-cols-2">
        <div className="relative z-10">
          <motion.div
            style={{ width: fillWidth }}
            className="hidden xl:block absolute inset-y-0 right-0 bg-white-blue rounded-2xl -mr-7 z-5"
          />
          <div className="relative z-10 h-full flex flex-col justify-center px-6 py-10 lg:py-16 xl:px-16">
            <div className="mx-auto max-w-xl text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut'
                }}
                className="mb-8 lg:mb-24">
                <motion.h2
                  initial={{ opacity: 0, letterSpacing: '0.08em' }}
                  animate={{ opacity: 1, letterSpacing: '0.06em' }}
                  transition={{
                    duration: 1,
                    delay: 0.2
                  }}
                  className="font-sans-flex text-[25px] uppercase tracking-[0.06em] text-secondary whitespace-nowrap">
                  {data.logo.title}
                </motion.h2>
                <div className="flex items-center justify-center gap-3 overflow-hidden">
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 64, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.6
                    }}
                    className="h-px bg-secondary"
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay:  0.4
                    }}
                    className="font-sans-flex text-[17px] font-bold tracking-[0.3em] text-secondary">
                    {data.logo.subtitle}
                  </motion.span>
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 64, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.6
                    }}
                    className="h-px bg-secondary"
                  />
                </div>
              </motion.div>
              <motion.h1 className="mb-4 max-w-xs text-[66px] mx-auto font-bold uppercase tracking-tight text-secondary md:text-[70px] lg:max-w-max  lg:text-[70px] 2xl:text-[80px] lg:whitespace-nowrap leading-none!">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.5
                    }}
                    className="inline-block">
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.h1>
              <p className="mx-auto max-w-sm text-base leading-relaxed text-secondary">{data.hero.description}</p>
            </div>
            <div className="lg:absolute lg:bottom-6 lg:left-6 flex items-center gap-1 justify-center lg:justify-start mt-6 lg:mt-0">
              {data.socialLinks.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15 text-white transition-all duration-700 hover:bg-secondary">
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <Image src={data.hero.image} alt={data.hero.title} width={710} height={830} priority className="h-auto w-full rounded-2xl" />
          <div className="relative p-4 sm:p-0 sm:absolute sm:bottom-5 sm:right-4 flex  w-full sm:max-w-100">
            <div className="flex-1 rounded-2xl bg-black/50 sm:bg-white/40 backdrop-blur-3xl xl:bg-white/20 p-3 text-white xl:backdrop-blur-md">
              <p className="mb-1 text-[10px] tracking-[0.2em] text-white-blue">{data.newsletter.tag}</p>
              <h3 className="mb-4 text-xl font-bold uppercase leading-tight text-white-blue">{data.newsletter.title}</h3>
              <input
                type="email"
                placeholder={data.newsletter.placeholder}
                className="h-12.5 w-full rounded-full border-0 bg-white-blue/50 px-6 text-secondary outline-none placeholder:text-secondary/50"
              />
            </div>
            <button className="group flex w-16 sm:w-24 items-center justify-center rounded-2xl bg-secondary/10 sm:bg-white-blue text-[#004d43] transition-colors sm:hover:bg-[#cfe0e0]">
              <HiArrowUpRight className="size-8 -translate-y-1 transition-all duration-700 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

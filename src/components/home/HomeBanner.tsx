'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { IconType } from 'react-icons';
import Button from '../common/Button';
import Container from '../common/Container';
import { motion } from 'framer-motion';
type HomeBannerData = {
  highlight?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  mainImage: string;
  badgeImage: string;
  buttonIcon?: IconType;
  features: {
    label: string;
  }[];
  serviceCard: {
    image: string;
    category: string;
    title: string;
    description: string;
    href: string;
  };
};
interface HomeBannerProps {
  data: HomeBannerData;
}
export default function HomeBanner({ data }: HomeBannerProps) {
  const {
    highlight,
    title,
    description,
    buttonText,
    buttonHref,
    mainImage,
    badgeImage,
    buttonIcon: ButtonIcon = FiArrowUpRight,
    features,
    serviceCard
  } = data;
  return (
    <section className="w-full bg-white-blue pt-5 lg:pt-0">
      <Container className="lg:max-w-[98%]!">
        <div className="grid overflow-hidden rounded-2xl lg:grid-cols-2 gap-3">
          <div className="relative rounded-2xl overflow-hidden">
            <Image src={mainImage} alt={title} priority width={705} height={830} className="w-full rounded-2xl" />
   <div className="absolute left-4 top-4 flex max-w-75 flex-wrap gap-2 md:left-8 lg:top-20 xl:top-50">
  {features.map((item, index) => (
    <motion.span
      key={item.label}
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.85,
        filter: 'blur(8px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
 
      className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium text-white-blue backdrop-blur-md duration-500 hover:bg-white-blue hover:text-secondary">
      {item.label}
    </motion.span>
  ))}
</div>
            <div className="mt-4 sm:mt-0 w-full sm:absolute sm:bottom-4 sm:left-4 flex flex-wrap overflow-hidden md:bottom-8 md:left-8">
              <div className="w-full mb-4 sm:mb-0">
                <div className="relative h-37.5 sm:w-57.5">
                  <Image src={serviceCard.image} alt={serviceCard.title} fill className="object-cover rounded-2xl" />
                </div>
              </div>
              <div className="w-full sm:w-57.5">
                <div className="flex-1 rounded-2xl bg-black/50 sm:bg-white/40 backdrop-blur-3xl xl:bg-white/20 p-3 text-white xl:backdrop-blur-md">
                  <span className="mb-1 text-[10px] text-white-blue uppercase">{serviceCard.category}</span>
                  <h3 className="mb-4 text-xl font-bold uppercase leading-tight text-white-blue">{serviceCard.title}</h3>
                  <p className="text-sm text-white-blue">{serviceCard.description}</p>
                </div>
              </div>
              <Link
                href={serviceCard.href}
                className="mt-2 sm:mt-0 flex w-full h-15 sm:h-auto sm:w-25 items-center justify-center rounded-2xl bg-secondary/15 sm:bg-white-blue hover:bg-white-blue/80 duration-300">
                <ButtonIcon className="text-4xl text-secondary" />
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center bg-secondary px-6 py-10 md:py-16 text-center lg:px-16 overflow-hidden rounded-2xl">
            <div className="max-w-130">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="text-4xl font-normal uppercase leading-none text-white md:text-[50px]">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="text-[120%] font-bold block text-white-blue">
                  {highlight}
                </motion.span>
                {title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1.2,
                 ease: "easeInOut",
                }}
                className="md:-mt-20 flex justify-center">
                <Image src={badgeImage} alt="Clinic Badge" width={121} height={121} className="object-contain mx-auto md:ml-auto md:mr-0" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45,
                  duration: 1,
                  ease: "easeInOut",
                }}
                className="mx-auto mt-1 max-w-md text-sm leading-snug text-white md:text-base">
                {description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50,}}
                animate={{ opacity: 1, y: 0,}}
                transition={{
                  delay: 0.6,
                  duration: 1,
                 ease: "easeInOut",
                }}>
                <Button href={buttonHref} rounded="full" size="md" arrow arrowStyle="circle" color="white" className="pr-1 mt-8">
                  {buttonText}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

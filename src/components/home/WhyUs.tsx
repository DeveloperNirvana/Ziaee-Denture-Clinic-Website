'use client';
import Image from 'next/image';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '../common/Container';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
interface WhyUsProps {
  data: {
    subtitle: string;
    title: {
      highlight: string;
      text: string;
    };
    image: string;
    tags: {
      label: string;
      top: string;
      left: string;
    }[];
    stats: {
      value: number;
      suffix: string;
      label: string;
      image: string;
    }[];
  };
}
function StatCounter({
  data
}: {
  data: {
    value: number;
    suffix: string;
    label: string;
    image: string;
  };
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });
  return (
    <div ref={ref}>
      <h3 className="font-adrianna text-primary text-5xl font-light xl:text-6xl 2xl:text-[80px]">
        {inView ? <CountUp end={data.value} duration={2.5} decimals={data.value % 1 !== 0 ? 1 : 0} /> : 0}
        {data.suffix}
      </h3>
      <p className="mt-1 text-base text-secondary">{data.label}</p>
      <div className="mt-4">
        <Image src={data.image} alt={data.label} width={90} height={40} className="h-10 w-auto rounded-full object-cover mx-auto lg:mx-0" />
      </div>
    </div>
  );
}
export default function WhyUs({ data }: WhyUsProps) {
  return (
    <section className="overflow-hidden bg-white-blue py-16 xl:py-24 text-center lg:text-left">
      <Container size="lg">
        <Tagline title={data.subtitle} className="w-fit mb-2 lg:-mb-8 mx-auto lg:mx-0" />
        <div className="grid gap-10 lg:grid-cols-[400px_1fr]">
          <div className="lg:order-2">
            <Heading className="text-white-blue" variant="xxl">
              <span className="lg:block text-primary font-bold">{data.title.highlight}</span>
              <span className="lg:block text-secondary">{data.title.text}</span>
            </Heading>
            <div className="mt-16 lg:mt-44 grid gap-8 sm:grid-cols-3 max-w-195 mx-auto lg:mx-0">
              {data.stats.map((item) => (
                <StatCounter key={item.label} data={item} />
              ))}
            </div>
          </div>
          <div className="relative lg:order-1 lg:mt-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative mx-auto w-full max-w-105 -left-7 sm:left-0">
              <motion.div
                animate={{
                  y: [-10, 10, -10]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}>
                <Image src={data.image} alt="Tooth" width={420} height={520} className="w-full object-contain" />
              </motion.div>
              {data.tags.map((tag, index) => (
                <motion.div
                  key={tag.label}
                  className="absolute"
                  style={{
                    top: tag.top,
                    left: tag.left
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    x: [-4, 4, -4]
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}>
                  <span className="rounded-full bg-secondary/15 px-4 py-2 text-sm text-white shadow-lg backdrop-blur whitespace-nowrap">
                    {tag.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

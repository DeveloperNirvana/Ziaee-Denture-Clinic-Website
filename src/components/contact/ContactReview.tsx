'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
interface ContactReviewProps {
  data: {
    quote: string;
    author: string;
  }[];
}
export default function ContactReview({ data }: ContactReviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (data.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);
  return (
    <section className="bg-white-blue py-14 xl:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}>
            <h2 className="text-2xl leading-tight text-secondary xl:text-4xl">{data[activeIndex].quote}</h2>
            <div className="mx-auto my-10 h-px w-20 bg-primary" />
            <p className="text-2xl text-secondary xl:text-4xl">— {data[activeIndex].author}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-3">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Review ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all duration-500 ${
                activeIndex === index ? 'scale-125 bg-primary' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';
import Image from 'next/image';
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';
interface CoverageCardProps {
  card: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}
export default function CoverageCard({ card, index, totalCards, progress }: CoverageCardProps) {
  const start = index / totalCards;
  const middle = (index + 0.5) / totalCards;
  const end = (index + 1) / totalCards;
  const scaleRaw = useTransform(progress, [start, middle, end], [0.92, 1, 0.92]);
  const yRaw = useTransform(progress, [start, middle, end], [0, -20, 0]);
  const heightRaw = useTransform(progress, [start, middle, end], [110, 220, 110]);
  const activeOpacity = useTransform(progress, [start, middle, end], [0, 1, 0]);
  const inactiveOpacity = useTransform(progress, [start, middle, end], [1, 0, 1]);
  const scale = useSpring(scaleRaw, {
    stiffness: 140,
    damping: 24
  });
  const y = useSpring(yRaw, {
    stiffness: 140,
    damping: 24
  });
  const cardHeight = useSpring(heightRaw, {
    stiffness: 140,
    damping: 24
  });
  return (
    <motion.div
      style={{
        scale,
        y,
        height: cardHeight
      }}
      className="relative w-85 shrink-0 overflow-hidden rounded-2xl will-change-transform">
      <motion.div style={{ opacity: inactiveOpacity }} className="absolute inset-0">
        <div className="flex h-26.5 flex-col justify-between rounded-2xl border border-white/30 bg-white/20 p-5 backdrop-blur-3xl">
          <div>
            <p className="text-[10px] uppercase text-white-blue">{`{${card.eyebrow}}`}</p>
            <h3 className="mt-2 text-xl font-bold uppercase leading-none text-white-blue">{card.title}</h3>
          </div>
        </div>
      </motion.div>
      <motion.div style={{ opacity: activeOpacity }} className="absolute inset-0">
        <div className="flex h-58 flex-col rounded-2xl bg-white p-4 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase text-secondary">{`{${card.eyebrow}}`}</p>
              <h3 className="mt-2 text-xl font-bold uppercase leading-none text-secondary">{card.title}</h3>
            </div>
            <Image src={card.image} alt={card.title} width={100} height={100} className="h-25 w-25 rounded-2xl object-cover -mt-2 -mr-2" />
          </div>
          <div className="mt-auto">
            <p className="text-base leading-snug text-secondary pb-5">{card.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

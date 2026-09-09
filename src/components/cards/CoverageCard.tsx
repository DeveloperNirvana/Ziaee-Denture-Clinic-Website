'use client';
import Image from 'next/image';
interface CoverageCardProps {
  card: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
}
export default function CoverageCard({ card }: CoverageCardProps) {
  return (
    <div className="group relative h-35 hover:h-60 w-full shrink-0 overflow-hidden rounded-2xl duration-300 cursor-pointer">
      <div className="absolute inset-0 rounded-2xl bg-primary p-5 transition-transform duration-500 group-hover:-translate-y-full">
        <p className="text-[10px] uppercase text-white-blue">{`{${card.eyebrow}}`}</p>
        <h3 className="mt-2 max-w-50 text-xl font-bold uppercase leading-none text-white-blue">{card.title}</h3>
      </div>
      <div className="absolute flex flex-col justify-between inset-0 translate-y-full rounded-2xl bg-white p-4 shadow-2xl transition-transform duration-500 group-hover:translate-y-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase text-secondary">{`{${card.eyebrow}}`}</p>
            <h3 className="mt-2 text-xl font-bold uppercase leading-none text-secondary">{card.title}</h3>
          </div>
          <Image src={card.image} alt={card.title} width={100} height={100} className="-mr-2 -mt-2 h-25 w-25 rounded-2xl object-cover" />
        </div>
        <div className="pt-2">
          <p className="text-base leading-snug text-secondary">{card.description}</p>
        </div>
      </div>
    </div>
  );}

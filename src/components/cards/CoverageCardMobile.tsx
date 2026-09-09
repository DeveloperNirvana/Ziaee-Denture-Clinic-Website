'use client';
import Image from 'next/image';
interface CoverageCardMobileProps {
  data: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
}
export default function CoverageCardMobile({ data }: CoverageCardMobileProps) {
  return (
    <div className="flex min-h-55 h-full flex-col rounded-2xl bg-white p-2 sm:p-4 hover:bg-primary/30 duration-700 cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase text-secondary">{`{${data.eyebrow}}`}</p>
          <h3 className="mt-2 text-xl font-bold uppercase leading-none text-secondary">{data.title}</h3>
        </div>
        <Image src={data.image} alt={data.title} width={100} height={100} className="h-25 w-25 rounded-2xl object-cover" />
      </div>
      <div className="mt-auto pt-2 pb-2">
        <p className="text-base leading-tight text-secondary">{data.description}</p>
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
interface CareGuideCardProps {
  data: {
    id?: number;
    tagline?: string;
    title: string;
    link: string;
    description: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
  };
  index: number;
}
export default function CareGuideCard({ data, index }: CareGuideCardProps) {
  const number = index + 1;
  if (number === 1) {
    return (
      <Link
        href={data.link}
        className="relative h-full overflow-hidden rounded-[20px] bg-white-blue  grid md:grid-cols-[1fr_380px] lg:col-span-12 min-h-95 group">
        <div>
          <div className="max-w-175 relative z-10 p-5 lg:p-8 ">
            <p className="mb-1 text-[10px] uppercase text-secondary duration-500 group-hover:text-white-blue">{`{${data.tagline}}`}</p>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase leading-none duration-500 text-secondary xl:text-[40px] group-hover:text-white-blue">
              {data.title}
            </h3>
            <p className="mt-5 max-w-137.5 text-base leading-snug text-secondary group-hover:text-white-blue duration-500">
              {data.description}
            </p>
            <p className="mt-3 text-sm text-secondary/15">
              {data.date} • {data.readTime}
            </p>
          </div>
          <div className="absolute bottom-5 left-5 flex h-14 w-14 lg:h-20  lg:w-20 items-center justify-center rounded-2xl bg-white text-secondary z-10">
            <FiArrowUpRight size={34} className="duration-500 group-hover:rotate-45" />
          </div>
        </div>
        <div className="relative min-h-80 group-hover:absolute group-hover:inset-0 duration-500">
          <Image src={data.image} alt={data.title} fill className="object-cover" />
        </div>
      </Link>
    );
  }
  if (number === 2) {
    return (
      <Link
        href={data.link}
        className="relative h-full overflow-hidden rounded-[20px] bg-primary p-5 lg:p-8 lg:col-span-6 min-h-95 group duration-500">
        <Image src={data.image} alt={data.title} fill className="object-cover opacity-0 group-hover:opacity-100 duration-500" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 duration-500" />
        <div className="absolute right-5 top-5 flex h-14 w-14 lg:h-20  lg:w-20 items-center justify-center rounded-2xl bg-white text-secondary z-10">
          <FiArrowUpRight size={34} className="duration-500 group-hover:rotate-45" />
        </div>
        <div className="flex h-full flex-col justify-end relative z-10">
          <p className="mb-1 text-[10px] uppercase text-white-blue">{`{${data.tagline}}`}</p>
          <h3 className="text-2xl sm:text-3xl font-bold uppercase leading-none text-white-blue xl:text-[40px]">{data.title}</h3>
          <p className="mt-5 max-w-137.5 text-base leading-snug text-white-blue">{data.description}</p>
          <p className="mt-3 text-sm text-white-blue/50">
            {data.date} • {data.readTime}
          </p>
        </div>
      </Link>
    );
  }
  if (number === 3) {
    return (
      <Link href={data.link} className="group relative h-full overflow-hidden rounded-[20px] lg:col-span-6 min-h-95">
        <Image src={data.image} alt={data.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 duration-500  group-hover:bg-black/50 " />
        <div className="absolute bottom-3 left-3 right-3 flex gap-y-1 z-10">
          <div className="flex-1 rounded-2xl bg-white/20 p-4 backdrop-blur-md">
            <p className="mb-1 text-[10px] uppercase text-white-blue">{`{${data.tagline}}`}</p>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase leading-none text-white-blue xl:text-[40px]">{data.title}</h3>
            <p className="mt-3 text-sm text-white-blue/80">
              {data.date} • {data.readTime}
            </p>
          </div>
          <div className="flex h-auto w-25 items-center justify-center rounded-2xl bg-[#dceaea] text-secondary">
            <FiArrowUpRight size={34} className="duration-500 group-hover:rotate-45" />
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={data.link}
      className="relative h-full overflow-hidden rounded-[20px] bg-primary p-5 lg:p-8 lg:col-span-6 min-h-95 group duration-500">
      <Image src={data.image} alt={data.title} fill className="object-cover opacity-0 group-hover:opacity-100 duration-500" />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 duration-500" />
      <div className="absolute right-5 top-5 flex h-14 w-14 lg:h-20  lg:w-20 items-center justify-center rounded-2xl bg-white text-secondary z-10">
        <FiArrowUpRight size={34} className="duration-500 group-hover:rotate-45" />
      </div>
      <div className="flex h-full flex-col justify-end relative z-10">
        <p className="mb-1 text-[10px] uppercase text-white-blue">{`{${data.tagline}}`}</p>
        <h3 className="text-2xl sm:text-3xl font-bold uppercase leading-none text-white-blue xl:text-[40px]">{data.title}</h3>
        <p className="mt-5 max-w-137.5 text-base leading-snug text-white-blue">{data.description}</p>
        <p className="mt-3 text-sm text-white-blue/50">
          {data.date} • {data.readTime}
        </p>
      </div>
    </Link>
  );
}

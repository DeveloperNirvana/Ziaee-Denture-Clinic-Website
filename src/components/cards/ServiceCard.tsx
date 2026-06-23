import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
interface ServiceCardProps {
  data: {
    label: string;
    title: string;
    description: string;
    image?: string;
    href: string;
  };
}
export default function ServiceCard({ data }: ServiceCardProps) {
  return (
    <Link href={data.href} className="group block relative h-82.5 overflow-hidden rounded-2xl bg-[#EAF4F2]">
      {data.image && (
        <>
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover scale-110 opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-liner-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </>
      )}
      <div className="relative z-10 flex h-full flex-col p-3">
        <span className="text-[10px] uppercase text-secondary transition-colors duration-500 group-hover:text-white-blue">
        {`{ ${data.label} }`}
        </span>
        <h3 className="mt-1 text-xl font-bold uppercase leading-tight text-secondary transition-colors duration-500 group-hover:text-white-blue max-w-47">
          {data.title}
        </h3>

        <p className="relative mt-4 text-[15px] leading-[1.35] text-[#184D49] transition-all duration-500 group-hover:text-white group-hover:bottom-3 group-hover:absolute bottom-0 pr-14">
          {data.description}
        </p>

        <div className="mt-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white transition-all duration-500 group-hover:bg-white/20 group-hover:backdrop-blur-md group-hover:ml-auto mr-0">
            <FiArrowUpRight className="text-4xl text-secondary transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}

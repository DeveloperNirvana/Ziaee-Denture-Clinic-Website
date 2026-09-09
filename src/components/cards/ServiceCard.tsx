import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
type ServiceCardItemType = {
  href: string;
  image?: string;
  title: string;
  label: string;
  description: string;
};
type ServiceCardPropsType = {
  data: ServiceCardItemType;
  className?: string;
  headingclassName?: string;
};
export default function ServiceCard({ data, className = '', headingclassName = '' }: ServiceCardPropsType) {
  return (
    <Link href={data?.href ?? '#'} className={`group block relative h-82.5 overflow-hidden rounded-2xl bg-[#EAF4F2] ${className}`}>
      {data?.image ? (
        <>
          <Image
            src={data.image}
            alt={data?.title ?? ''}
            fill
            sizes="100vw"
            className="object-cover scale-100 opacity-100 transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
          />
          <div className="absolute inset-0 bg-black/40 opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
        </>
      ) : null}
      <div className="relative z-10 flex h-full flex-col p-3">
        <span className="text-[10px] uppercase text-white-blue transition-colors duration-500 group-hover:text-secondary">
          {`{ ${data?.label ?? ''} }`}
        </span>
        <h3
          className={`mt-1 text-xl font-bold uppercase leading-tight text-white-blue transition-colors duration-500 group-hover:text-secondary max-w-47 ${headingclassName}`}>
          {data?.title ?? ''}
        </h3>
        <p className="absolute bottom-3 mt-4 text-[15px] leading-[1.35] text-white transition-all duration-500 group-hover:text-[#184D49] group-hover:relative group-hover:bottom-0 pr-16">
          {data?.description ?? ''}
        </p>
        <div className="mt-auto">
          <div className="ml-auto mr-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:backdrop-blur-none group-hover:ml-0">
            <FiArrowUpRight className="rotate-45 text-4xl text-white transition-all duration-500 group-hover:rotate-0 group-hover:text-secondary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

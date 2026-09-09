import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
interface BlogCardProps {
  data: {
    id: number;
    slug: string;
    category: string;
    title: string;
    excerpt?: string;
    date: string;
    readTime: string;
    image: string;
  };
}
export default function BlogCard({ data }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white-blue p-3 transition-all duration-300 hover:-translate-y-1">
      <Link href={`/blog/${data.slug}`} className="relative mb-5 pt-[59%] overflow-hidden rounded-xl">
        <Image src={data.image} alt={data.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col px-2 pb-2">
        <span className="mb-2 text-[10px] uppercase text-secondary">{`{${data.category}}`}</span>
        <h3 className="mb-4 line-clamp-2 text-2xl leading-none font-semibold uppercase text-secondary">{data.title}</h3>
        <div className="mb-8 text-sm text-secondary/30">
          {data.date} • {data.readTime}
        </div>
        <div className="mt-auto flex justify-end">
          <Link
            href={`/blog/${data.slug}`}
            className="flex h-11 w-11 lg:w-12 lg:h-12 items-center justify-center rounded-lg bg-white text-[#0B4A46]">
            <FiArrowUpRight size={20} className="duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </article>
  );
}

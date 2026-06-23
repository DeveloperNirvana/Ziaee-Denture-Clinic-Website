'use client';
import Image from 'next/image';
import { HiArrowUpRight } from 'react-icons/hi2';
import Container from '../common/Container';
import Tagline from '../common/Tagline';
import Link from 'next/link';
type Props = {
  data: {
    tag: string;
    title: {
      highlight: string;
      text: string;
    };
    description: string;
    image: string;
    services: {
      title: string;
      image: string;
    }[];
    supportCard: {
      tag: string;
      title: string;
      description: string;
    };
  };
};
export default function CoverageSection({ data }: Props) {
  return (
    <section className="pb-10">
      <Container size="lg">
        <div className="grid gap-8 rounded-xl bg-white-blue p-2 lg:grid-cols-[1fr_550px]">
          <div className="flex flex-col items-center lg:justify-between lg:items-start p-4 lg:p-6">
            <Tagline title={data.tag} className='xl:mt-15' />
            <div className="mt-3 max-w-2xl text-center lg:text-left">
              <h2 className="mb-6 text-4xl leading-none text-secondary lg:text-[50px] uppercase mx-auto lg:mx-0">
                <span className="font-bold text-primary">{data.title.highlight}</span> {data.title.text}
              </h2>
              <p className="max-w-sm text-secondary mx-auto lg:mx-0">{data.description}</p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 gap-3 max-w-73 sm:max-w-147 mx-auto lg:mx-0 w-full">
              {data.services.map((item) => (
                <div key={item.title} className="group relative">
                  <div className="overflow-hidden rounded-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={290}
                      height={150}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 group-hover:left-0 group-hover:bottom-0 group-hover:h-full group-hover:w-full transition-all duration-700 flex items-center justify-center rounded-full bg-white/20 px-5 capitalize backdrop-blur-xl py-2 h-8 w-36">
                    <span className="text-xs text-white-blue transition-all duration-500 group-hover:text-base">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl group">
            <div className="overflow-hidden">
              <Image
                src={data.image}
                alt={data.title.text}
                width={500}
                height={700}
                className="h-full w-full object-cover group-hover:scale-110 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row max-w-92.5">
              <div className="flex-1 rounded-2xl bg-white/20 p-4 backdrop-blur-md">
                <p className="mb-1 text-[10px] tracking-[0.2em] text-white-blue">{data.supportCard.tag}</p>
                <h3 className="mb-4 text-xl font-bold uppercase leading-tight text-white-blue">{data.supportCard.title}</h3>
                <p className="text-sm text-white-blue">{data.supportCard.description}</p>
              </div>
              <Link href="/" className="group flex w-full sm:w-24 items-center justify-center rounded-2xl bg-[#DCECEC]">
                <HiArrowUpRight className="size-8 text-secondary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

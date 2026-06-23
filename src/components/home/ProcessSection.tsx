'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
import Container from '../common/Container';
gsap.registerPlugin(ScrollTrigger);
interface ProcessSectionProps {
  data: {
    tagline: string;
    title: {
      highlight: string;
      text: string;
    };
    description: string;
    steps: {
      number: string;
      eyebrow: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
}
export default function ProcessSection({ data }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  useGSAP(() => {
    if (!sectionRef.current) return;
    const totalSteps = data.steps.length;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(totalSteps - 1, Math.floor(progress * totalSteps));
        if (index === currentIndex.current) return;
        currentIndex.current = index;
        setActiveIndex(index);
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out'
          }
        );
      }
    });
    return () => {
      trigger.kill();
    };
  }, [data.steps.length]);
  const activeStep = data.steps[activeIndex];
  return (
    <section className=" bg-white-blue mx-4 rounded-2xl py-10 lg:py-14 xl:py-24 mb-4">
      <Container>
        <div className="w-full">
          <Tagline title={data.tagline} className="mb-3 xl:mb-26" />
          <Heading className="text-white-blue max-w-180" variant="xxl">
            <span className="text-primary font-bold">{data.title.highlight}</span>
            <span className="text-secondary"> {data.title.text}</span>
          </Heading>
          <p className="max-w-130 leading-snug text-secondary mt-3">{data.description}</p>
        </div>
        <div ref={sectionRef} className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="hidden lg:block">
            <div ref={contentRef} className="sticky top-24">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[1.45] rounded-2xl">
                  <Image
                    src={activeStep.image}
                    alt={activeStep.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 60vw"
                  />
                </div>
                <div className="absolute left-4 bottom-4 right-4 max-w-100 rounded-2xl bg-white/20 p-4 backdrop-blur-xl">
                  <p className="mb-1 text-[10px] tracking-[0.2em] text-white-blue">{`{${activeStep.eyebrow}}`}</p>
                  <h3 className="mb-4 text-xl font-bold uppercase leading-tight text-white-blue">{activeStep.title}</h3>
                  <p className="text-sm leading-snug text-white-blue">{activeStep.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-secondary/50" />
            <div className="pl-8">
              {data.steps.map((step, index) => {
                const active = index === activeIndex;
                return (
                  <div key={step.number} className={`process-step relative ${index !== data.steps.length - 1 ? 'pb-15' : ''}`}>
                    <div
                      className={`absolute -left-8.25 top-0 w-1 transition-all duration-500 ${active ? 'h-full bg-primary' : 'h-0'} ${
                        index <= activeIndex ? 'h-full bg-primary' : 'bg-transparent'
                      }`}
                    />
                    <div className="flex gap-3">
                      <div
                        className={`text-[50px] font-normal leading-none transition-all duration-500 ${
                          active ? 'text-primary' : 'text-secondary/50'
                        }`}>
                        {step.number}
                      </div>
                      <div>
                        <div
                          className={`mt-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-500 ${
                            active ? 'text-secondary' : 'text-secondary/50'
                          }`}>
                          {`{${step.eyebrow}}`}
                        </div>
                        <h4
                          className={`mt-1 text-xl font-bold uppercase transition-all duration-500 ${
                            active ? 'text-secondary' : 'text-secondary/50'
                          }`}>
                          {step.title}
                        </h4>
                      </div>
                    </div>
                    <div className="mt-6 overflow-hidden rounded-xl lg:hidden">
                      <div className="relative aspect-[1.45]">
                        <Image src={step.image} alt={step.title} fill className="object-cover" sizes="100vw" />
                      </div>
                      <div className="bg-secondary/10 p-5">
                        <p className="text-sm leading-relaxed text-secondary">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

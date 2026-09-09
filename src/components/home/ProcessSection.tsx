'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
import Container from '../common/Container';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export interface StepType {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}
export interface ProcessSectionType {
  tagline: string;
  title: {
    highlight: string;
    text: string;
  };
  description: string;
  steps: StepType[];
}
export interface ProcessSectionProps {
  data: ProcessSectionType;
}
export default function ProcessSection({ data }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const steps = data?.steps ?? [];
  const totalSteps = steps.length;
  const currentIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  useGSAP(
    () => {
      if (!sectionRef.current || totalSteps === 0) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        triggerRef.current = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 140px',
          end: () => `+=${totalSteps * 800}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          snap: {
            snapTo: totalSteps > 1 ? 1 / (totalSteps - 1) : 0,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: 'power1.inOut'
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.min(totalSteps - 1, Math.max(0, Math.round(self.progress * (totalSteps - 1))));
            if (newIndex !== currentIndex.current) {
              const prevIndex = currentIndex.current;
              currentIndex.current = newIndex;
              setActiveIndex(newIndex);
              const prevImg = imageRefs.current[prevIndex];
              const nextImg = imageRefs.current[newIndex];
              if (prevImg) {
                gsap.to(prevImg, {
                  autoAlpha: 0,
                  duration: 0.5,
                  ease: 'power2.inOut',
                  overwrite: 'auto'
                });
              }
              if (nextImg) {
                gsap.to(nextImg, {
                  autoAlpha: 1,
                  duration: 0.5,
                  ease: 'power2.inOut',
                  overwrite: 'auto'
                });
              }
              if (textRef.current) {
                gsap.fromTo(
                  textRef.current,
                  { autoAlpha: 0, y: 10 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto'
                  }
                );
              }
            }
          }
        });
      });
      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [totalSteps] }
  );
  const scrollToStep = (index: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    if (!triggerRef.current || totalSteps <= 1) return;
    const progress = index / (totalSteps - 1);
    const startPos = triggerRef.current.start;
    const endPos = triggerRef.current.end;
    const targetScroll = startPos + (endPos - startPos) * progress;
    gsap.to(window, {
      duration: 0.8,
      ease: 'power1.inOut',
      scrollTo: targetScroll
    });
  };
  const activeStep = steps[activeIndex] ?? steps[0];
  if (!data || totalSteps === 0) return null;
  return (
    <section className="bg-white-blue mx-4 mb-4 rounded-2xl space-py">
      <Container>
        <div className="w-full">
          <Tagline title={data?.tagline ?? ''} className="mb-3" />
          <Heading className="text-white-blue max-w-180" variant="xxl">
            <span className="text-primary font-bold">{data?.title?.highlight ?? ''}</span>
            <span className="text-secondary"> {data?.title?.text ?? ''}</span>
          </Heading>
          <p className="text-secondary max-w-150 mt-3 leading-snug">{data?.description ?? ''}</p>
        </div>
        <div ref={sectionRef} className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl h-full">
              <div className="relative aspect-[1.45] rounded-2xl h-full">
                {steps.map((step, idx) => (
                  <Image
                    key={step?.number ?? idx}
                    ref={(el) => {
                      imageRefs.current[idx] = el;
                    }}
                    src={step?.image ?? ''}
                    alt={step?.title ?? 'Step Image'}
                    fill 
                    className={`object-cover h-full w-full ${idx === 0 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={idx === 0}
                  />
                ))}
              </div>
              <div
                ref={textRef}
                className="bg-white/20 text-white-blue absolute bottom-4 left-4 right-4 max-w-100 rounded-2xl p-4 backdrop-blur-xl">
                <p className="mb-1 text-[10px] tracking-[0.2em]">{`{${activeStep?.eyebrow ?? ''}}`}</p>
                <h3 className="mb-4 text-xl font-bold uppercase leading-tight">{activeStep?.title ?? ''}</h3>
                <p className="text-sm leading-snug">{activeStep?.description ?? ''}</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="pl-0 lg:pl-8">
              <div className="hidden lg:block absolute left-0 top-0 h-full w-0.5 bg-secondary/50" />
              {steps.map((step, index) => {
                const active = index === activeIndex;
                const isPassed = index <= activeIndex;
                return (
                  <div
                    key={step?.number ?? index}
                    onClick={() => scrollToStep(index)}
                    className={`process-step group relative cursor-default lg:cursor-pointer ${
                      index !== totalSteps - 1 ? 'pb-10 lg:pb-15' : ''
                    }`}>
                    <div
                      className={`hidden lg:block absolute -left-8.25 top-0 w-1 transition-all duration-500 ease-out ${
                        isPassed ? 'h-full bg-primary' : 'h-0 bg-transparent'
                      }`}
                    />
                    <div className="flex gap-3">
                      <div
                        className={`text-[44px] font-normal leading-none lg:transition-colors lg:duration-500 ${
                          active ? 'text-primary' : 'text-primary lg:text-secondary/50 lg:group-hover:text-primary'
                        }`}>
                        {step?.number ?? ''}
                      </div>
                      <div>
                        <div
                          className={`mt-2 text-[10px] uppercase tracking-[0.15em] lg:transition-colors lg:duration-500 ${
                            active ? 'text-secondary' : 'text-secondary lg:text-secondary/50 lg:group-hover:text-secondary'
                          }`}>
                          {`{${step?.eyebrow ?? ''}}`}
                        </div>
                        <h4
                          className={`mt-1 text-xl font-bold uppercase lg:transition-colors lg:duration-500 ${
                            active ? 'text-secondary' : 'text-secondary lg:text-secondary/50 lg:group-hover:text-secondary'
                          }`}>
                          {step?.title ?? ''}
                        </h4>
                      </div>
                    </div>
                    <div className="mt-6 overflow-hidden rounded-xl lg:hidden">
                      <div className="relative aspect-[1.45]">
                        <Image src={step?.image ?? ''} alt={step?.title ?? ''} fill className="object-cover" sizes="100vw" />
                      </div>
                      <div className="bg-secondary/10 p-5">
                        <p className="text-secondary text-sm leading-relaxed">{step?.description ?? ''}</p>
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

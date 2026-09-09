'use client';
import Button from '@/components/common/Button';
import CoverageCard from '../cards/CoverageCard';
import CoverageCardMobile from '../cards/CoverageCardMobile';
import Container from '../common/Container';
import Heading from '../common/Heading';
import Swipers from '../common/Swipers';
import Tagline from '../common/Tagline';
export interface CoverageSectionProps {
  data: {
    subtitle: string;
    title: {
      highlight: string;
      text: string;
    };
    description: string;
    backgroundImage: string;
    button: {
      label: string;
      href: string;
    };
    disclaimer: string;
    cards: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
}
export default function CoverageBlock({ data }: CoverageSectionProps) {
  return (
    <section className="bg-white-blue space-py overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-[410px_1fr] w-full">
          <Tagline title={data.subtitle} className="text-primary" />
          <div>
            <Heading className="text-secondary" variant="xxl">
              <span className="font-bold text-primary">{data.title.highlight}</span> {data.title.text}
            </Heading>
            <p className="mt-3 lg:max-w-124.5 text-base text-secondary">{data.description}</p>
            <Button href={data.button.href} color="white" rounded="full" arrow arrowStyle="circle" className="mt-8 pr-1">
              {data.button.label}
            </Button>
          </div>
        </div>
        <div className="my-10">
          <Swipers
            slidesPerView={1.1}
            spaceBetween={24}
            speed={1600}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2
              },
              768: {
                slidesPerView: 2
              },
              1024: {
                slidesPerView: 3
              },
              1280: {
                slidesPerView: 4
              }
            }}>
            {data.cards.map((card) => (
              <div key={card.title} className='h-full'>
                
                
                  <CoverageCardMobile data={card} />
            
              </div>
            ))}
          </Swipers>
        </div>
        <p className="mt-10 w-full text-sm text-primary/80">{data.disclaimer}</p>
      </Container>
    </section>
  );
}

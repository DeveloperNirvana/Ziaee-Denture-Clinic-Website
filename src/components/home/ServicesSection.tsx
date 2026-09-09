import ServiceCard from '../cards/ServiceCard';
import Container from '../common/Container';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
import Button from '../common/Button';
import Swipers from '@/components/common/Swipers';
interface ServiceItem {
  title: string;
  description: string;
  image?: string;
  label: string;
  href: string;
}
interface ServicesSectionProps {
  data: {
    tagline: string;
    title: {
      highlight: string;
      text: string;
    };
    description: string;
    services: ServiceItem[];
    buttonText: string;
    buttonLink: string;
  };
}
export default function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section className="space-py overflow-hidden">
      <Container>
        <div className="grid gap-3 lg:gap-10 lg:grid-cols-[400px_1fr] text-center lg:text-left">
          <div>
            <Tagline title={data.tagline} />
          </div>
          <div>
            <Heading className="text-white-blue" variant="xxl">
              <span className="text-primary font-bold">{data.title.highlight}</span>
              <span className="text-secondary"> {data.title.text}</span>
            </Heading>
            <p className="max-w-130 leading-snug text-secondary mt-3 mx-auto lg:mx-0">{data.description}</p>
          </div>
        </div>
        <div className="w-full mt-10">
          <Swipers
            className="overflow-visible!"
            slidesPerView={1.2}
            spaceBetween={16}
            loop
            autoplay
            speed={1600}
            breakpoints={{
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
            {data.services.map((item) => (
              <ServiceCard key={item.title} data={item} />
            ))}
          </Swipers>
        </div>
        <div className="mt-10 flex justify-center">
          <Button href={data.buttonLink} rounded="full" arrow arrowStyle="circle" className="pr-1">
            {data.buttonText}
          </Button>
        </div>
      </Container>
    </section>
  );
}

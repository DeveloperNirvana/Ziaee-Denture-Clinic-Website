import TechnologyCards from '../cards/TechnologyCards';
import Container from '../common/Container';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
import Button from '../common/Button';
interface TechnologySectionProps {
  data: {
    tagline: string;
    title: {
      highlight: string;
      text: string;
    };
    description: string;
    buttonText: string;
    buttonLink: string;
    cards: {
      eyebrow: string;
      title: string;
      image: string;
      description: string;
      note: string;
    }[];
  };
}
export default function TechnologySection({ data }: TechnologySectionProps) {
  return (
    <section className="space-pb text-secondary text-center lg:text-left">
      <Container>
        <div className="grid  gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-12 w-full shrink-0 self-start">
            <Tagline title={data.tagline} className="mb-3" />
            <Heading className="text-white-blue" variant="xxl">
              <span className="text-primary font-bold">{data.title.highlight}</span>
              <span className="text-secondary"> {data.title.text}</span>
            </Heading>
            <p className="max-w-130 leading-snug text-secondary mt-3 mx-auto lg:mx-0">{data.description}</p>
            <Button href={data.buttonLink} rounded="full" arrow arrowStyle="circle" className="pr-1 mt-10">
              {data.buttonText}
            </Button>
          </div>
          <TechnologyCards data={data.cards} />
        </div>
      </Container>
    </section>
  );
}

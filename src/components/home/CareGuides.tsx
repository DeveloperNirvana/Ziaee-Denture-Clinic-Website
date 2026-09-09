import Container from '../common/Container';
import CareGuideCard from '../cards/CareGuideCard';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
import Button from '../common/Button';
interface CareGuidesProps {
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
      id: number;
      tagline?: string;
      title: string;
      description: string;
      date: string;
      readTime: string;
      image: string;
      featured?: boolean;
      link: string;
    }[];
  };
}
export default function CareGuides({ data }: CareGuidesProps) {
  return (
    <section className="space-py">
      <Container>
        <div className="text-secondary leading-snug text-center mb-10">
          <Tagline title={data.tagline} />
          <Heading className="text-white-blue mt-3 lg:mt-5" variant="xxl">
            <span className="text-secondary">{data.title.text} </span>
            <span className="text-primary font-bold">{data.title.highlight}</span>
          </Heading>
          <p className="mx-auto mt-5 max-w-130">{data.description}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          {data.cards.map((card, index) => (
            <CareGuideCard key={card.title} data={card} index={index} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href={data.buttonLink} rounded="full" arrow arrowStyle="circle" className="pr-1">
            {data.buttonText}
          </Button>
        </div>
      </Container>
    </section>
  );
}

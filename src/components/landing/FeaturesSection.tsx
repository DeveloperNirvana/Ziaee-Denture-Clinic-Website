import Image from 'next/image';
import Container from '../common/Container';
import Tagline from '../common/Tagline';
type FeaturesSectionProps = {
  data: {
    heading: string;
    title: {
      highlight: string;
      text: string;
    };
    features: {
      image: string;
      title: string;
      description: string;
    }[];
  };
};
export default function FeaturesSection({ data }: FeaturesSectionProps) {
  return (
    <section className="py-10 lg:py-24">
      <Container>
        <div className="mx-auto mb-10 max-w-4xl text-center lg:mb-24">
          <Tagline title={data.heading} />
          <h2 className="mt-4 text-3xl leading-tight text-secondary capitalize">
            <span className="font-bold text-primary">{data.title.highlight}</span> {data.title.text}
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16 max-w-275 mx-auto">
          {data.features.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center group">
              <div className="group-hover:-translate-y-2 duration-500">
                <div className="relative mb-5 lg:mb-8 h-42.5 w-42.5 lg:h-55 lg:w-55 mx-auto">
                  <Image src={item.image} alt={item.title} fill className="object-contain" />
                </div>
                <h3 className="mb-1 text-3xl italic text-primary">{item.title}</h3>
                <p className="max-w-xs text-base text-secondary">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

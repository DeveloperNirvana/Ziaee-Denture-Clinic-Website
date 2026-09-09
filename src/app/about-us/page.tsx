import Container from '@/components/common/Container';
import { getAboutPage, hero, meetSections, whyUsData } from '@/data/aboutData';
import Tagline from '@/components/common/Tagline';
import Heading from '@/components/common/Heading';
import Button from '@/components/common/Button';
import ImageContentSection from '@/components/common/ImageContentSection';
import CommonQuestions from '@/components/home/CommonQuestions';
import Appointment from '@/components/common/Appointment';
import { getFaqs } from '@/data/faq';
import { MetaData } from '@/lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return MetaData(page?.seo, {
    title: page?.title || 'About Us',
    description:
      'Learn more about Ziaee Denture Clinic and our personalized denture care.',
  });
}
export default async function aboutPage() {
  const about = await getAboutPage();
  if (!about) return null;
  const { hero, whyUsData, meetSections } = about;
  const faqs = await getFaqs();
  return (
    <>
      <section className="relative overflow-hidden bg-white-blue p-4 pb-0 lg:py-0">
        <div className="bg-secondary text-white-blue items-center rounded-2xl">
          <Container>
            <div className="grid gap-3 gap-y-6 xl:grid-cols-2 bg-secondary text-white-blue items-center py-6 lg:pb-20 lg:pt-35 xl:pt-40">
              <div className="mx-auto flex h-full w-full items-center xl:max-w-2xl xl:px-6">
                <div className="xl:max-w-md">
                  <Heading as="h1" variant="xxl" className="text-white-blue font-bold!">
                    <span>{hero.title.highlight}</span>
                    <span className="font-normal lg:block">{hero.title.text}</span>
                  </Heading>
                  {hero.button.label && (
                    <Button href={hero.button.href} arrow arrowStyle="circle" rounded="full" className="pr-1 mt-6 lg:mt-10" color="white">
                      {hero.button.label}
                    </Button>
                  )}
                </div>
              </div>
              <div className="relative xl:px-6">
                <div
                  className="space-y-5 text-base lg:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: hero.content
                  }}
                />
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section className="overflow-hidden bg-white-blue space-py text-center lg:text-left">
        <Container>
          <div className="grid gap-10 items-center lg:gap-x-30">
            <div className="relative">
              <Tagline title={whyUsData.subtitle} className="w-fit mb-2 mx-auto lg:mx-0" />
              <Heading className="text-white-blue" variant="xxl">
                <span className="lg:block text-primary font-bold">{whyUsData.title.highlight}</span>
                <span className="lg:block text-secondary">{whyUsData.title.text}</span>
              </Heading>
            </div>
          </div>
        </Container>
      </section>
      {meetSections && <ImageContentSection data={meetSections} className="space-py" />}
      <Appointment />
      <div className="mt-12 lg:mt-20">
        <CommonQuestions faqs={faqs} />
      </div>
    </>
  );
}

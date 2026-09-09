import Container from '@/components/common/Container';
import { hero, experience, newPatientform, getNewPatientPage } from '@/data/newPatient';
import Heading from '@/components/common/Heading';
import Image from 'next/image';
import Button from '@/components/common/Button';
import CommonQuestions from '@/components/home/CommonQuestions';
import NewPatient from '@/components/common/newPatient';
import { getFaqs } from '@/data/faq';
import { MetaData } from '@/lib/metadata';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
  const page = await getNewPatientPage();

  return MetaData(page?.seo, {
    title:
      page?.title ||
      'New Patients | Ziaee Denture Clinic',

    description:
      'Learn what to expect as a new patient at Ziaee Denture Clinic and complete your patient forms before your appointment.',
  });
}
export default async function newPatientsPage() {
  const newPatient = await getNewPatientPage();
  if (!newPatient) return null;
  const { hero, experience } = newPatient;
  const faqs = await getFaqs();
  return (
    <>
      <section className="relative overflow-hidden bg-white-blue pb-4 pt-4 lg:pt-0">
        <Container className="lg:max-w-full!">
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="bg-secondary lg:py-40 rounded-xl order-2">
              <div className="mx-0 flex h-full lg:max-w-2xl items-center p-6 lg:px-14">
                <div>
                  <Heading as="h1" variant="xxl" className="text-white-blue font-bold!">
                    <span>{hero.title.highlight} </span>
                    <span className="font-normal lg:block">{hero.title.text}</span>
                  </Heading>
                  {hero.button.label && (
                    <Button href={hero.button.href} arrow={true} arrowStyle="circle" rounded="full" className="pr-1 mt-5 lg:mt-10" color="white">
                      {hero.button.label}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="relative min-h-120 lg:min-h-full rounded-xl  order-1">
              {hero.image && (
                <Image
                  fill
                  sizes="100vw"
                  priority
                  src={hero.image}
                  alt={hero.imgAlt || hero.title.text || 'Banner'}
                  className="object-cover rounded-xl"
                />
              )}
            </div>
          </div>
        </Container>
      </section>
      <section className="space-py">
        <Container>
          <div className="grid md:grid-cols-[0.7fr_1fr] gap-x-30 gap-y-2">
            <div>
              <Heading className="font-bold! lg:max-w-100" variant="xxl">
                <span>{experience.title.highlight} </span>
                <span className="font-normal text-secondary lg:block">{experience.title.text}</span>
              </Heading>
            </div>
            <div>
              <div
                className="space-y-5 text-secondary text-base lg:text-lg"
                dangerouslySetInnerHTML={{
                  __html: experience.content
                }}
              />
            </div>
          </div>
        </Container>
      </section>
      <NewPatient data={newPatientform} />
      <div className=" mt-14 lg:mt-25">
        <CommonQuestions faqs={faqs} />
      </div>
    </>
  );
}

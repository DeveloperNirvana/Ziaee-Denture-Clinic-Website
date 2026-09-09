import Container from '@/components/common/Container';
import { getServiceDetailsPage } from '@/data/partialData';
import Heading from '@/components/common/Heading';
import Image from 'next/image';
import Button from '@/components/common/Button';
import ImageContentSection from '@/components/common/ImageContentSection';
import CommonQuestions from '@/components/home/CommonQuestions';
import { getFaqs, getFaqsCategory } from '@/data/faq';
import type { Metadata } from 'next';
import { MetaData } from '@/lib/metadata';
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page =
    await getServiceDetailsPage(slug);

  return MetaData(page?.seo, {
    title:
      page?.title ||
      'Denture Services | Ziaee Denture Clinic',

    description:
      'Explore personalized denture care and treatment options at Ziaee Denture Clinic.',
  });
}
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const partialData = await getServiceDetailsPage(slug);
  if (!partialData) {
    return <div>Service not found.</div>;
  }
   const faqs = await getFaqsCategory(partialData.faqCategory);
  const needSections = {
    title: {
      normal: partialData.sectionOne?.titleNormal,
      highlight: partialData.sectionOne?.titleHighlight,
      suffix: partialData.sectionOne?.titleSuffix
    },
    content: partialData.sectionOne?.content || '',
    image: partialData.sectionOne?.image?.node?.sourceUrl || '',
    imageAlt: partialData.sectionOne?.imageAlt || '',
    imagePosition: partialData.sectionOne?.imagePosition,
    button: partialData.sectionOne?.buttonText
      ? {
          label: partialData.sectionOne.buttonText,
          href: partialData.sectionOne.buttonLink
        }
      : undefined
  };
  const removableSections = {
    title: {
      normal: partialData.sectionTwo?.titleNormal,
      highlight: partialData.sectionTwo?.titleHighlight,
      suffix: partialData.sectionTwo?.titleSuffix
    },
    content: partialData.sectionTwo?.content || '',
    image: partialData.sectionTwo?.image?.node?.sourceUrl || '',
    imageAlt: partialData.sectionTwo?.imageAlt || '',
    imagePosition: partialData.sectionTwo?.imagePosition,
    button: partialData.sectionTwo?.buttonText
      ? {
          label: partialData.sectionTwo.buttonText,
          href: partialData.sectionTwo.buttonLink
        }
      : undefined
  };
  return (
    <>
      <section className="relative overflow-hidden bg-white-blue pb-4 pt-4 lg:pt-0">
        <Container className="lg:max-w-full!">
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="bg-secondary lg:py-40 rounded-xl order-2">
              <div className="mx-0 flex h-full lg:max-w-2xl items-center p-6 lg:px-14">
                <div>
                  <Heading as="h1" variant="xxl" className="text-white-blue font-bold!">
                    <span>{partialData.hero.heroTitleHighlight} </span>
                    <span className="font-normal lg:block">{partialData.hero.heroTitle}</span>
                  </Heading>
                  {partialData.hero.heroButtonText && (
                    <Button
                      href={partialData.hero.heroButtonLink}
                      arrow={true}
                      arrowStyle="circle"
                      rounded="full"
                      className="pr-1 mt-5 lg:mt-10"
                      color="white">
                      {partialData.hero.heroButtonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="relative min-h-120 lg:min-h-full rounded-xl  order-1">
              {partialData.hero?.heroImage?.node?.sourceUrl && (
                <Image
                  fill
                  sizes="100vw"
                  priority
                  src={partialData.hero.heroImage.node.sourceUrl}
                  alt={partialData.hero.heroImageAlt || partialData.hero.heroTitle || 'Banner'}
                  className="object-cover rounded-xl"
                />
              )}
            </div>
          </div>
        </Container>
      </section>
      <section className="space-py">
        <Container>
          <div className="grid md:grid-cols-[0.7fr_1fr] gap-x-20">
            <div>
              <Heading className="font-bold! lg:max-w-150 mb-2" variant="xxl">
                <span>{partialData.qualitySection.titleHighlight} </span>
                <span className="font-normal text-secondary lg:block">{partialData.qualitySection.title}</span>
              </Heading>
            </div>
            <div>
              <div
                className="space-y-5 text-secondary text-base lg:text-lg"
                dangerouslySetInnerHTML={{
                  __html: partialData.qualitySection.content
                }}
              />
            </div>
          </div>
        </Container>
      </section>
      <div className="bg-white-blue mx-4 rounded-2xl">
        {partialData.sectionOne && (
          <div className="bg-white-blue mx-4 rounded-2xl">
            <ImageContentSection data={needSections} />
          </div>
        )}
      </div>
      {partialData.sectionTwo && <ImageContentSection data={removableSections} />}
       {/* Category-specific FAQs */}
      {faqs.length > 0 && (
        <CommonQuestions faqs={faqs} />
      )}
    </>
  );
}

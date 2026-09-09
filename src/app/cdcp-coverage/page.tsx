import Container from '@/components/common/Container';
import { getCdcpPage } from '@/data/cdcpData';
import Heading from '@/components/common/Heading';
import Image from 'next/image';
import Button from '@/components/common/Button';
import CommonQuestions from '@/components/home/CommonQuestions';
import ImageContentSection from '@/components/common/ImageContentSection';
import { getFaqs } from '@/data/faq';
import { MetaData } from '@/lib/metadata';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
  const page = await getCdcpPage();

  if (!page) {
    return {
      title: "CDCP Coverage",
      description:
        "Learn more about Canadian Dental Care Plan coverage at Ziaee Denture Clinic.",
    };
  }

  return MetaData(page.seo);
}
export default async function cdcpPage() {
  const cdcp = await getCdcpPage();
  if (!cdcp) return null;
  const { hero, operates, coverage } = cdcp;
  const faqs = await getFaqs();
  return (
    <>
      <section className="relative overflow-hidden bg-white-blue pb-4 pt-4 lg:pt0">
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
                    <Button
                      href={hero.button.href}
                      arrow={true}
                      arrowStyle="circle"
                      rounded="full"
                      className="pr-1 mt-5 lg:mt-10"
                      color="white">
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
                  priority
                  sizes="100vw"
                  src={hero.image}
                  alt={hero.imgAlt || hero.title.text || 'Banner'}
                  className="object-cover rounded-xl"
                />
              )}
            </div>
          </div>
        </Container>
      </section>
      <section className="space-py text-secondary">
        <Container>
          <div className="grid md:grid-cols-[1fr_0.4fr] gap-x-10 gap-y-6">
            <div>
              <Heading className="font-bold!  mb-2" variant="xxl">
                <span>{operates.title.highlight} </span>
                <span className="font-normal text-secondary lg:block">{operates.title.text}</span>
              </Heading>
              <div
                className="space-y-5 text-secondary text-base max-w-290 lg:mt-6"
                dangerouslySetInnerHTML={{
                  __html: operates.content
                }}
              />
            </div>
            <div>
              {operates.image && (
                <Image
                  priority
                  src={operates.image}
                  alt={operates.imgAlt || operates.title.text}
                  width={407}
                  height={210}
                  className="rounded-full w-auto"
                />
              )}
            </div>
          </div>
        </Container>
      </section>
      <div className="bg-white-blue mx-4 rounded-2xl cms-list">
        <ImageContentSection data={coverage} />
      </div>
      <div className=" mt-12 lg:mt-20">
        <CommonQuestions faqs={faqs} />
      </div>
    </>
  );
}

import { servicesBanner, servicesListData, serviceCta, getServices, getServicesBanner } from '@/data/services';
import ServiceCard from '@/components/cards/ServiceCard';
import Container from '@/components/common/Container';
import InnerBanner from '@/components/common/InnerBanner';
import Appointment from '@/components/common/Appointment';
import CommonQuestions from '@/components/home/CommonQuestions';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { getFaqs, getFaqsPage,getFaqCategoryId } from '@/data/faq';
import { MetaData } from '@/lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServices();

  return MetaData(page?.seo, {
    title: page?.title || 'Services',

    description:
      'Explore personalized denture services from Ziaee Denture Clinic, including complete dentures, partial dentures, repairs, relines, adjustments, and digital dentures.',
  });
}
export default async function ServicePage() {
const servicesData = await getServices();

const services = servicesData.services;

  const servicesBanner = await getServicesBanner();

  // Get FAQ category selected specifically on Services page
  const faqCategoryId = await getFaqCategoryId('/services/');

  // Get FAQs from Services FAQ category
  const faqs = await getFaqsPage(faqCategoryId);
  return (
    <>
        {servicesBanner && (
        <InnerBanner data={servicesBanner} variant="default" />
      )}
      <section className="py-12 lg:pb-20">
        <Container>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((item: any) => (
              <ServiceCard
                key={item.href}
                data={item}
                className="h-80! sm:h-100! lg:h-105!"
                headingclassName="max-w-max!"
              />
            ))}
            <div className="relative flex items-end pb-5  sm:col-span-2 bg-secondary sm:items-center pl-4 sm:pl-6 lg:pl-12 pt-5 rounded-2xl min-h-80 sm:min-h-100 lg:min-h-105 hover:bg-secondary/80 duration-500 overflow-hidden">
              <div className="max-w-80 sm:max-w-full sm:pr-80 relative z-10">
                <h3 className="text-white font-light text-4xl md:text-[42px] leading-none! mb-5 lg:mb-8">{serviceCta.title}</h3>
                <div className="flex flex-wrap gap-4">
                  {serviceCta.buttons.map((button) => (
                    <Button
                      key={button.href}
                      href={button.href}
                      rounded="full"
                      arrow
                      arrowStyle="circle"
                      color="white"
                      className="pr-1 shrink-0">
                      {button.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="absolute -left-15 sm:left-0  inset-0 flex items-end justify-end">
                <Image
                  src={serviceCta.image}
                  alt={serviceCta.alt}
                  width={465}
                  height={420}
                  className="w-auto  max-h-90 sm:max-h-110 lg:max-h-115"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
     {faqs.length > 0 && (
        <CommonQuestions faqs={faqs} />
      )}
      <Appointment />
    </>
  );
}

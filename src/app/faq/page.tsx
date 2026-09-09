import { FiArrowUpRight } from 'react-icons/fi';
import FAQ from '@/components/common/FAQ';
import { faqBanner, getFaqBanner, getFaqGroups } from '@/data/faq';
import Container from '@/components/common/Container';
import InnerBanner from '@/components/common/InnerBanner';
import { MetaData } from '@/lib/metadata';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
  const page = await getFaqBanner();

  return MetaData(page?.seo, {
    title: 'Frequently Asked Questions | Ziaee Denture Clinic',
    description:
      'Find answers to frequently asked questions about dentures, denture care, repairs, appointments, CDCP coverage, and services at Ziaee Denture Clinic.',
  });
}
export default async function FAQPage() {
  const faqBanner = await getFaqBanner();
  const faqGroups = await getFaqGroups();
  return (
    <>
      {faqBanner && <InnerBanner data={faqBanner} variant="centered" />}
      <section className="space-py">
        <Container>
          <FAQ
            mode="sidebar"
            groups={faqGroups}
            variant="bordered"
            indicator="icon"
            rotateIcon
            openFirstItem
            titleClassName="text-secondary text-xl"
            questionClassName="md:text-xl font-bold! text-secondary uppercase px-5"
            answerClassName="text-base px-5"
            iconClassName="text-secondary bg-white w-12 h-12 rounded-md flex items-center justify-center right-3! relative -my-2"
            rotateClassName="rotate-90"
            activeItemClassName="bg-white-blue rounded-2xl"
          />
        </Container>
      </section>
    </>
  );
}

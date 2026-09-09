//'use client';
import { getHomePage, getHomePageData } from '@/data/home';

import HomeBanner from '@/components/home/HomeBanner';
import CoverageBlock from '@/components/home/CoverageSection';
import ServicesSection from '@/components/home/ServicesSection';
import TechnologySection from '@/components/home/TechnologySection';
import ProcessSection from '@/components/home/ProcessSection';
import CareGuides from '@/components/home/CareGuides';
import Appointment from '@/components/common/Appointment';
import CommonQuestions from '@/components/home/CommonQuestions';
import { getFaqs,getFaqsPage,getFaqCategoryId } from '@/data/faq';
import { getServices } from '@/data/services';
import { getHomeBlogs } from '@/data/blog';
import { Metadata } from 'next';
import { MetaData } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  return MetaData(homePage?.seo, {
    title: homePage?.title || 'Ziaee Denture',

    description:
      'Ziaee Denture Modern denture care designed around comfort, clarity, and confidence.',
  });
}
export default async function Home() {
  const homeData = await getHomePageData();
   const servicesData = await getServices();
   const services = servicesData.services;
  const homePage = await getHomePage();

  // Get FAQ category selected specifically on Home page
  const faqCategoryId =
    homePage?.faqSection?.faqCategory?.nodes?.[0]?.databaseId ||
    null;

  // Get FAQs from Home page's selected category
  const faqs = await getFaqsPage(faqCategoryId);
   const blogs = await getHomeBlogs();
    const pageData = {
    ...homeData,
    services: {
      ...homeData.services,
      services,
    },
    careGuides: {
      ...homeData.careGuides,
      cards: blogs.slice(0, 3), 
    },
  };
  return (
       <>
      <HomeBanner data={pageData.banner} />
      <CoverageBlock data={pageData.coverage} />
      <ServicesSection data={pageData.services} />
      <TechnologySection data={pageData.technology} />
      <ProcessSection data={pageData.process} />
      <Appointment />
      <CareGuides data={pageData.careGuides} />
       {faqs.length > 0 && (
        <CommonQuestions faqs={faqs} />
      )}
    </>
  );
}

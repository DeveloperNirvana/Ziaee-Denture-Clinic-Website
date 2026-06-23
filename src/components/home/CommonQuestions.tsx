'use client';
import { FiArrowUpRight } from 'react-icons/fi';
import Container from '../common/Container';
import NewsletterCard from '../cards/NewsletterCard';
import FAQ from '../common/FAQ';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
const FaqData = {
  tagline: 'FAQ',
  title: {
    text: 'COMMON',
    highlight: 'QUESTIONS'
  },
  description: 'Have questions before booking? We’ve answered a few common ones to help you feel more prepared and confident.',
  faqs: [
    {
      id: '1',
      question: 'Do I need a referral to book an appointment?',
      answer: 'In most cases, you can contact the clinic directly to request an appointment.'
    },
    {
      id: '2',
      question: 'Do you accept CDCP patients?',
      answer: 'Yes, CDCP patients are welcome. Coverage depends on eligibility and approved treatment.'
    },
    {
      id: '3',
      question: 'What happens during the first visit?',
      answer: 'We’ll discuss your needs, review your current denture situation if you have one, and explain possible treatment options.'
    },
    {
      id: '4',
      question: 'Do you offer digital scanning?',
      answer: 'Yes, the clinic uses modern scanning and imaging technology to support accurate denture planning.'
    },
    {
      id: '5',
      question: 'Can my existing dentures be adjusted?',
      answer: 'Many dentures can be adjusted or relined to improve comfort and fit.'
    },
    {
      id: '6',
      question: 'How do I book an appointment?',
      answer: 'You can request an appointment online or contact the clinic directly.'
    }
  ]
};
export default function CommonQuestions() {
  return (
    <section className="pb-14 xl:pb-48 text-secondary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[460px_1fr] xl:grid-cols-[560px_1fr]">
          <div className="w-full text-center lg:text-left">
            <Tagline title={FaqData.tagline} className="mb-3 xl:mb-26" />
            <Heading className="text-white-blue max-w-180 mx-auto lg:mx-0" variant="xxl">
              <span className="text-secondary"> {FaqData.title.text}</span>{' '}
              <span className="text-primary font-bold">{FaqData.title.highlight}</span>
            </Heading>
            <p className="max-w-130 leading-snug text-secondary mt-3 mx-auto lg:mx-0">{FaqData.description}</p>
            <div className="mt-10 xl:mt-30 xl:max-w-95">
              <NewsletterCard />
            </div>
          </div>
          <div className="space-y-0.5  xl:pt-40">
            <FAQ
              items={FaqData.faqs}
              variant="bordered"
              indicator="icon"
              closedIcon={FiArrowUpRight}
              openedIcon={FiArrowUpRight}
              rotateIcon
              openFirstItem
              titleClassName="text-secondary text-xl"
              questionClassName="md:text-xl font-bold! text-secondary uppercase px-5"
              answerClassName="text-base px-5"
              iconClassName="text-secondary bg-white w-12 h-12 rounded-md flex items-center justify-center right-3! relative -my-2"
              rotateClassName="rotate-90"
              activeItemClassName="bg-white-blue rounded-2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

'use client';
import { FiArrowUpRight } from 'react-icons/fi';
import Container from '../common/Container';
import NewsletterCard from '../cards/NewsletterCard';
import FAQ from '../common/FAQ';
import Tagline from '../common/Tagline';
import Heading from '../common/Heading';
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
interface Props {
  faqs: FAQItem[];
}
export default function CommonQuestions({ faqs }: Props) {
  return (
    <section className="space-pb text-secondary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[460px_1fr] xl:grid-cols-[560px_1fr]">
          <div className="w-full text-center lg:text-left">
            <Tagline title="FAQ" className="mb-3" />
            <Heading className="text-white-blue max-w-180 mx-auto lg:mx-0" variant="xxl">
              <span className="text-secondary">COMMON </span>
              <span className="text-primary font-bold">QUESTIONS</span>
            </Heading>
            <p className="max-w-130 leading-snug text-secondary mt-3 mx-auto lg:mx-0">
              Have questions before booking? We&apos;ve answered a few common ones to help you feel more prepared and confident.
            </p>
            <div className="mt-10 xl:max-w-95">
              <NewsletterCard />
            </div>
          </div>
          <div className="space-y-0.5">
            <FAQ
              items={faqs}
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

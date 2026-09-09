import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';
import CommonQuestions from '@/components/home/CommonQuestions';
import { getContactPage } from '@/data/contact';
import { getFaqs } from '@/data/faq';
import { MetaData } from '@/lib/metadata';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  return MetaData(page?.seo, {
    title: "Contact Us | Ziaee Denture Clinic",
    description:
      "Contact Ziaee Denture Clinic in Vancouver to request an assessment, ask about denture services, or learn more about CDCP coverage.",
  });
}
export default async function ContactPage() {
  const faqs = await getFaqs();
  const contactData = await getContactPage();
  return (
    <>
      <section className="px-4 bg-white-blue pt-4 lg:pt-0">
        <div className="bg-secondary rounded-2xl py-14 lg:pt-34  xl:pt-44 xl:pb-20">
          <Container size="lg">
            <section className="grid gap-10 xl:grid-cols-[558px_1fr]">
              <div className="text-white-blue relative">
                <Heading as="h1" variant="xxl" className="font-bold! text-white-blue pr-20">
                  {contactData.contactTitle}
                </Heading>
                <p className="mt-5 mb-6 lg:mb-12 max-w-sm text-sm"> {contactData.contactDescription}</p>
                <div className="space-y-6 lg:space-y-10">
                  {contactData.contactAddress && (
                    <div>
                      <p className="mb-3 text-sm">Visit Us:</p>
                      <p className="text-2xl">{contactData.contactAddress}</p>
                    </div>
                  )}
                  {contactData.contactPhone && (
                    <div>
                      <p className="mb-3 text-sm">Call Us:</p>
                      <a href={`tel:${contactData.contactPhone}`} className="text-2xl transition-opacity hover:opacity-80">
                        {contactData.contactPhone}
                      </a>
                    </div>
                  )}
                  {contactData.contactEmail && (
                    <div>
                      <p className="mb-3 text-sm">Email Us:</p>
                      <a href={`mailto:${contactData.contactEmail}`} className="text-2xl transition-opacity hover:opacity-80">
                        {contactData.contactEmail}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <ContactForm
                formId={231}
                data={{
                  tagline: contactData.formTagline,
                  title: contactData.formTitle,
                  description: contactData.formDescription,
                  privacyText: contactData.privacyText
                }}
              />
            </section>
          </Container>
        </div>
      </section>
      <section className="space-py">
        <Container>
          <ContactMap
            data={{
              title: contactData.mapTitle,
              embedUrl: contactData.mapEmbedUrl
            }}
          />
        </Container>
      </section>
      <CommonQuestions faqs={faqs} />
    </>
  );
}

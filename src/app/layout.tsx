import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ziaeedentureclinic.ca'),
  title: {
    default: 'Ziaee Denture Clinic | Denture Care in Vancouver, BC',
    template: '%s | Ziaee Denture Clinic'
  },
  description:
    'Modern denture care in Vancouver designed around comfort, clarity, and confidence. Complete, partial, and implant-supported dentures, relines, and repairs.',
  alternates: {
    canonical: './'
  }
};
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Ziaee Denture Clinic',
  url: 'https://www.ziaeedentureclinic.ca',
  telephone: '+1-604-326-0459',
  email: 'info@ziaeedenture.ca',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2677 Kingsway',
    addressLocality: 'Vancouver',
    addressRegion: 'BC',
    addressCountry: 'CA'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00'
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

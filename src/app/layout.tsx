import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ziaee Denture',
  description:
    'Ziaee Denture Modern denture care designed around comfort, clarity, and confidence.',
  robots: {
    index: false,
    follow: false
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import LandingPage from '@/components/landing/LandingPage';

// Duplicate of the home page — point search engines at the canonical URL.
export const metadata: Metadata = {
  alternates: {
    canonical: '/'
  }
};

export default function Landing() {
  return (
    <>
      <LandingPage />
    </>
  );
}

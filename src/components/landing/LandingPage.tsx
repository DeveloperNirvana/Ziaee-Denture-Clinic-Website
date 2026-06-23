import { comingSoonData } from '@/data/comingSoonData';
import ComingSoon from './ComingSoon';
import FeaturesSection from './FeaturesSection';
import CoverageSection from './CoverageSection';
import Appointment from '../common/Appointment';
export default function LandingPage() {
  return (
    <>
      <ComingSoon data={comingSoonData.heroSection} />
      <FeaturesSection data={comingSoonData.featuresSection} />
      <CoverageSection data={comingSoonData.coverageSection} />
      <Appointment />
    </>
  );
}

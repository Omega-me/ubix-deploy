import React from 'react';
import {} from 'react-firebase-hooks/auth';
import {
  ClientsSection,
  HomeBannerSection,
  JobCategoriesSection,
  JobFeaturedSection,
  PricingSection,
  TestimonialsSection,
  TopCompaniesSection,
} from 'components';
import { AboutSection } from 'components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <HomeBannerSection />

      {/* <!-- End Banner Section Three--> */}

      <ClientsSection />
      {/* <!-- End Clients Section--> */}

      <JobCategoriesSection />

      {/* <!-- End Job Categories --> */}

      <JobFeaturedSection />

      {/* <!-- End Job Section --> */}

      <TestimonialsSection />
      {/* <!-- End Testimonial Section --> */}

      <TopCompaniesSection />
      {/* <!-- End Top Companies --> */}

      <AboutSection />
      {/* <!-- End About Section --> */}
      <PricingSection />
      {/* <!-- End Pricing Section --> */}
    </>
  );
};

export default Home;

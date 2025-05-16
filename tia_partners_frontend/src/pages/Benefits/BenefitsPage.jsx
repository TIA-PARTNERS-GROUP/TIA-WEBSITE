import React, { lazy, Suspense } from 'react';

// Lazy-loaded components
const Breadcrumb = lazy(() => import('./Breadcrumb'));
const HeroSection = lazy(() => import('./HeroSection'));
const BenefitsSection = lazy(() => import('./BenefitsSection'));
const WhyJoinSection = lazy(() => import('./WhyJoinSection'));

import(Breadcrumb)
import(HeroSection)
import(BenefitsSection)
import(WhyJoinSection)


const BenefitsPage = () => {
  return (
    <Suspense>
      <Breadcrumb />
      <HeroSection />
      <BenefitsSection />
      <WhyJoinSection />
    </Suspense>
  );
};

export default BenefitsPage;

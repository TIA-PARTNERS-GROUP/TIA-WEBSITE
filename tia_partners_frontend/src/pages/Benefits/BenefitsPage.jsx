import React, { lazy, Suspense } from 'react';

// Lazy-loaded components
const Breadcrumb = lazy(() => import('./Breadcrumb'));
const HeroSection = lazy(() => import('./HeroSection'));
const BenefitsSection = lazy(() => import('./BenefitsSection'));
const WhyJoinSection = lazy(() => import('./WhyJoinSection'));

const RevealOnScroll = lazy(() => import('../Common/RevealOnScroll.jsx'));


const BenefitsPage = () => {
  return (
    <Suspense>
      <RevealOnScroll>
        <Breadcrumb />
      </RevealOnScroll>

      <RevealOnScroll>
        <HeroSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <BenefitsSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <WhyJoinSection />
      </RevealOnScroll>
    </Suspense>
  );
};

export default BenefitsPage;

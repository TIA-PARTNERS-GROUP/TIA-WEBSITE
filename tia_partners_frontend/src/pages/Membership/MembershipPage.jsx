import React, { Suspense, lazy } from 'react';

// Lazy load home components
const QuoteSection = lazy(() => import('./QuoteSection.jsx'));
const PricingSection = lazy(() => import('./PricingSection.jsx'));


const MembershipPage = () => {
  return (
    <>
      <QuoteSection />
      <PricingSection />
    </>
  );
};

export default MembershipPage;

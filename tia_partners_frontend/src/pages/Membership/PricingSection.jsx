import React, { Suspense, lazy } from 'react';

// Lazy load home components
const PricingCard = lazy(() => import('./PricingCard.jsx'));


const PricingSection = () => {
  const plans = [
    {
      type: 'FREE',
      price: 0,
      features: [
        '6 Month Full Membership',
        'Business Connection Tool',
        'TIA Linked In Group member',
        'TIA Facebook Group Membership',
        'FREE Invitation to One LAN Partner Meeting',
        'Landing page on TIA main portal',
        'Blog posts / News articles',
        'Access to Local Members',
      ],
      img: 'https://tiapartners.com.au/assets/images/pricetag-icon.png',
      link: 'https://tiapartners.com.au/register',
    },
    {
      type: 'CONNECT',
      price: 50,
      features: [
        'All Free Features Plus',
        'Access to Local Job Posts',
        'Access to NETWORK Module',
        'Monthly Partner training',
        'Monthly Technology Updates',
        'Monthly guest speakers',
      ],
      img: 'https://tiapartners.com.au/assets/images/connect-icon.png',
      link: '#membership-application',
      isFeatured: true,
    },
    {
      type: 'COLLABORATE',
      price: 150,
      features: [
        'Free and Connect Features Plus',
        'Meeting co-ordination',
        'Full Access to the BUILD Module',
        'Full Access to the TRADE Module',
        'Full Dashboard Access',
      ],
      img: 'https://tiapartners.com.au/assets/images/collab-icon.png',
      link: '#membership-application',
    },
  ];

  return (
    <section className="bg-gray-50 py-20" id="pricing">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-semibold mb-4">TIA PROGRAM AND PRICING</h3>
        <p className="text-gray-600 mb-12">
          Our memberships offer a low cost entry and deliver high on value.<br />
          Please click below to view our Membership Costs and inclusions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection

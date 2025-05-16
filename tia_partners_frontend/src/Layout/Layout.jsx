// components/Layout.jsx
import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

// Lazy-loaded components
const Header = lazy(() => import('../pages/Common/Header.jsx'));
const CTA = lazy(() => import('../pages/Common/CTA.jsx'));
const TestimonialSlider = lazy(() => import('../pages/Common/TestimonialSlider.jsx'));
const Footer = lazy(() => import('../pages/Common/Footer.jsx'));

import(Header)
import(CTA)
import(TestimonialSlider)
import(Footer)


const Layout = () => {
  return (
    <Suspense>
      <Header />

      <main>
        <Outlet />
      </main>

      <CTA />
      <TestimonialSlider />
      <Footer />
    </Suspense>
  );
};

export default Layout;

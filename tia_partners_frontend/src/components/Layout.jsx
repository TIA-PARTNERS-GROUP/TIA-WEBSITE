// components/Layout.jsx
import React from 'react';
import Header from './Homepage/Header';
import CTA from './Homepage/CTA';
import TestimonialSlider from './Homepage/TestimonialSlider';
import Footer from './Homepage/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet /> {/* This is where each page (Home, Benefits) renders */}

      </main>

      <CTA />
      <TestimonialSlider />
      <Footer />
    </>
  );
};

export default Layout;

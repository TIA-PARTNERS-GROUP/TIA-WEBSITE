import React from 'react';

import Header from './components/Homepage/Header';
import Features from './components/Homepage/Features';
import HowItWorks from './components/Homepage/HowItWorks';
import CTA from './components/Homepage/CTA';
import Footer from './components/Homepage/Footer';
import Membership from './components/Homepage/Membership';
import TestimonialSlider from './components/Homepage/TestimonialSlider';


function App() {
  return (
    <div className="App">
      <Header />
      <Features />
      <HowItWorks />
      <Membership />
      <CTA />
      <TestimonialSlider />
      <Footer />
    </div>
  );
}

export default App;

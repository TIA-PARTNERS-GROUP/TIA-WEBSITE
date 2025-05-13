import React from 'react';

import Header from './components/Homepage/Header';
import Features from './components/Homepage/Features';
import HowItWorks from './components/Homepage/HowItWorks.jsx';
import CTA from './components/Homepage/CTA';
import Footer from './components/Homepage/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

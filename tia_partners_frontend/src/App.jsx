import { useState } from 'react';

import Header from './components/Homepage/Header';
import HeroSection from './components/Homepage/Hero';
import { TestimonialsSection } from './components/Homepage/Testimonials/';
//import FeaturesSection from './components/Homepage/Features';
//import CtaSection from './components/Cta'; 
//import Footer from './components/Footer'; 
//import ScrollToTopButton from './components/Homepage/ScrollToTopButton';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-sans text-gray-900 antialiased">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main>
        
      </main>
    </div>
  );
}

export default App;

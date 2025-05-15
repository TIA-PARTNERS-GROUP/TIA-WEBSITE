import React from 'react';
import Features from './Features';
import Membership from './Membership';
import CTA from './CTA';
import Footer from './Footer';
import Header from './Header';
import HowItWorks from './HowItWorks';
import TestimonialSlider from './TestimonialSlider';
import { motion, useScroll, useTransform } from 'framer-motion';
import BackgroundBlob from './BackgroundBlob';
import RevealOnScroll from './RevealOnScroll';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="relative overflow-hidden">
      {/* Background parallax effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ y: y1 }}
      >
        <BackgroundBlob className="w-72 h-72 bg-purple-900 bottom-[-300px] right-[-100px]" />
        <BackgroundBlob className="w-72 h-72 bg-purple-900 bottom-[300px] right-[1400px]" />
      </motion.div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.section
        className="relative z-10 pt-32 pb-20 bg-white text-center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <BackgroundBlob className="w-96 h-96 bg-blue-300 top-[-100px] left-[-200px]" />
          <BackgroundBlob className="w-96 h-96 bg-blue-300 top-[100px] left-[1400px]" />
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Discover. Connect. Grow.
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            AI-powered platform to find your next partner, opportunity, or breakthrough.
          </p>
          <a
            href="#membership"
            className="mt-8 inline-block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow hover:opacity-90 transition"
          >
            Get Started
          </a>
        </div>
      </motion.section>

      {/* Animated Sections */}

      <RevealOnScroll>
        <Features />
      </RevealOnScroll>

      <RevealOnScroll>
        <HowItWorks />
      </RevealOnScroll>

      <RevealOnScroll>
        <Membership />
      </RevealOnScroll>

      <RevealOnScroll>
        <CTA />
      </RevealOnScroll>

      <RevealOnScroll>
        <TestimonialSlider />
      </RevealOnScroll>

      <Footer />
    </div>
  );
};

export default Home;

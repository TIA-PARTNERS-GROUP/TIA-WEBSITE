import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Lazy load home components
const Features = lazy(() => import('./components/Features.jsx'));
const Membership = lazy(() => import('./components/Membership.jsx'));
const HowItWorks = lazy(() => import('./components/HowItWorks.jsx'));
const BackgroundBlob = lazy(() => import('./components/BackgroundBlob.jsx'));

// Lazy load shared/common component
const RevealOnScroll = lazy(() => import('../Common/RevealOnScroll.jsx'));


const HomePage = () => {
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
        <Suspense fallback={null}>
          <BackgroundBlob className="w-72 h-72 bg-purple-900 bottom-[-300px] right-[-100px]" />
          <BackgroundBlob className="w-72 h-72 bg-purple-900 bottom-[300px] right-[1400px]" />
        </Suspense>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 pt-32 pb-20 bg-white text-center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <Suspense fallback={null}>
            <BackgroundBlob className="w-96 h-96 bg-blue-300 top-[-100px] left-[-200px]" />
            <BackgroundBlob className="w-96 h-96 bg-blue-300 top-[100px] left-[1400px]" />
          </Suspense>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Your Partner to Profit
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            AI-powered platform to find your next partner, opportunity, or breakthrough.
          </p>
          <a
            href="#membership"
            className="mt-8 inline-block bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow hover:opacity-90 transition"
          >
            Get Started
          </a>

          <a
            href="#membership"
            className="mt-8 mx-3 inline-block bg-blue-800 text-white py-3 px-6 rounded-full text-lg font-semibold shadow hover:opacity-90 transition"
          >
            Watch video
          </a>
        </div>
      </motion.section>

      {/* Animated Sections */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Features />
          <HowItWorks />
          <Membership />
      </Suspense>
    </div>
  );
};

export default HomePage;

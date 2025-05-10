import React, { useState, useEffect } from 'react';
import { FiArrowUp, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 text-white shadow-lg transform transition-all duration-300 ${
isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
} hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
    >
      <FiArrowUp className="w-5 h-5" />
    </button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-900">
              <span className="text-indigo-600">TIA</span> Partners
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <div className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Solutions
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Industries
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Resources
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                About Us
              </a>
            </div>
            <div className="flex items-center space-x-4 ml-8">
              <a
                href="#"
                className="px-5 py-2 text-gray-700 font-medium hover:text-indigo-600 transition-colors"
              >
                Login
              </a>
              <a
                href="#"
                className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Get Started
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                  <FiMenu className="w-6 h-6" />
                )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
                Solutions
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
                Industries
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
                Resources
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
                About Us
              </a>
            </div>
            <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-gray-100">
              <a
                href="#"
                className="px-5 py-2 text-center text-gray-700 font-medium hover:text-indigo-600 transition-colors"
              >
                Login
              </a>
              <a
                href="#"
                className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors text-center shadow-sm"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Business with <span className="text-indigo-600">Strategic</span> Partnerships
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Accelerate growth, expand your network, and unlock new revenue streams through our elite partnership platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center"
              >
                Join Our Network
                <FiArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Business professionals collaborating"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-indigo-600/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { value: '70+', label: 'Tech Partners' },
    { value: '50+', label: 'Business Builders' },
    { value: '30+', label: 'Technology Distributors' },
    { value: '95%', label: 'Satisfaction Rate' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: 'Strategic Networking',
      description: 'Connect with industry leaders and potential partners in our exclusive network.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Revenue Growth',
      description: 'Discover new revenue streams through collaborative partnerships and joint ventures.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Expert Resources',
      description: 'Access our library of resources and tools to optimize your partnership strategy.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Partnership Platform</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the tools, network, and expertise to help your business thrive in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Our revenue increased by 40% within the first year of joining the TIA network. The partnerships we've formed have been invaluable.",
      name: "Sarah Johnson",
      title: "CEO, TechSolutions Inc.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The quality of connections and the level of professionalism in this network is unmatched. It's transformed how we do business.",
      name: "Michael Chen",
      title: "Director of Partnerships, NexGen Tech",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
  ];

  return (
    <section className="py-20 bg-indigo-600 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Partners Say</h2>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Hear from businesses that have transformed their growth through our partnership platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-indigo-200 text-sm">{testimonial.title}</div>
                </div>
              </div>
              <p className="text-lg italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Join our exclusive network of industry leaders and start building valuable partnerships today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center"
            >
              Get Started Now
              <FiArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-gray-600 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">TIA Partners</h3>
            <p className="mb-4">Transforming businesses through strategic partnerships and collaborative growth.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Partnership Network</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Growth</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Strategic Consulting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Revenue Optimization</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leadership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic">
              <p className="mb-2">123 Business Avenue</p>
              <p className="mb-2">Suite 500</p>
              <p className="mb-2">San Francisco, CA 94107</p>
              <p className="mb-2">info@tiapartners.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} TIA Partners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;

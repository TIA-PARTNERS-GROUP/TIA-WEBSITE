import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import { lazyImports } from '../../routes/LazyPages.js'; // adjust path as needed


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Benefits', path: '/benefits', isRoute: true },
    { name: 'Membership', path: '/membership', isRoute: true },
    { name: 'Our Partners', path: '#our-partners' },
    { name: 'Features', path: '#features' },
    { name: 'How It Works', path: '#how-it-works' },
    { name: 'About Us', path: '#about' },
    { name: 'News', path: '#news' },
    { name: 'Contact Us', path: '#contact' },
  ];

  const preloadRoute = (path) => {
    if (lazyImports[path]) {
      lazyImports[path](); // triggers dynamic import on hover/focus
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group transition-all duration-300">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-blue-600 group-hover:text-blue-700 transform -skew-x-6 transition-all duration-300">
                TIA
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            {navLinks.map((link, idx) =>
              link.isRoute ? (
                <Link
                  key={idx}
                  to={link.path}
                  className="hover:text-blue-600 transition"
                  onMouseEnter={() => preloadRoute(link.path)}
                  onFocus={() => preloadRoute(link.path)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={link.path}
                  className="hover:text-blue-600 transition"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="#login"
              className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition"
            >
              Login
            </a>
            <a
              href="#join"
              className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 space-y-4 border-t border-gray-200 shadow-lg">
          {navLinks.map((link, idx) =>
            link.isRoute ? (
              <Link
                key={idx}
                to={link.path}
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => preloadRoute(link.path)}
                onFocus={() => preloadRoute(link.path)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={idx}
                href={link.path}
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            )
          )}
          <a
            href="#join"
            className="block text-center bg-blue-600 text-white rounded-md py-2 mt-2 hover:bg-blue-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Join Now
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;

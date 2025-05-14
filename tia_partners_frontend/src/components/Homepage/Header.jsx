import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="/"
            className="flex items-center space-x-2 group transition-all duration-300"
          >

            {/* Slanted TIA with tagline */}
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-blue-600 group-hover:text-blue-700 transform -skew-x-6 transition-all duration-300">
                TIA
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <a href="#Benefits" className="hover:text-blue-600 transition">Benefits</a>
            <a href="#membership" className="hover:text-blue-600 transition">Membership</a>
            <a href="#our-partners" className="hover:text-blue-600 transition">Our Partners</a>
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#about" className="hover:text-blue-600 transition">About Us</a>
            <a href="#news" className="hover:text-blue-600 transition">News</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact Us</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Login - Secondary */}
            <a
              href="#login"
              className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition"
            >
              Login
            </a>

            {/* Join Now - Primary Emphasis */}
            <a
              href="#join"
              className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Menu Button */}
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
          <a href="#Benefits" className="block text-gray-700 hover:text-blue-600">Benefits</a>
          <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
          <a href="#membership" className="block text-gray-700 hover:text-blue-600">Membership</a>
          <a href="#our-partners" className="block text-gray-700 hover:text-blue-600">Our Partners</a>
          <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</a>
          <a href="#about" className="block text-gray-700 hover:text-blue-600">About Us</a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-600">Contact Us</a>
          <a
            href="#join"
            className="block text-center bg-blue-600 text-white rounded-md py-2 mt-2 hover:bg-blue-700 transition"
          >
            Join Now
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;

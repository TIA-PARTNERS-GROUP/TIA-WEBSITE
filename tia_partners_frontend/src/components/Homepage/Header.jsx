import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            TIA
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#join"
              className="inline-block px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
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
          <a href="#about" className="block text-gray-700 hover:text-blue-600">About</a>
          <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</a>
          <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-600">Contact</a>
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

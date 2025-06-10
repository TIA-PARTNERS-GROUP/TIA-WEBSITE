import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import GhostButton from "../Button/GhostButton";
import PrimaryButton from "../Button/PrimaryButton";
import ArrowIcon from "../../assets/icons/arrow_forward.svg";
import LoginIcon from "../../assets/icons/login.svg";

//import { lazyImports } from "../../routes/PageRoutes"; // adjust path as needed

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Updated navLinks to match the screenshot
  const navLinks = [
    //{ name: "Benefits", path: "/benefits", isRoute: true },
    //{ name: "Membership", path: "/membership", isRoute: true },
    { name: "Benefits", path: "#benefits" },
    { name: "Membership", path: "#membership" },
    { name: "Our Partners", path: "#our-partners" },
    { name: "Features", path: "#features" },
    { name: "How It Works", path: "#how-it-works" },
  ];

  const preloadRoute = (path) => {
    if (lazyImports[path]) {
      lazyImports[path](); // triggers dynamic import on hover/focus
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 group transition-all duration-300"
          >
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
              ),
            )}
          </nav>

          {/* CTA Buttons - Using custom button components */}
          <div className="hidden md:flex items-center space-x-3">
            <GhostButton
              onClick={() => (window.location.href = "#login")} // Use window.location for href
              className="px-5 py-2 text-sm" // Maintain original size if needed
            >
              Login
              <svg
                xmlns={LoginIcon}
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </GhostButton>
            <PrimaryButton
              onClick={() => (window.location.href = "#join")} // Use window.location for href
              className="px-6 py-2 text-sm flex items-center space-x-1" // Re-apply specific classes for 'Get Started'
            >
              <span>Get Started</span>
              {/* Replaced Unicode arrow with inline SVG arrow */}
              <svg
                xmlns={ArrowIcon}
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </PrimaryButton>
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
            ),
          )}
          {/* Mobile 'Get Started' button - Using PrimaryButton */}
          <PrimaryButton
            onClick={() => {
              setIsOpen(false);
              window.location.href = "#join";
            }} // Use window.location for href
            className="block text-center py-2 mt-2 w-full" // Ensure it spans full width in mobile
          >
            Get Started
          </PrimaryButton>
        </div>
      )}
    </header>
  );
};

export default Header;

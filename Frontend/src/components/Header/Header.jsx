import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

// --- Your Custom Button and Icon Components ---
import GhostButton from "../Button/GhostButton";
import PrimaryButton from "../Button/PrimaryButton";
import LoginIcon from "../Icons/LoginIcon";
import RegisterIcon from "../Icons/RegisterIcon";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "TIA Benefits", path: "/benefits" },
    { name: "About TIA", path: "/about"},
    { name: "Membership", path: "/membership" },
    { name: "Contact Us", path: "/contact"}
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        hasScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Group TIA Logo and Desktop Menu */}
          <div className="flex items-center space-x-10">
            {" "}
            {/* Added this wrapper */}
            {/* TIA Logo */}
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
            {/* Desktop Menu - now part of the same flex group as TIA */}
            <nav className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="hover:text-blue-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA Buttons - now separated by justify-between */}
          <div className="hidden md:flex items-center space-x-3">
          <Link to="/register">
          <GhostButton className="px-5 py-2 text-sm flex items-center gap-2">
            <span>Register</span>
            <RegisterIcon fillColor="currentColor" width="20" height="20" />
          </GhostButton>
        </Link>
          <Link to="/login">
          <PrimaryButton className="px-5 py-2 text-sm flex items-center gap-2">
            <span>Login</span>
            <LoginIcon fillColor="currentColor" width="20" height="20" />
          </PrimaryButton>
        </Link>
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

      {/* Mobile Menu (remains unchanged) */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 space-y-4 border-t border-gray-200 shadow-lg">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            <GhostButton
              onClick={() => {
                setIsOpen(false);
                window.location.href = "#login";
              }}
              className="w-full py-2.5 flex items-center justify-center"
            >
              <LoginIcon className="h-5 w-5 mr-2" />
              <span>Login</span>
            </GhostButton>
            <PrimaryButton
              onClick={() => {
                setIsOpen(false);
                window.location.href = "#join";
              }}
              className="block text-center py-2.5 mt-2 w-full"
            >
              Get Started
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
};

const App = () => {
  return <Header />;
};

export default App;

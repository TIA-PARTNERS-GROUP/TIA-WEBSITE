import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div className="flex items-center space-x-3">
          {/* Text Branding */}
          <div>
            <h3 className="text-xl font-extrabold text-white transform -skew-x-6">
              TIA
            </h3>
            <p className="mt-1 text-sm text-gray-300 opacity-80 max-w-xs">
              Turning Ideas into Alliances. Discover partners that grow with you.

            </p>

            <p className="mt-1 text-sm text-gray-300 opacity-80 max-w-xs">
              © {new Date().getFullYear()} TIA. All rights reserved.
            </p>
          </div>
        </div>


        {/* Navigation */}
        <div className="flex flex-col md:flex-row md:justify-center gap-6">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
          <a href="#cta" className="hover:text-white transition">Get Started</a>
        </div>

        {/* Socials */}
        <div className="flex md:justify-end gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaTwitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

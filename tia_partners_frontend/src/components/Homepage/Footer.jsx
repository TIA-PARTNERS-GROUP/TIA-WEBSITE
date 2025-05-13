import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold text-white">TIA</h3>
          <p className="mt-2 text-sm opacity-75">
            Turning Ideas into Alliances. Discover partners that grow with you.
          </p>
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

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} TIA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

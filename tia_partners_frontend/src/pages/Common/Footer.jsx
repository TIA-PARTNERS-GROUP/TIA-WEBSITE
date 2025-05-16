import { FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Branding */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-extrabold text-white transform -skew-x-6">TIA</h3>
          <p className="mt-2 text-sm opacity-80">
            Turning Ideas into Alliances. Discover partners that grow with you.
          </p>
          <p className="mt-4 text-sm opacity-60">
            © {new Date().getFullYear()} TIA. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="font-semibold text-white mb-4">Sitemap</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#how-it-works" className="hover:text-white">How it Works</a></li>
            <li><a href="#news" className="hover:text-white">News</a></li>
            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-white mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#partners" className="hover:text-white">Our Partners</a></li>
            <li><a href="#specialists" className="hover:text-white">Technology Specialists</a></li>
            <li><a href="#builders" className="hover:text-white">Business Builders</a></li>
            <li><a href="#distributors" className="hover:text-white">Technology Distributors</a></li>
          </ul>
        </div>

        {/* Membership */}
        <div>
          <h4 className="font-semibold text-white mb-4">Membership</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#membership" className="hover:text-white">Membership</a></li>
            <li><a href="#plans" className="hover:text-white">Membership Plans</a></li>
          </ul>
        </div>

        {/* Useful Links + Newsletter */}
        <div>
          <h4 className="font-semibold text-white mb-4">Helpful Links</h4>
          <ul className="space-y-2 text-sm mb-6">
            <li><a href="#account" className="hover:text-white">My Account</a></li>
            <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
            <li><a href="#terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>

          <h4 className="font-semibold text-white mb-2">Subscribe to Newsletter</h4>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-1 rounded-md text-gray-900 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-semibold hover:bg-blue-500 transition"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


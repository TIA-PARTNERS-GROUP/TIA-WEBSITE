import { FaRocket } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-4 leading-tight">
          Ready to Find Your Perfect Business Match?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Whether you're a startup, freelancer, or established company — TIA connects you with opportunities tailored to you.
        </p>
        <a
          href="#join"
          className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          <FaRocket className="mr-2" />
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default CTA;

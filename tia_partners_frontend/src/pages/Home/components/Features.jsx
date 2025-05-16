import { FaHandshake, FaSearch, FaBolt, FaGlobe } from 'react-icons/fa';

const features = [
  {
    icon: <FaHandshake className="text-blue-600 text-3xl" />,
    title: 'Smart Matching',
    description: 'Connect with businesses that complement yours using AI-powered matchmaking.',
  },
  {
    icon: <FaSearch className="text-blue-600 text-3xl" />,
    title: 'Opportunity Discovery',
    description: 'Find hidden opportunities and partnerships that align with your goals.',
  },
  {
    icon: <FaBolt className="text-blue-600 text-3xl" />,
    title: 'Instant Insights',
    description: 'Gain real-time intelligence about potential collaborators and clients.',
  },
  {
    icon: <FaGlobe className="text-blue-600 text-3xl" />,
    title: 'Global Network',
    description: 'Access a diverse ecosystem of innovators, creatives, and entrepreneurs worldwide.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            TIA helps you unlock meaningful connections through advanced technology and thoughtful design.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

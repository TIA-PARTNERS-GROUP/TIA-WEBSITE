import { FaUserPlus, FaLightbulb, FaLink } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUserPlus className="text-white text-2xl" />,
    title: 'Join the Network',
    description: 'Create your profile and tell us what you do. Whether you’re a business or a creative, we want to know your strengths.',
    bg: 'bg-blue-600',
  },
  {
    icon: <FaLightbulb className="text-white text-2xl" />,
    title: 'Get Smart Recommendations',
    description: 'Our AI engine finds partners, clients, or collaborators that truly complement your goals and skills.',
    bg: 'bg-yellow-500',
  },
  {
    icon: <FaLink className="text-white text-2xl" />,
    title: 'Connect & Grow',
    description: 'Chat, collaborate, or close deals — TIA helps you turn opportunities into success.',
    bg: 'bg-green-500',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            TIA makes finding meaningful business relationships simple. Here’s how it works in just three steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${step.bg}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

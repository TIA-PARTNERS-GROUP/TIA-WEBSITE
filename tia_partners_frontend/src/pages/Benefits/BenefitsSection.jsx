import { Lightbulb, Users, Handshake } from "lucide-react";

const benefits = [
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
    title: "Spark Innovation",
    description: "Gain insights and ideas by connecting with experts from different domains.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "Grow Your Network",
    description: "Build strong, meaningful professional relationships with aligned goals.",
  },
  {
    icon: <Handshake className="w-8 h-8 text-purple-600" />,
    title: "Find the Right Fit",
    description: "Our AI pairs you with complementary partners, not just random leads.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

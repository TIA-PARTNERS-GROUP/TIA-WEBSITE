import { motion } from "framer-motion";
import SlantedBackground from "../../components/Hero/SlantedBackground";

const benefits = [
  {
    title: "Market Your Business",
    points: [
      "Get good referrals",
      "Very high success rate",
      "Easy to do",
      "Quick results",
      "Very inexpensive",
      "Build trust easily",
    ],
  },
  {
    title: "Build Your Team",
    points: [
      "Expand capability – engage specialists",
      "Expand reach – national access",
      "No hiring and firing hassles",
      "No Management issues",
      "No downtime – all billable and quoted",
      "Free up time – Outsource",
    ],
  },
  {
    title: "Grow Your Business",
    points: [
      "Easily scalable resources",
      "Focus on Business Building",
      "Accelerate Business Growth",
      "Collaborate on larger projects",
      "Mastermind Advisory Panel",
      "Business Development Workshops",
    ],
  },
];

const BenefitsPage = () => {
  return (
    <section className="mx-auto px-4">
      <SlantedBackground top="40%" rotate="12"/>
      <section className="py-12 text-center bg-gray-50">
        <h3 className="text-4xl font-bold">TIA Benefits</h3>
        <div className="py-8">
          <blockquote className="italic text-gray-600 text-center">
            “It is literally true that you can succeed best and quickest by helping
            others to succeed.” <br />– Napolean Hill
          </blockquote>
        </div>
      </section>

      <div className="max-w-7xl mx-auto pb-24">
        <p className="text-center text-gray-700 pt-10 mb-12">
          The key benefits you can enjoy through partnering include:
        </p>

        <motion.div 
          className="grid md:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx} 
              className="border bg-white shadow-md rounded-2xl p-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-indigo-600 text-xl font-semibold mb-4">{benefit.title}</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                {benefit.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsPage;

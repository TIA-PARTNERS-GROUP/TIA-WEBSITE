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
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">TIA Benefits</h1>

      <h2 className="text-2xl font-semibold mb-6 text-center">Why Join TIA?</h2>
      <blockquote className="italic text-gray-600 text-center mb-10">
        “It is literally true that you can succeed best and quickest by helping
        others to succeed.” <br />– Napolean Hill
      </blockquote>

      <p className="text-center text-gray-700 mb-12">
        The key benefits you can enjoy through partnering include:
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {benefit.points.map((point, pIdx) => (
                <li key={pIdx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsPage;

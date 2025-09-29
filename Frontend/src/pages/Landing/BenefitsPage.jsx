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
      {/* Slanted, Fading Blue Background */}
      <div
        className="absolute left-0 w-full h-full -z-10 transform rotate-12 origin-top-left" // Added transform and origin back
        style={{
          // Adjust 'top' to move it down the page
          top: "40%", // Example: moves the background div down by 20% of its parent's height

          // Use a very light blue and a high angle for the gradient
          // The angle here for the gradient refers to the direction of the fade,
          // while 'rotate-6' creates the overall slant of the div.
          background: "linear-gradient(150deg, #E0F2FE 0%, transparent 60%)",

          // You might need to increase height/width to ensure it covers the area
          // especially after rotation and if moved down.
          height: "120%", // Increase height to prevent cut-off at bottom
          width: "150%", // Increase width to prevent cut-off at right
          // Also adjust left/top if the larger size shifts it too much
          // left: '-10%',
        }}
      ></div>
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

      <div className="grid md:grid-cols-3 gap-10">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="border bg-white shadow-md rounded-2xl p-6">
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
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default BenefitsPage;

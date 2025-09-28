const steps = [
  {
    title: "Manage",
    description: `Set up your profile and showcase what makes your business unique. Updates to your profile unlock fresh opportunities and visibility.`,
    image: "/assets/images/manage-bg.jpg",
  },
  {
    title: "Search",
    description: `Target the right partners by project type or expertise. Not sure? Use SmartConnect to discover curated matches instantly.`,
    image: "/assets/images/search-bg.jpg",
  },
  {
    title: "Connect",
    description: `Send connection requests, schedule calls, and explore collaboration. Our platform enforces anti-spam policies to keep connections meaningful.`,
    image: "/assets/images/connect-bg.jpg",
  },
  {
    title: "Build",
    description: `Develop long-term partnerships. Some deals close quickly, others grow over years – either way, every relationship is a new opportunity.`,
    image: "/assets/images/build-bg.jpg",
  },
];

const HowItWorksPage = () => {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-12 text-center">How It Works</h1>

      <div className="space-y-16">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Section */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Image Section */}
            <div
              className="md:w-1/2 h-64 bg-cover bg-center rounded-2xl shadow"
              style={{ backgroundImage: `url(${step.image})` }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksPage;

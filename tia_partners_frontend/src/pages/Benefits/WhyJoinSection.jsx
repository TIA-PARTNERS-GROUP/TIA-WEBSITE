const points = [
  "Targeted matching using AI",
  "Access to a diverse and high-quality network",
  "Ongoing support and curated introductions",
  "Save time by connecting only with the right people",
];

const WhyJoinSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Join TIA?</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          TIA isn’t just another networking platform — it’s a focused ecosystem designed to create genuine, impactful business relationships.
        </p>
        <ul className="text-left max-w-xl mx-auto grid gap-4 text-gray-700">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyJoinSection;

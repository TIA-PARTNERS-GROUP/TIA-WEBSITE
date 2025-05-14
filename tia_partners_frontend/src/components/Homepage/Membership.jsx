import React from "react";
import { FaUserPlus, FaLightbulb, FaLink } from "react-icons/fa";

const plans = [
  {
    title: "Unlock Your Community",
    subtitle: "Free",
    price: "Free",
    description: "Access to your local tech community, monthly LAN meetings, and your personal Micro-Site on the TIA Web Portal. Start building meaningful connections today!",
    buttonColor: "bg-blue-600", // Blue button color
  },
  {
    title: "Connect with Opportunity",
    subtitle: "Most Popular",
    price: "$35 / month",
    description: "Gain access to job postings statewide, connect with members across the region, and join the BUILD module to grow your network with Mastermind Advisory Panels.",
    buttonColor: "bg-yellow-500", // Yellow button color
  },
  {
    title: "Collaborate with Industry Leaders",
    subtitle: "Premium",
    price: "$135 / month",
    description: "Enjoy national member access, a premium business marketing pack, and job postings across the country. This is where business growth happens.",
    buttonColor: "bg-green-500", // Green button color
  },
];

const Membership = () => {
  return (
    <section className="py-16 bg-gray-50" id="membership">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Perfect Membership</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Join a community that grows with you. Choose your path to professional success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="flex flex-col justify-between bg-white text-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 min-h-[420px] transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="font-medium text-lg mb-4">{plan.price}</p>
                <p className="text-sm">{plan.description}</p>
              </div>

              {/* Call-to-Action Button */}
              <div className="mt-auto pt-6">
                <a
                  href="#join"
                  className={`block w-full ${plan.buttonColor} text-white text-sm font-bold py-2 px-4 rounded-md transition hover:opacity-80`}
                >
                  Get Started with {plan.subtitle}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;

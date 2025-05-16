import React from 'react';


const PricingCard = ({ type, price, features, img, link, isFeatured }) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 bg-white transition transform hover:scale-105 ${
        isFeatured ? 'border-4 border-blue-600' : ''
      }`}
      data-aos="fade-up"
    >
      <div className="flex flex-col items-center">
        <img src={img} alt={type} className="w-12 h-12 mb-2" />
        <span className="text-lg font-bold text-blue-600">{type}</span>
      </div>

      <div className="mt-4 text-3xl font-extrabold">
        <span className="text-gray-800">${price}</span>
        <span className="text-sm text-gray-500">/mo</span>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-gray-700 text-left">
        {features.map((feature, idx) => (
          <li key={idx}>• {feature}</li>
        ))}
      </ul>

      <a
        href={link}
        className={`block mt-6 text-center px-4 py-2 rounded-md font-semibold ${
          isFeatured
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        } transition`}
      >
        SIGN UP
      </a>
    </div>
  );
};

export default PricingCard

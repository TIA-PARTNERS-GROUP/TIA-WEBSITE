import React from 'react';


const QuoteSection = () => {
  return (
    <section id="hiw-second-sec" className="bg-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h3
          className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6"
          data-aos="fade-up"
        >
          Your TIA partners are waiting to meet you
        </h3>
        <p
          className="text-lg text-gray-600 max-w-xl mx-auto"
          style={{ marginTop: '30px' }}
          data-aos="fade-up"
        >
          Find a group of people who challenge and inspire you, spend a lot of time with them, and it will change your life.
          <br />
          <span className="italic text-gray-500 mt-4 block">– Amy Poehler</span>
        </p>
      </div>
    </section>
  );
};

export default QuoteSection;

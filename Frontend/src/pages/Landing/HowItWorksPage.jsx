import React from "react";
import { motion } from "framer-motion";
import manageImage from "../../assets/images/manage-showcase.png";
import searchImage from "../../assets/images/search-showcase.png";
import connectImage from "../../assets/images/connect-showcase.png";
import buildImage from "../../assets/images/build-showcase.png";
import ManageIcon from "../../components/Icons/ManegIcon";
import SearchIcon from "../../components/Icons/SearchIcon";
import ConnectIcon from "../../components/Icons/ConnectIcon";
import BuildIcon from "../../components/Icons/BuildIcon";
import SlantedBackground from "../../components/Hero/SlantedBackground";

const steps = [
  {
    title: "Manage",
    description: `Set up your profile and showcase what makes your business unique. Updates to your profile unlock fresh opportunities and visibility.`,
    image: manageImage,
    imageStyle: {
      transform: 'scale(1.5) translateX(-14%)',
      transformOrigin: 'left center'
    },
    icon: ManageIcon
  },
  {
    title: "Search",
    description: `Target the right partners by project type or expertise. Not sure? Use SmartConnect to discover curated matches instantly.`,
    image: searchImage,
    imageStyle: {
      transform: 'scale(1.55) translateX(-8%) translateY(2%)',
      transformOrigin: 'center center'
    },
    icon: SearchIcon
  },
  {
    title: "Connect",
    description: `Send connection requests, schedule calls, and explore collaboration. Our platform enforces anti-spam policies to keep connections meaningful.`,
    image: connectImage,
    imageStyle: {
      transform: 'scale(1.6) translateY(-21%)',
      transformOrigin: 'center top'
    },
    icon: ConnectIcon
  },
  {
    title: "Build",
    description: `Develop long-term partnerships. Some deals close quickly, others grow over years – either way, every relationship is a new opportunity.`,
    image: buildImage,
    imageStyle: {
      transform: 'scale(1.7) translateX(-16%) translateY(16%)',
      transformOrigin: '25% 75%'
    },
    icon: BuildIcon
  },
];

const HowItWorksPage = () => {
  return (
    <section className="max-w-8xl mx-auto px-4">
      <SlantedBackground top="115%" height="100%" />
      <SlantedBackground top="250%" rotate="12"/>

      <section className="py-12 text-center bg-gray-50">
        <h3 className="text-4xl font-bold">How It Works</h3>
        <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
          The 4 Steps to a Successful Partnership.
        </p>
        {/* Pipeline Circles */}
<div className="flex justify-center items-center py-8">
  <div className="flex items-center">
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        {/* Circle and Text */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeIn", delay: index * 0.25 }}
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 font-semibold text-lg mb-2 relative z-10 border-4 shadow-lg">
            <step.icon className="w-8 h-8" />
          </div>
          <span className="text-sm font-bold text-indigo-800">{step.title}</span>
        </motion.div>
        
        {/* Connector Line (except after last item) */}
        {index < steps.length - 1 && (
          <motion.div 
            className="w-24 h-1 bg-indigo-900 mx-4 relative -top-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeIn", delay: (index * 0.25) + 0.1 }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
</div>
      </section>


      <div className="mt-16 space-y-0">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}

          >
            {/* Text Section */}
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.5, ease: "easeIn"}}
            >
              <div className="max-w-2xl w-full text-left"> {/* Added container for centering */}
                <h2 className="text-4xl font-semibold">{step.title}</h2>
                <p className="mt-8 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: idx % 2 === 1 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.5, ease: "easeIn"}}
            >
              <div className="relative h-[40rem] w-full rounded-2xl shadow overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-contain"
                  style={step.imageStyle}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksPage;

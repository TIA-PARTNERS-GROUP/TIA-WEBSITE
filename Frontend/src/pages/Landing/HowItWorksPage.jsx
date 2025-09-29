import manageImage from "../../assets/images/manage-showcase.png";
import searchImage from "../../assets/images/search-showcase.png";
import connectImage from "../../assets/images/connect-showcase.png";
import buildImage from "../../assets/images/build-showcase.png";
import ManageIcon from "../../components/Icons/ManegIcon";
import SearchIcon from "../../components/Icons/SearchIcon";
import ConnectIcon from "../../components/Icons/ConnectIcon";
import BuildIcon from "../../components/Icons/BuildIcon";

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
      <div
        className="absolute left-0 w-full h-full -z-10 transform -rotate-12 origin-top-left" // Added transform and origin back
        style={{
          // Adjust 'top' to move it down the page
          top: "115%", // Example: moves the background div down by 20% of its parent's height

          // Use a very light blue and a high angle for the gradient
          // The angle here for the gradient refers to the direction of the fade,
          // while 'rotate-6' creates the overall slant of the div.
          background: "linear-gradient(150deg, #E0F2FE 0%, transparent 60%)",

          // You might need to increase height/width to ensure it covers the area
          // especially after rotation and if moved down.
          height: "100%", // Increase height to prevent cut-off at bottom
          width: "150%", // Increase width to prevent cut-off at right
          // Also adjust left/top if the larger size shifts it too much
          // left: '-10%',
        }}
      ></div>
      <div
        className="absolute left-0 w-full h-full -z-10 transform rotate-12 origin-top-left" // Added transform and origin back
        style={{
          // Adjust 'top' to move it down the page
          top: "250%", // Example: moves the background div down by 20% of its parent's height

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
        <h3 className="text-4xl font-bold">How It Works</h3>
        <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
          The 4 Steps to a Successful Partnership.
        </p>
        {/* Pipeline Circles */}
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 font-semibold text-lg mb-2 relative z-10 border-4 shadow-lg">
                    <step.icon className="w-8 h-8" /> {/* Render the icon component */}
                  </div>
                  <span className="text-sm font-bold text-indigo-800">{step.title}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="w-24 h-1 bg-indigo-900 mx-4 relative -top-4"></div>
                )}
              </div>
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
            <div className="md:w-1/2 flex justify-center">
              <div className="max-w-2xl w-full text-left"> {/* Added container for centering */}
                <h2 className="text-4xl font-semibold">{step.title}</h2>
                <p className="mt-8 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative h-[40rem] w-full rounded-2xl shadow overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-contain"
                  style={step.imageStyle}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksPage;

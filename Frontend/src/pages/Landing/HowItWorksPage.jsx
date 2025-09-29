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
    <section className="max-w-8xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">How It Works</h1>

      {/* Pipeline Circles */}
      <div className="flex justify-center items-center mb-16">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 font-semibold text-lg mb-2 relative z-10 border-4 border-blue-600 shadow-lg">
                  <step.icon className="w-8 h-8" /> {/* Render the icon component */}
                </div>
                <span className="text-sm font-medium text-gray-700">{step.title}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="w-24 h-1 bg-blue-600 mx-4 relative -top-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-0">
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

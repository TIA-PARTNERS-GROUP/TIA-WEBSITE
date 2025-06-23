import BoltIcon from "../Icons/BoltIcon";
import GlobeIcon from "../Icons/GlobeIcon";
import SearchIcon from "../Icons/SearchIcon";
import HandshakeIcon from "../Icons/HandshakeIcon";

const HeroFeatures = () => {
  return (
    <div className="bg-transparent py-20 sm:py-0 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          auctor.
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
          <BoltIcon fillColor="#ec4899" width="40" height="50" />
          <GlobeIcon fillColor="#fb923c" width="40" height="50" />
          <SearchIcon fillColor="#84cc16" width="40" height="50" />
          <HandshakeIcon fillColor="#3b82f6" width="40" height="50" />
        </div>
      </div>
    </div>
  );
};

export default HeroFeatures;

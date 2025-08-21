import { Link } from "react-router-dom";
import ArrowForwardIcon from "../Icons/ArrowFoward";
import PrimaryButton from "../Button/PrimaryButton";
import GhostButton from "../Button/GhostButton";
import { getBackendAPI } from "../../api/backendAPICallExample.js"

/**
 * A responsive hero heading component with a title, subtitle, and action buttons.
 * This component is based on the provided screenshot.
 *
 * @returns {JSX.Element} The rendered HeroHeading component.
 */

const handleAPITest = async () => {
  try {
    const data = await getBackendAPI();
    console.log("Backend Response:", data);
    alert(`✅ API Response: ${JSON.stringify(data)}`);
  } catch (err) {
    console.error("API Error:", err);
    alert("❌ API call failed. See console for details.");
  }
};

const HeroHeading = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 sm:pt-0 sm:pb-0 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 tracking-tight">
          Your <span className="text-blue-600">partner</span> to profit
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
          People-powered platform. Find your next partner.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Join Now → /login */}
          <Link to="/login">
            <PrimaryButton className="px-6 py-2 text-sm">
              <span>Join Now</span>
            </PrimaryButton>
          </Link>
          
          <GhostButton
            onClick={() => (handleAPITest())}
            className="px-10 py-2 text-sm flex items-center gap-2"
          >
            <span>Find Your Membership Now</span>
            <ArrowForwardIcon fillColor="currentColor" width="20" height="20" />
          </GhostButton>
        </div>
      </div>
    </div>
  );
};

export default HeroHeading;
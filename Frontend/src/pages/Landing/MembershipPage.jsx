import HeaderComponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import PrimaryButton from "../../components/Button/PrimaryButton";
import CheckIcon from "../../components/Icons/CheckIcon";

const MembershipPlansPage = () => {
  return (
    <div className="relative overflow-hidden">

      {/* Slanted, Fading Blue Background */}
      <div
        className="absolute left-0 w-full h-full -z-10 transform rotate-12 origin-top-left" // Added transform and origin back
        style={{
          // Adjust 'top' to move it down the page
          top: "30%", // Example: moves the background div down by 20% of its parent's height

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

      {/* Section Heading */}
      <section className="py-12 text-center bg-gray-50">
        <h3 className="text-4xl font-bold">Membership</h3>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our memberships offer a low cost entry and deliver high on value
        </p>
      </section>

      {/* Membership Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-7xl mx-auto">
          
          {/* Free Plan - Shorter */}
          <div className="bg-white border rounded-lg shadow-lg p-8 flex flex-col justify-between">
            <div>
              <div className="text-center mb-6">
                <h4 className="text-2xl font-semibold text-gray-800">Free</h4>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-2">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  6 Month Full Membership
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Business Connection Tool
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  TIA LinkedIn Group Member
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  TIA Facebook Group Membership
                </li>
              </ul>
            </div>
            <div className="mt-6 text-center">
              <PrimaryButton className="w-full">
                <a className="inline-block text-white rounded-lg w-full">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </div>

          {/* Connect Plan - Taller (Featured) */}
          <div className="bg-white border-2 border-blue-500 rounded-lg shadow-xl p-8 flex flex-col justify-between transform -translate-y-4">
            <div>
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  Featured
                </div>
                <h4 className="text-2xl font-semibold text-gray-800">Connect</h4>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$50</span>
                  <span className="text-gray-600 ml-2">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <strong>All Free Features Plus</strong>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Access to Local Job Posts
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Access to NETWORK Module
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Monthly Partner Training
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Monthly Technology Updates
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Monthly Guest Speakers
                </li>
              </ul>
            </div>
            <div className="mt-6 text-center">
              <PrimaryButton className="w-full bg-blue-600 hover:bg-blue-700">
                <a className="inline-block text-white rounded-lg w-full">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </div>

          {/* Collaborate Plan - Shorter */}
          <div className="bg-white border rounded-lg shadow-lg p-8 flex flex-col justify-between">
            <div>
              <div className="text-center mb-6">
                <h4 className="text-2xl font-semibold text-gray-800">Collaborate</h4>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$150</span>
                  <span className="text-gray-600 ml-2">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <strong>Free and Connect Features Plus</strong>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Meeting Coordination
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Full Access to BUILD Module
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Full Access to TRADE Module
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Full Dashboard Access
                </li>
              </ul>
            </div>
            <div className="mt-6 text-center">
              <PrimaryButton className="w-full">
                <a className="inline-block text-white rounded-lg w-full">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPlansPage;
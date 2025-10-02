import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PrimaryButton from "../../components/Button/PrimaryButton";
import CheckIcon from "../../components/Icons/CheckIcon";
import SlantedBackground from "../../components/Hero/SlantedBackground";

const MembershipPlansPage = () => {

  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">

      <SlantedBackground top="30%" rotate="12" />

      {/* Section Heading */}
      <section className="py-12 text-center bg-gray-50">
        <h3 className="text-4xl font-bold">Membership</h3>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our memberships offer a low cost entry and deliver high on value
        </p>
      </section>

      {/* Membership Plans */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          
          {/* Free Plan - Shorter */}
          <motion.div 
            className="bg-white border rounded-lg shadow-lg p-8 flex flex-col justify-between"  
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
              <PrimaryButton className="w-full" onClick={() => (navigate("/register"))}>
                <a className="inline-block text-white rounded-lg w-full">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </motion.div>

          {/* Connect Plan - Taller (Featured) */}
          <motion.div 
            className="bg-white border-2 border-blue-500 rounded-lg shadow-xl p-8 flex flex-col justify-between transform -translate-y-4"
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
              <PrimaryButton className="w-full bg-gray-300 hover:bg-gray-300 hover:cursor-not-allowed">
                <a className="inline-block text-white rounded-lg w-full">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </motion.div>

          {/* Collaborate Plan - Shorter */}
          <motion.div 
            className="bg-white border rounded-lg shadow-lg p-8 flex flex-col justify-between"
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
              <PrimaryButton className="w-full bg-gray-300 hover:bg-gray-300 hover:cursor-not-allowed">
                <a className="inline-block text-white rounded-lg w-full">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default MembershipPlansPage;
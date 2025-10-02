import { useNavigate } from "react-router-dom";
import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import ValueEstimatorIcon from "../../../components/Icons/ValueEstimatorIcon";
import LightBulbIcon from "../../../components/Icons/LightBulbIcon";
import LadderIcon from "../../../components/Icons/LadderIcon";

const BuildPage = () => {

  const navigate = useNavigate();

  const tools = [
    {
      icon: <ValueEstimatorIcon className="w-8 h-8"/>,
      title: "Business Value Estimator",
      description: "Estimate the saleable value of your business",
      onClick: () => navigate("/tools/business-value-estimator")
    },
    {
      icon: <LightBulbIcon className="w-8 h-8"/>,
      title: "Vision",
      description: "Define your business vision",
      onClick: () => navigate("/chat-llm/vision")
    },
    {
      icon: <LadderIcon className="w-6 h-6"/>,
      title: "Ladder To Exit",
      description: "Plan your business exit strategy",
      onClick: () => navigate("/chat-llm/ladder-to-exit")
    }
  ];

  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4">
      <div className="bg-white rounded-xl p-8">
        <PortalHeader module={"Build"}/>
        <ProfileTab />
      </div>
      <div className="bg-white rounded-xl p-8">
        <h1 className="pt-2 text-2xl @md:text-3xl font-semibold text-black-800 pb-4">Tools</h1>
        <div className="flex flex-col gap-4">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={tool.onClick}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left w-full"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                {tool.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{tool.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BuildPage;

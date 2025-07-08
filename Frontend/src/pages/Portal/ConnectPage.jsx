import PortalHeader from "../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../components/Portal/Dashboard/ProfileTab";
import HorizontalTabs from "../../components/Button/HorizontalTabs";

// Tab names
const partnerTabData = [
    {description: "Alliance Partners"}, 
    {description: "Complementary Partners"}, 
    {description: "MasterMind Partners"}, 
];

const searchTabData = [
    {description: "SmartConnect"}, 
    {description: "Quick Search"}
];

const ConnectPage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4"> 
      <div className="bg-white rounded-xl">
        <PortalHeader />
        <ProfileTab />
      </div>
      <div>
        <HorizontalTabs tabData = {partnerTabData} />
        <div className="bg-white rounded-xl pt-10 pl-20">
            <HorizontalTabs tabData = {searchTabData} />
        </div>
      </div>
    </main>
  );
};

export default ConnectPage;
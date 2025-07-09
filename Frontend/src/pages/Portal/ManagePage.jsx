import PortalHeader from "../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../components/Portal/Dashboard/ProfileTab";
import HorizontalTabs from "../../components/Button/HorizontalTabs";
import ProfileHeader from "../../components/Portal/Manage/ProfileHeader";
import ContactInfo from "../../components/Portal/Manage/ContactInfo";

// Tab names
const tabData = [
    {description: "Profile"}, 
    {description: "Case Studies"}, 
    {description: "Testimonials"}, 
    {description: "What We Do"}, 
    {description: "Blogs"}, 
    {description: "Mastermind"}
];

const ManagePage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full py-4 space-y-4"> 
      <div className="bg-white rounded-xl">
        <PortalHeader />
        <ProfileTab />
      </div>
      <div>
        <HorizontalTabs tabData = {tabData} />
        <div className="bg-white rounded-xl">
            <ProfileHeader />
        </div>
      </div>
      <div className="bg-white rounded-xl">
        <ContactInfo />
      </div>
    </main>
  );
};

export default ManagePage;
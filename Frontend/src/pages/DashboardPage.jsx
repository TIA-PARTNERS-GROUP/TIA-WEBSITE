import PortalHeader from "../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../components/Portal/Dashboard/ProfileTab";
import FocusTab from "../components/Portal/Dashboard/FocusTab";
import GoalTracker from "../components/Portal/Dashboard/GoalTracker";
import NextAction from "../components/Portal/Dashboard/NextAction";
import DailyActivities from "../components/Portal/Dashboard/DailyActivities";

// Sample Data for Daily Activities Progress Bars
const barData = [
  { progress: "60", description: "Alliance Partners connected"},
  { progress: "100", description: "Complimentary Partners connected"},
  { progress: "22", description: "Goals Completed this Quarter"},
  { progress: "50", description: "Tech Briefings Attended"},
  { progress: "60", description: "Networking Events Attended"},
  { progress: "80", description: "MasterMind Panels"}
]

const DashboardPage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4"> 
      <div className="bg-white rounded-xl">
        <PortalHeader />
        <ProfileTab />
      </div>
      <div className="bg-white rounded-xl">
        <FocusTab />
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-8 h-full">
          <GoalTracker />
        </div>
        <div className="bg-white rounded-xl p-8 h-full">
          <NextAction />
        </div>
        <div className="bg-white rounded-xl p-8 h-full">
          <DailyActivities overallProgress = {80} barData = {barData} />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

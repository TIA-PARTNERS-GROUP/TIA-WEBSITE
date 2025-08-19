import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";
import FocusTab from "../../../components/Portal/Dashboard/FocusTab";
import GoalTracker from "../../../components/Portal/Dashboard/GoalTracker";
import NextAction from "../../../components/Portal/Dashboard/NextAction";
import DailyActivities from "../../../components/Portal/Dashboard/DailyActivities";

// Sample Data for Daily Activities Progress Bars
const barData = [
  { progress: "60", description: "Alliance Partners connected"},
  { progress: "100", description: "Complimentary Partners connected"},
  { progress: "80", description: "MasterMind Panels"}
]

const goalData = [
  { progress: 22, description: "Goals Completed this Quarter"},
  { progress: 50, description: "Tech Briefings Attended"},
  { progress: 60, description: "Networking Events Attended"}
]

const initialActionData = [
  { description: "Finish setting up profile", input: false},
  { description: "Post your first Blog", input: false}
]

const DashboardPage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4"> 
      <div className="bg-white rounded-xl p-8">
        <PortalHeader module={"Dashboard"}/>
        <ProfileTab />
      </div>
      <div className="bg-white rounded-xl p-8">
        <FocusTab />
      </div>
      <div className="grid grid-cols-3 gap-8 pb-4">
        <div className="bg-white rounded-xl p-8 h-full">
          <DailyActivities overallProgress = {80} barData = {barData} />
        </div>
        <div className="bg-white rounded-xl p-8 h-full">
          <NextAction initialActionData = {initialActionData}/>
        </div>
        <div className="bg-white rounded-xl p-8 h-full">
          <GoalTracker goalData = {goalData}/>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

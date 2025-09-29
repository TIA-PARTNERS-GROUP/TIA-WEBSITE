// src/pages/Portal/Dashboard/FirstTimeView.jsx
import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";
import FocusTab from "../../../components/Portal/Dashboard/FocusTab";


export default function FirstTimeView() {
  return (
    <main className="font-poppins relative min-h-screen sm:px-4 lg:px-8 2xl:px-10 bg-gray-100 w-full pt-4 space-y-4">
      <div className="bg-white rounded-xl p-8">
        <PortalHeader module={"Dashboard"} />
        <ProfileTab />
      </div>

      <div className="bg-white rounded-xl p-8">
        <FocusTab /> {/* Render without requiring login  */}
      </div>


      <section className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="text-gray-700">
          Select a goal, then click the “Configure workspace” button in the left sidebar.
        </div>
      </section>
    </main>
  );
}

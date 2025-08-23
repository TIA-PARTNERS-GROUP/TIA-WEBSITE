import { Outlet } from "react-router-dom";
import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";

const ManagePage = () => {
  return (
      <main className="font-poppins relative min-h-screen sm:px-4 lg:px-8 2xl:px-10 bg-gray-100 w-full pt-4 space-y-4"> 
        <div className="bg-white rounded-xl p-8">
          <PortalHeader module={"Manage"}/>
          <ProfileTab />
        </div>
        <div>
          <Outlet />
        </div>
      </main>
  );
};

export default ManagePage;
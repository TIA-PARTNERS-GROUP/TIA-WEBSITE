import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";
import { Outlet } from "react-router-dom";
import axios from '../../../api/axios.js'

const res = await axios.get('/users/me');
const userData = res.data;

const ConnectPage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4"> 
      <div className="bg-white rounded-xl p-8">
        <PortalHeader />
        <ProfileTab data={userData.data}/>
      </div>
      <div className="bg-white rounded-xl p-8">
        <Outlet />
      </div>
    </main>
  );
};

export default ConnectPage;
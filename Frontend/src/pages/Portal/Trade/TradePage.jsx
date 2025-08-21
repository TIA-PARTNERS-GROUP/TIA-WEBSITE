import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import TradeTab from "../../../components/Portal/Trade/TradeTab";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";
import axios from '../../../api/axios.js'

const res = await axios.get('/users/me');
const userData = res.data;

const TradePage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4">
      <div className="bg-white rounded-xl p-8">
        <PortalHeader module={"Trade"}/>
        <ProfileTab data={userData.data}/>
      </div>
      <div className="bg-white rounded-xl p-8">
        <TradeTab />
      </div>
    </main>
  );
};

export default TradePage;

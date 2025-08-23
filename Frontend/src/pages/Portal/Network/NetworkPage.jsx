import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";

const NetworkPage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4">
      <div className="bg-white rounded-xl p-8">
        <PortalHeader module={"Network"}/>
        <ProfileTab />
      </div>
      <div className="bg-white rounded-xl p-8">
        <h1 className="pt-2 text-2xl @md:text-3xl font-semibold text-black-800 pb-4">Coming Soon!</h1>
      </div>
    </main>
  );
};

export default NetworkPage;

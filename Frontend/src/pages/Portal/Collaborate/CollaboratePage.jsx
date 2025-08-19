import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";

const CollaboratePage = () => {
  return (
    <main className="font-poppins relative min-h-screen px-10 bg-gray-100 w-full pt-4 space-y-4">
      <div className="bg-white rounded-xl p-8">
        <PortalHeader module={"Collaborate"}/>
        <ProfileTab />
      </div>
      <div className="bg-white rounded-xl p-8">
        <h1>Coming Soon!</h1>
      </div>
    </main>
  );
};

export default CollaboratePage;

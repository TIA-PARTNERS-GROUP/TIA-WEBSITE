import ProfileHeader from "../../../components/Portal/Manage/ProfileHeader";
import ContactInfo from "../../../components/Portal/Manage/ContactInfo";
import HexagonList from "../../../components/Portal/Manage/HexagonList";

const companyDescription = 'DyCom is a seasoned and experienced Network Services\
 company that takes great pride in offering a wide-range of sophisticated IT products\
  and services designed to meet the ever-growing and ever-expanding needs of our clients\
   and the businesses they operate.';

const whatwedoData = [
    {description: "DyCom Wireless - Wireless solutions"},
    {description: "DyCom SmartStaff - Staff provision"},
    {description: "DyCom Security - Security, surveillance and alarm services"},
    {description: "DyCom Technology - Network services for IT products"},
    {description: "DyCom Cloud - Compute cloud environments"},
];

const clientData = [
    {description: "Small technology businesses"}
];

const Profile = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl px-8 py-2">
          <ProfileHeader />
      </div>
      <div className="bg-white rounded-xl px-8 py-2">
        <ContactInfo />
      </div>
      <div className="bg-white rounded-xl px-16 py-2">
        <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800">Who We Are</h2>
        <p className="py-8 text-lg">{companyDescription}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="bg-white rounded-xl px-16 py-2">
          <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800 pb-8">What We Do</h2>
          <HexagonList listData={whatwedoData} />
        </div>
        <div className="bg-white rounded-xl px-16 py-2">
          <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800 pb-8">Our Clients</h2>
          <HexagonList listData={clientData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
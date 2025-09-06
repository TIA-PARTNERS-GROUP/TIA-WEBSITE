import { useEffect, useState } from "react";
import { getCurrentBusinessInfo } from "../../../api/business";
import { useLoading } from "../../../utils/LoadingContext";
import ProfileHeader from "./ProfileHeader";
import ContactInfo from "./ContactInfo";
import HexagonList from "./HexagonList";

const ProfileOutput =({ 
    personalProfile, 
    companyName, 
    companyDescription, 
    whatwedoData, 
    clientData, 
    contactInfo}) => {
  
  const { startLoading, stopLoading } = useLoading();
  
  const [defaultCompanyDescription, setDefaultCompanyDescription] = useState("Loading...");
  const [defaultContactInfo, setDefaultContactInfo] = useState(["Loading...", "Loading...", "Loading..."]);
  const [defaultCompanyName, setDefaultCompanyName] = useState("Loading...");
  const [defaultWhatWeDoData, setDefaultWhatWeDoData] = useState([{description: "Loading..."}]);
  const [defaultClientData, setDefaultClientData] = useState([{description: "Loading..."}]);

  companyName = companyName ?? defaultCompanyName;
  companyDescription = companyDescription ?? defaultCompanyDescription;
  contactInfo = contactInfo ?? defaultContactInfo;
  whatwedoData = whatwedoData ?? defaultWhatWeDoData;
  clientData = clientData ?? defaultClientData;
  
  useEffect(() => {
    startLoading();
      getCurrentBusinessInfo()
        .then((res) => {
          setDefaultCompanyDescription(res.data.businessDescription);
          setDefaultContactInfo([res.data.contactName, res.data.contactPhone, res.data.contactEmail]);
          setDefaultCompanyName(res.data.businessName);
          setDefaultWhatWeDoData(res.data.services);
          setDefaultClientData(res.data.clients);
          stopLoading();
        })
        .catch((error) => {console.error('Error fetching username:', error);});
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl sm:px-2 px-8 py-2">
          <ProfileHeader personalProfile={personalProfile} companyName={companyName}/>
      </div>
      <div className="bg-white rounded-xl sm:px-4 px-8 py-2">
        <ContactInfo contactInfo={contactInfo}/>
      </div>
      <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
        <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800">Who We Are</h2>
        <p className="py-8 sm:text-sm 2xl:text-lg">{companyDescription}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
          <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800 pb-8">What We Do</h2>
          <HexagonList listData={whatwedoData} />
        </div>
        <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
          <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800 pb-8">Our Clients</h2>
          <HexagonList listData={clientData} />
        </div>
      </div>
    </div>
  );
};

export default ProfileOutput;
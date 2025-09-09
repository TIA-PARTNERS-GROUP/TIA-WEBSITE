import { useEffect, useState } from "react";
import { getCurrentBusinessInfo } from "../../../api/business";
import { useLoading } from "../../../utils/LoadingContext";
import ProfileHeader from "./ProfileHeader";
import ContactInfo from "./ContactInfo";
import HexagonList from "./HexagonList";

const ProfileOutput =({ 
    personalProfile, 
    connectionId,
    businessId,
    companyName, 
    companyDescription, 
    whatwedoData, 
    clientData, 
    contactInfo,
    connectionNum}) => {
  
  const { startLoading, stopLoading } = useLoading();
  
  const [defaultCompanyDescription, setDefaultCompanyDescription] = useState("Loading...");
  const [defaultContactInfo, setDefaultContactInfo] = useState(["Loading...", "Loading...", "Loading..."]);
  const [defaultCompanyName, setDefaultCompanyName] = useState("Loading...");
  const [defaultWhatWeDoData, setDefaultWhatWeDoData] = useState([{description: "Loading..."}]);
  const [defaultClientData, setDefaultClientData] = useState([{description: "Loading..."}]);
  const [defaultConnectionNum, setDefaultConnectionNum] = useState(0);

  companyName = companyName ?? defaultCompanyName;
  companyDescription = companyDescription ?? defaultCompanyDescription;
  contactInfo = contactInfo ?? defaultContactInfo;
  whatwedoData = whatwedoData ?? defaultWhatWeDoData;
  clientData = clientData ?? defaultClientData;
  connectionNum = connectionNum ?? defaultConnectionNum;
  
  useEffect(() => {
  const fetchBusinessInfo = async () => {
    startLoading();
    
    try {
      const res = await getCurrentBusinessInfo();
      const { 
        businessDescription, 
        contactName, 
        contactPhone, 
        contactEmail, 
        businessName, 
        services, 
        clients, 
        connections 
      } = res.data;
      
      setDefaultCompanyDescription(businessDescription);
      setDefaultContactInfo([contactName, contactPhone, contactEmail]);
      setDefaultCompanyName(businessName);
      setDefaultWhatWeDoData(services);
      setDefaultClientData(clients);
      setDefaultConnectionNum(connections.length);
    } catch (error) {
      console.error('Error fetching business info:', error);
    } finally {
      stopLoading();
    }
  };

  fetchBusinessInfo();
}, []);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl sm:px-2 px-8 py-2">
          <ProfileHeader personalProfile={personalProfile} companyName={companyName} connectionNum={connectionNum} connectionId={connectionId} businessId={businessId}/>
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
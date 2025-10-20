import { useEffect, useState } from "react";
import { getCurrentBusinessInfo, getOtherBusinessInfo } from "../../../api/business";
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
    connectionNum,
    companyCategory,
    fromNotifications,
    skills,
    strengths
  }) => {
  
  const { startLoading, stopLoading } = useLoading();
  
  const [defaultCompanyDescription, setDefaultCompanyDescription] = useState("Loading...");
  const [defaultContactInfo, setDefaultContactInfo] = useState(["Loading...", "Loading...", "Loading..."]);
  const [defaultCompanyName, setDefaultCompanyName] = useState("Loading...");
  const [defaultWhatWeDoData, setDefaultWhatWeDoData] = useState([{description: "Loading..."}]);
  const [defaultClientData, setDefaultClientData] = useState([{description: "Loading..."}]);
  const [defaultSkills, setDefaultSkills] = useState([]);
  const [defaultStrengths, setDefaultStrengths] = useState([]);
  const [defaultConnectionNum, setDefaultConnectionNum] = useState(0);
  const [defaultCategory, setDefaultCategory] = useState("");

  const displayCompanyName = companyName ?? defaultCompanyName;
  const displayCompanyDescription = companyDescription ?? defaultCompanyDescription;
  const displayContactInfo = contactInfo ?? defaultContactInfo;
  const displayWhatWeDoData = whatwedoData ?? defaultWhatWeDoData;
  const displayClientData = clientData ?? defaultClientData;
  const displaySkills = skills ?? defaultSkills;
  const displayStrengths = strengths ?? defaultStrengths;
  const displayConnectionNum = connectionNum ?? defaultConnectionNum;
  const displayCategory = companyCategory ?? defaultCategory;
  
  useEffect(() => {
  const fetchBusinessInfo = async () => {
    if (personalProfile || !companyName || !businessId) {
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
          connections,
          businessCategory,
          skills,
          strengths
        } = res.data;
        
        setDefaultCompanyDescription(businessDescription);
        setDefaultContactInfo([contactName, contactPhone, contactEmail]);
        setDefaultCompanyName(businessName);
        setDefaultWhatWeDoData(services);
        setDefaultClientData(clients);
        setDefaultSkills(skills);
        setDefaultStrengths(strengths);
        setDefaultConnectionNum(connections.length);
        setDefaultCategory(businessCategory);
      } catch (error) {
        console.error('Error fetching business info:', error);
      } finally {
        stopLoading();
      }
    }
  };

  fetchBusinessInfo();
}, [personalProfile, companyName, businessId]);

  // Format skills and strengths to match the HexagonList expected format
  const formattedSkills = displaySkills.map(skill => ({ 
    description: skill.name,
    category: skill.category_name 
  }));
  
  const formattedStrengths = displayStrengths.map(strength => ({ 
    description: strength.name,
    category: strength.category_name 
  }));

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl sm:px-2 px-8 py-2">
          <ProfileHeader 
            personalProfile={personalProfile} 
            companyName={displayCompanyName} 
            connectionNum={displayConnectionNum} 
            connectionId={connectionId} 
            businessId={businessId} 
            companyCategory={displayCategory} 
            contactName={displayContactInfo[0]} 
            contactEmail={displayContactInfo[2]}
            fromNotifications={fromNotifications}
          />
      </div>
      <div className="bg-white rounded-xl sm:px-4 px-8 py-2">
        <ContactInfo contactInfo={displayContactInfo}/>
      </div>
      <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
        <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800">Who We Are</h2>
        <p className="py-8 sm:text-sm 2xl:text-lg">{displayCompanyDescription}</p>
      </div>
      
      {/* Services and Clients Row */}
      <div className="grid grid-cols-2 gap-x-4">
        <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
          <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800 pb-8">What We Do</h2>
          <HexagonList listData={displayWhatWeDoData} />
        </div>
        <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
          <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800 pb-8">Our Clients</h2>
          <HexagonList listData={displayClientData} />
        </div>
      </div>

      {/* Skills and Strengths Row */}
      <div className="grid grid-cols-2 gap-x-4">
        <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
          <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800 pb-8">Our Skills</h2>
          <HexagonList listData={formattedSkills} />
        </div>
        <div className="bg-white rounded-xl sm:px-6 2xl:px-16 py-2">
          <h2 className="sm:pt-4 2xl:pt-10 sm:text-md 2xl:text-2xl md:text-lg font-semibold text-black-800 pb-8">Our Strengths</h2>
          <HexagonList listData={formattedStrengths} />
        </div>
      </div>
    </div>
  );
};

export default ProfileOutput;
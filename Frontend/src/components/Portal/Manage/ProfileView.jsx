import Profile from "./ProfileOutput";
import { useLocation } from "react-router-dom";

const ProfileView = ({ 
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
  fromNotifications = false,
  skills,
  strengths
}) => {

  const location = useLocation();

  return (
    <Profile 
      personalProfile={personalProfile}
      connectionId={connectionId}
      businessId={businessId}
      companyName={companyName}
      companyDescription={companyDescription}
      whatwedoData={whatwedoData}
      clientData={clientData}
      contactInfo={contactInfo}
      connectionNum={connectionNum}
      companyCategory={companyCategory}
      fromNotifications={fromNotifications}
      skills={skills}
      strengths={strengths}
    />
  );
};

export default ProfileView;
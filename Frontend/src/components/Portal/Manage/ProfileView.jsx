import Profile from "./ProfileOutput";
import { useLocation } from "react-router-dom";

const ProfileView = () => {

  const location = useLocation();

  return (
    <Profile 
      personalProfile={false} 
      connectionId={location.state?.connectionId}
      businessId={location.state?.businessId}
      companyName={location.state?.companyName} 
      companyDescription={location.state?.companyDescription} 
      whatwedoData={location.state?.whatwedoData}
      clientData={location.state?.clientData}
      contactInfo={location.state?.contactInfo} 
      connectionNum={location.state?.connectionNum}
      companyCategory={location.state?.companyCategory}
    />
  );
};

export default ProfileView;
import Profile from "./ProfileOutput";
import { useLocation } from "react-router-dom";

const ProfileView = () => {

  const location = useLocation();

  return (
    <Profile 
      personalProfile={false} 
      companyName={location.state?.companyName} 
      companyDescription={location.state?.companyDescription} 
      whatwedoData={location.state?.whatwedoData}
      clientData={location.state?.clientData}
      contactInfo={location.state?.contactInfo} 
      connectionNum={location.state?.connectionNum}
    />
  );
};

export default ProfileView;
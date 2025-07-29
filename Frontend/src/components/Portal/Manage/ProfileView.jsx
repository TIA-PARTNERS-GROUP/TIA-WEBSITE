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
      contactInfo={location.state?.contactInfo} 
    />
  );
};

export default ProfileView;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "../../../assets/images/manage-profile-placeholder.jpg";
import PrimaryButton from "../../Button/PrimaryButton";
import EditIcon from "../../Icons/EditIcon";
import ProfileIcon from "../../Icons/ProfileIcon";
import BuildTeamIcon from "../../Icons/TeamBuildingIcon";

const defaultCompanyName = "DyCom Group";
const connectionNum = 8;

const ProfileHeader = ({ personalProfile = true, companyName = defaultCompanyName }) => {

  const navigate = useNavigate();

  const [connectionStatus, setConnectionStatus] = useState(false);

  const handleConnectSwitch = () => {
    setConnectionStatus(!connectionStatus);
  }
  
  return (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <img
      src={Banner}
      alt="Profile Banner"
      className="w-full h-[350px] object-cover object-[0%_20%]"
    />
    <div className="relative flex gap-16 pl-10">
      <div className="">
        <ProfileIcon className="relative -top-24 left-1/2 -translate-x-1/2 w-48 h-48 @md:w-14 @md:h-14 text-black mt-0.5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-10 pt-10">
          <h2 className="text-4xl @md:text-3xl font-semibold text-black-800">{companyName}</h2>
          {!personalProfile && (
            <PrimaryButton className={`text-xs ${connectionStatus ? "bg-rose-500 hover:bg-rose-600" : "bg-blue-600"}`}  onClick={() => handleConnectSwitch()}> {connectionStatus ? "Disconnect" : "Connect"}</PrimaryButton>
          )}
        </div>
        <div className="flex gap-2 pt-5">
          <BuildTeamIcon className="text-rose-500 w-6 h-6 @md:w-8 @md:h-8" />
          <p className="text-lg text-rose-500">{connectionNum} connections</p>
        </div>
      </div>
      {personalProfile 
        ? <button className="flex pt-10" onClick={() => {window.scrollTo(0, 0); navigate("/manage/profile/edit"); }}>
            <EditIcon className="w-8 h-8"/>
            <p className="px-2 py-1 text-lg font-semibold">Edit Profile</p>
          </button>
        : <></>}
      
    </div>
  </div>
)
}

export default ProfileHeader;
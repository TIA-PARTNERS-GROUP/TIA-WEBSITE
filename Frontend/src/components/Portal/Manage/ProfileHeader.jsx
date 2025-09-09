import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "../../../assets/images/manage-profile-placeholder.jpg";
import PrimaryButton from "../../Button/PrimaryButton";
import EditIcon from "../../Icons/EditIcon";
import ProfileIcon from "../../Icons/ProfileIcon";
import BuildTeamIcon from "../../Icons/TeamBuildingIcon";
import { addConnection, getCurrentBusinessInfo, removeConnection } from "../../../api/business";
import { m } from "framer-motion";

const defaultCompanyName = "DyCom Group";

const ProfileHeader = ({ personalProfile = true, connected = false, companyName = defaultCompanyName, connectionNum = 0, connectionId, businessId}) => {

  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState(connected ?? false);
  const [localConnectionId, setConnectionId] = useState(connectionId ?? null);

  const handleConnectSwitch = async () => {
    try {
      if (connectionStatus) {
        const res = await removeConnection(localConnectionId)
      }
      else {
        const res = await getCurrentBusinessInfo();
        const personalId = res.data.id;
        const pConnection = await addConnection(personalId, businessId);
        setConnectionId(pConnection.connectionId);
      };
      setConnectionStatus(!connectionStatus);
    } catch (error) {
      console.error(`Connection operation ${connectionStatus ? 'remove' : 'add'} failed:`, error);
    }
  }
  
  return (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <img
      src={Banner}
      alt="Profile Banner"
      className="w-full sm:h-[100px] md:h-[150px] lg:h-[200px] xl:h-[250px] 2xl:h-[350px] object-cover object-[0%_20%]"
    />
    <div className="relative flex sm:gap-2 2xl:gap-16 pl-10">
      <div className="">
        <ProfileIcon className="relative sm:-top-11 md:-top-14 lg:-top-16 2xl:-top-24 sm:left-1/4 2xl:left-1/2 -translate-x-1/2 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 2xl:w-48 2xl:h-48 @md:w-14 @md:h-14 text-black mt-0.5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-10 sm:pt-2 2xl:pt-10">
          <h2 className="sm:text-xl xl:text-3xl 2xl:text-4xl lg:text-2xl font-semibold text-black-800">{companyName}</h2>
          {!personalProfile && (
            <PrimaryButton className={`text-xs ${connectionStatus ? "bg-rose-500 hover:bg-rose-600" : "bg-blue-600"}`}  onClick={() => handleConnectSwitch()}> {connectionStatus ? "Disconnect" : "Connect"}</PrimaryButton>
          )}
        </div>
        <div className="flex gap-2 pt-5">
          <BuildTeamIcon className="text-rose-500 sm:w-4 sm:h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 @md:w-8 @md:h-8" />
          <p className="sm:text-xs lg:text-sm 2xl:text-lg text-rose-500">{connectionNum} connections</p>
        </div>
      </div>
      {personalProfile 
        ? <button className="flex sm:pl-2 sm:pt-2 2xl:pt-10" onClick={() => {window.scrollTo(0, 0); navigate("/manage/profile/edit"); }}>
            <EditIcon className="sm:translate-y-2 sm:w-3 sm:h-3 2xl:w-5 2xl:h-5"/>
            <p className="px-2 py-1 sm:text-xs 2xl:text-lg font-semibold">Edit Profile</p>
          </button>
        : <></>}
      
    </div>
  </div>
)
}

export default ProfileHeader;
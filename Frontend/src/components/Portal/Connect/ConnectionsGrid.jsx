import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentBusinessInfo, addConnection, removeConnection, getOtherBusinessInfo } from "../../../api/business";

import Banner from "../../../assets/images/manage-profile-placeholder.jpg";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import ProfileIcon from "../../Icons/ProfileIcon";

const ConnectionsGrid = ({ connectionsData, connectionModule }) => {

    const navigate = useNavigate();

    useEffect(() => {
        setFinalConnectionsData(connectionsData || []);
    }, [connectionsData]);

    const [finalConnectionsData, setFinalConnectionsData] = useState(connectionsData);

    const handleConnectSwitch = async (index) => {
        if (connectionModule) {
            try {
                // API Call
                console.log(finalConnectionsData[index].connectionId)
                const res = await removeConnection(finalConnectionsData[index].connectionId);

                // Remove connection from finalConnectionsData
                setFinalConnectionsData(prev => 
                    prev.filter((_, i) => i !== index)
                );
            } catch (error) {
                console.error('Failed to remove connection:', error);
            }
            
        } else {
            try {
                if (finalConnectionsData[index].connectionId) {
                    await removeConnection(finalConnectionsData[index].connectionId);
                    setFinalConnectionsData(prev => prev.map((item, i) => 
                        i === index 
                            ? { ...item, connectionId: null }
                            : item
                    ));
                }
                else {
                    const res = await getCurrentBusinessInfo();
                    const personalId = res.data.id;
                    const pConnection = await addConnection(personalId, finalConnectionsData[index].businessId);
                    setFinalConnectionsData(prev => prev.map((item, i) => 
                        i === index 
                            ? { ...item, connectionId: pConnection.data.connectionId}
                            : item
                    ));
                };
            } catch (error) {
                console.error(`Connection operation ${finalConnectionsData[index].connectionId ? 'remove' : 'add'} failed:`, error);
            }
        }
    }

    const handleViewProfile = async (connectionId, businessId) => {
        const businessRes = await getOtherBusinessInfo(businessId);
        window.scrollTo(0, 0);
        navigate(`/manage/connections/profile-view`, {
            state: { 
            connectionId: connectionId,
            businessId: businessId,
            companyName: businessRes.data.businessName, 
            contactInfo: [businessRes.data.contactName, businessRes.data.contactPhone, businessRes.data.contactEmail],
            companyDescription: businessRes.data.businessDescription,
            whatwedoData: businessRes.data.services || [],
            clientData: businessRes.data.clients || [],
            connectionNum: businessRes.data.connections.length || 0,
            companyCategory: businessRes.data.businessCategory
            },
        })
    }

    function formatString(str) {
    if (!str) {return null};
    return str
        .split('-') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' '); 
  }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full mx-auto">
            {finalConnectionsData.map((company, index) => (
                <div key={`connection-${index}`} className="flex flex-col items-center">
                    <div className="bg-gray-200 sm:w-[400px] md:w-[270px] lg:w-[375px] xl:w-[315px] 2xl:w-[400px] h-full rounded-lg shadow-xl">
                        <img
                            src={Banner}
                            alt="Profile Banner"
                            className="w-full h-[100px] object-cover object-[0%_20%] rounded-t-lg"
                        />
                        <div className="relative -top-14 flex flex-col items-center">
                            <ProfileIcon className="w-24 h-24 @md:w-14 @md:h-14 text-black mt-0.5" />
                            <h2 className="text-center text-lg font-medium text-blue-600">{company.title}</h2>
                            <p className="text-center text-xs font-semibold px-6 pt-2 pb-2">{formatString(company.category)}</p>
                            <p className="text-center text-xs font-normal px-6 pt-4 pb-8">{company.description}</p>
                            <div className="flex flex-col items-center gap-y-2 mb-4">
                                <PrimaryButton 
                                    className={`text-xs ${company.connectionId ? "bg-rose-500 hover:bg-rose-600" : "bg-blue-600"}`} 
                                    onClick={() => handleConnectSwitch(index)}
                                >
                                    {company.connectionId ? "Disconnect" : "Connect"}
                                </PrimaryButton>
                                <SecondaryButton 
                                    className="text-xs bg-white"
                                    onClick={() => {handleViewProfile(company.connectionId, company.businessId)}}>
                                    View Profile
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ConnectionsGrid;
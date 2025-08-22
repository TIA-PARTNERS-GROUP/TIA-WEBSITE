import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import Banner from "../../../assets/images/manage-profile-placeholder.jpg";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import ProfileIcon from "../../Icons/ProfileIcon";

const ConnectionsGrid = ({ queryValue = null, connectionsData, connectionModule }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const filteredData = queryValue
        ? connectionsData.filter(connection => 
            connection.title.toLowerCase().includes(queryValue.toLowerCase())
          )
        : connectionsData;

    useEffect(() => {
        const urlSearchTerm = searchParams.get('q') || '';
        
        // Filter based on URL search term
        const filtered = connectionsData.filter(connection => 
            connection.title.toLowerCase().includes(urlSearchTerm.toLowerCase())
        );
        
        setFinalConnectionsData(filtered);
        
    }, [location.search, connectionsData]);

    const [finalConnectionsData, setFinalConnectionsData] = useState(filteredData);
    const [connectionStatus, setConnectionStatus] = useState(connectionsData.reduce((acc, _, index) => ({ ...acc, [index]: connectionModule || false }), {}));

    const handleConnectSwitch = (index) => {
        if (connectionModule) {
            // Remove connection from finalConnectionsData
            setFinalConnectionsData(prev => 
                prev.filter((_, i) => i !== index)
            );
            
            
        } else {
            setConnectionStatus(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
        }
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
                            <p className="text-center text-xs font-normal px-6 pt-4 pb-8">{company.description}</p>
                            <div className="flex flex-col items-center gap-y-2 mb-4">
                                <PrimaryButton 
                                    className={`text-xs ${connectionStatus[index] ? "bg-rose-500 hover:bg-rose-600" : "bg-blue-600"}`} 
                                    onClick={() => handleConnectSwitch(index)}
                                >
                                    {connectionStatus[index] ? "Disconnect" : "Connect"}
                                </PrimaryButton>
                                <SecondaryButton 
                                    className="text-xs bg-white"
                                    onClick={() => {
                                        navigate(`/manage/connections/profile-view`, {
                                        state: { 
                                        companyName: company.title,
                                        contactInfo: company.contactInfo,
                                        companyDescription: company.description,
                                        whatwedoData: company.whatwedoData,
                                        },
                                    })}}>
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
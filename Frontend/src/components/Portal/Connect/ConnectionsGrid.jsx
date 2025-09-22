import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentBusinessInfo, removeConnection, getOtherBusinessInfo } from "../../../api/business";
import { addNotification, getCurrentUserPendingConnections } from "../../../api/notification";

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
    const [showConnectionPopup, setShowConnectionPopup] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [currentBusiness, setCurrentBusiness] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingBusinessIds, setPendingBusinessIds] = useState([]);
    const [emailTemplate, setEmailTemplate] = useState('');

    useEffect(() => {
        const fetchCurrentBusiness = async () => {
            try {
                const res = await getCurrentBusinessInfo();
                setCurrentBusiness(res.data);
                
                const pendingRes = await getCurrentUserPendingConnections();

                const ids = pendingRes.data.pendingConnections.map(pc => pc.receiver_business_id);
                setPendingBusinessIds(ids);
            } catch (error) {
                console.error('Failed to fetch current business info:', error);
            }
        };
        fetchCurrentBusiness();
    }, []);

    const handleConnectClick = (business) => {
        setSelectedBusiness(business);

        const template = `Hi ${business.contactName},\n\nMy business, ${currentBusiness.businessName}, would like to connect with your business, ${business.title}. Looking forward to collaborating!\n\nBest regards,\n${currentBusiness.contactName || ''}`;
        
        setEmailTemplate(template);
        setShowConnectionPopup(true);
    };

    const handleCancelConnection = () => {
        setShowConnectionPopup(false);
        setSelectedBusiness(null);
    };

    const handleRequestConnection = async () => {
        if (!selectedBusiness || !currentBusiness) return;

        setIsLoading(true);
        try {
            // Get the receiving business's user ID (operator)
            const receivingBusinessUserId = selectedBusiness.businessId;

            // Send notification instead of directly connecting
            const message = "connect";
            
            await addNotification(receivingBusinessUserId, message);
            
            // Update UI to show pending status
            setPendingBusinessIds(prev => [...prev, selectedBusiness.businessId]);
            setFinalConnectionsData(prev => prev.map(item => 
                item.businessId === selectedBusiness.businessId 
                    ? { ...item, status: 'pending' }
                    : item
            ));
            
            setShowConnectionPopup(false);
            setSelectedBusiness(null);
            
        } catch (error) {
            console.error('Failed to send connection request:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
                    handleConnectClick(finalConnectionsData[index]);
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
        <>
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
                                    className={`text-xs ${
                                        company.connectionId 
                                            ? "bg-rose-500 hover:bg-rose-600" 
                                            : pendingBusinessIds.includes(company.businessId)
                                                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" 
                                                : "bg-blue-600 hover:bg-blue-700"
                                    }`} 
                                    onClick={() => {
                                        if (!pendingBusinessIds.includes(company.businessId)) {
                                            handleConnectSwitch(index);
                                        }
                                    }}
                                    disabled={pendingBusinessIds.includes(company.businessId)}
                                >
                                    {company.connectionId 
                                        ? "Disconnect" 
                                        : pendingBusinessIds.includes(company.businessId) 
                                            ? "Pending..." 
                                            : "Connect"}
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

        {/* Connection Request Popup */}
            {showConnectionPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-600 max-w-2xl mx-auto min-h-[400px]">
                        <h3 className="text-lg font-semibold mb-4">Request Connection</h3>
                        <div className="flex gap-x-10">
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">From:</p>
                                <p className="font-medium">{currentBusiness?.businessName}</p>
                            </div>
                            
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-2">To:</p>
                                <p className="font-medium">{selectedBusiness?.title}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">Email Template:</p>
                        <p className="w-full border-t border-l border-r border-gray-400 rounded-t-lg p-1 text-sm resize-none">To: ({selectedBusiness?.contactEmail})</p>
                        <textarea
                            className="w-full border border-gray-400 rounded-b-lg p-2 text-sm resize-none"
                            rows={7}
                            value={emailTemplate}
                            onChange={(e) => setEmailTemplate(e.target.value)}
                        />
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            A connection request will be sent. The business will need to accept your request before you are connected.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <SecondaryButton 
                                onClick={handleCancelConnection}
                                disabled={isLoading}
                                className="px-4 py-2"
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton 
                                onClick={handleRequestConnection}
                                disabled={isLoading}
                                className="px-4 py-2"
                            >
                                {isLoading ? "Sending..." : "Request Connection"}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConnectionsGrid;
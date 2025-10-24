import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCurrentBusinessInfo, removeConnection, getOtherBusinessInfo } from "../../../api/business";
import { addNotification, getCurrentUserPendingConnections } from "../../../api/notification";

import ProfileView from "../Manage/ProfileView";
import ConnectionPopup from "./ConnectionPopup";
import Banner from "../../../assets/images/manage-profile-placeholder.jpg";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import ProfileIcon from "../../Icons/ProfileIcon";
import CloseIcon from "../../Icons/CloseIcon";
import business from "../../../../../Backend/models/business";

const ConnectionsGrid = ({ connectionsData, connectionModule, searchType, recommendations = [] }) => {

    const { partnerType } = useParams();
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const handleCloseProfile = () => {
        setShowProfilePopup(false);
        setProfileData(null);
        fetchPendingConnections();
    }

    const fetchPendingConnections = async () => {
        try {
            const pendingRes = await getCurrentUserPendingConnections();
            const ids = pendingRes.data.pendingConnections.map(pc => pc.receiver_business_id);
            setPendingBusinessIds(ids);
        } catch (error) {
            console.error('Failed to fetch pending connections:', error);
        }
    };

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
                await fetchPendingConnections();
            } catch (error) {
                console.error('Failed to fetch current business info:', error);
            }
        };
        fetchCurrentBusiness();
    }, []);

    // Function to get partner type name from ID
    const getPartnerTypeName = (typeId) => {
        const partnerTypes = {
            1: "Alliance Partner",
            2: "Complementary Partner",
            3: "Mastermind Partner"
        };
        return partnerTypes[typeId] || "Connected Partner";
    };

    // Function to get recommendation reason for a business
    const getRecommendationReason = (businessId) => {
        if (searchType !== "smartconnect" || !recommendations || recommendations.length === 0) {
            return null;
        }
        
        const recommendation = recommendations.find(rec => 
            rec.recommendation.user.id === businessId
        );
        
        return recommendation ? recommendation.reason : null;
    };

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

            const getPartnerTypeId = (partnerType) => {
                const partnerTypeMap = {
                    'alliance': 1,
                    'complementary': 2,
                    'mastermind': 3
                };
                
                return partnerTypeMap[partnerType] || 2; // returns null if partnerType not found
            };

            const partnerId = getPartnerTypeId(partnerType);

            // Send notification instead of directly connecting
            const message = `connect-${partnerId}`;
            
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
        
        // Set profile data and show popup instead of navigating
        setProfileData({
            personalProfile: false,
            connectionId: connectionId,
            businessId: businessId,
            companyName: businessRes.data.businessName, 
            contactInfo: [businessRes.data.contactName, businessRes.data.contactPhone, businessRes.data.contactEmail],
            companyDescription: businessRes.data.businessDescription,
            whatwedoData: businessRes.data.services || [],
            clientData: businessRes.data.clients || [],
            connectionNum: businessRes.data.connections.length || 0,
            companyCategory: businessRes.data.businessCategory,
            skills: businessRes.data.skills || [],
            strengths: businessRes.data.strengths || []
        });
        setShowProfilePopup(true);
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
            {finalConnectionsData.map((company, index) => {
                const recommendationReason = getRecommendationReason(company.businessId);
                
                return (
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
                            
                            {/* Display connection type only when connectionModule is true */}
                            {connectionModule && company.connectionTypeId && (
                                <div className="text-center mb-2">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {getPartnerTypeName(company.connectionTypeId)}
                                    </span>
                                </div>
                            )}
                            
                            {/* Display recommendation reason when searchType is smartconnect */}
                            {searchType === "smartconnect" && recommendationReason && (
                                <div className="text-center mb-2 px-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <p className="text-green-800 text-xs font-medium mb-1">🤝 Recommended because:</p>
                                        <p className="text-green-700 text-xs">{recommendationReason}</p>
                                    </div>
                                </div>
                            )}
                            
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
                );
            })}
        </div>

        {/* Profile Popup */}
            {showProfilePopup && profileData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-gray-100 rounded-xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
                        {/* Header with close button */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">{profileData.companyName}'s Profile</h2>
                            <button 
                                onClick={handleCloseProfile}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Profile content */}
                        <div className="flex-1 overflow-auto">
                            <ProfileView 
                                personalProfile={false} 
                                connectionId={profileData.connectionId}
                                businessId={profileData.businessId}
                                companyName={profileData.companyName} 
                                companyDescription={profileData.companyDescription} 
                                whatwedoData={profileData.whatwedoData}
                                clientData={profileData.clientData}
                                contactInfo={profileData.contactInfo} 
                                connectionNum={profileData.connectionNum}
                                companyCategory={profileData.companyCategory}
                                skills={profileData.skills}
                                strengths={profileData.strengths}
                            />
                        </div>
                    </div>
                </div>
            )}

        {showConnectionPopup && (
            <ConnectionPopup
                currentBusiness={currentBusiness}
                selectedBusiness={selectedBusiness}
                emailTemplate={emailTemplate}
                setEmailTemplate={setEmailTemplate}
                isLoading={isLoading}
                onCancel={handleCancelConnection}
                onRequest={handleRequestConnection}
            />
        )}
        </>
    )
}

export default ConnectionsGrid;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../utils/LoadingContext.jsx';
import { addNotification, getCurrentUserNotifications, removeNotification, setNotificationOpened } from '../../../api/notification.js';
import PrimaryButton from '../../Button/PrimaryButton.jsx';
import SecondaryButton from "../../Button/SecondaryButton";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import MessageIcon from "../../Icons/MessageIcon";
import ProfileView from '../Manage/ProfileView.jsx';
import CloseIcon from '../../Icons/CloseIcon.jsx';
import axios from '../../../api/axios.js';
import { addConnection, getOtherBusinessInfo } from '../../../api/business.js';
import { closeProject, getProjectDetails, removeApplicant } from '../../../api/projects.js';


const PortalHeader = ( {module, mock = false} ) => {
  
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({});

  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [pendingDeclineNotification, setPendingDeclineNotification] = useState(null);
  const [declineReason, setDeclineReason] = useState('');

  const declineReasons = [
    { value: '', label: 'Select a reason...' },
    { value: 'too-many-connections', label: 'Too many connections' },
    { value: 'not-good-match', label: 'Not a good match for my business' },
    { value: 'different-industry', label: 'Different industry focus' },
    { value: 'not-interested', label: 'Not interested at this time' },
    { value: 'other', label: 'Other' }
  ];

  const applicantDeclineReasons = [
    { value: '', label: 'Select a reason...' },
    { value: 'not-fit-role', label: 'Not a fit for the project role' },
    { value: 'insufficient-skills', label: 'Insufficient skills or experience' },
    { value: 'found-other', label: 'Found another applicant' },
    { value: 'project-cancelled', label: 'Project has been cancelled' },
    { value: 'timing-issue', label: 'Timing doesn\'t work' },
    { value: 'other', label: 'Other' }
];

  useEffect(() => {
      const fetchUserNotifications = async () => {
        if (mock) return;
        startLoading();
        
        try {
          const res = await getCurrentUserNotifications();
          if (res.data && res.data.notifications) {
            setNotifications(res.data.notifications);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
          stopLoading();
        }
      };
  
      fetchUserNotifications();
    }, []);
  
  function toggleDropdown() {
    setDropdownOpen(prev => {
    const newState = !prev;

    // If closing dropdown, remove 'accept' notifications
    if (!newState) {
      notifications.forEach(async (notif) => {
        if (notif.message === "accept" || notif.message === "project-accept") {
          try {
            // Call your API to remove it from server
            await removeNotification(notif.id);  // or removeConnection if relevant
          } catch (error) {
            console.error('Error removing notification:', error);
          }
        }
      });

      // Remove locally
      setNotifications(prevNotifications =>
        prevNotifications.filter(n => n.message !== "accept" && n.message !== "project-accept")
      );
    }

    return newState;
  });
  }

  function handleNotificationClick(link, description) {
    setDropdownOpen(false);
    const updatedNotificationData = notificationData.filter(notification => notification.description !== description);
    setNotificationData(updatedNotificationData);
    navigate(link);
  }

  const handleAcceptConnection = async (notificationId, senderId, receiverId, senderBusinessName, notificationMessage) => {
    if (notificationMessage.startsWith("connect")) {
      try {
        console.log(`Accepting connection from ${senderBusinessName}, notification ID: ${notificationId}`);

        let connectionTypeId = 2; // Default to 2 (complementary) if no type specified
            
            if (notificationMessage.includes('-')) {
                const typeIdMatch = notificationMessage.match(/connect-(\d+)/);
                if (typeIdMatch && typeIdMatch[1]) {
                    connectionTypeId = parseInt(typeIdMatch[1]);
                }
            }

        const message = "accept";
        console.log(senderId, receiverId);
        await addConnection(senderId, receiverId, connectionTypeId);
        await removeNotification(notificationId);
        await addNotification(senderId, message);
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      } catch (error) {
        console.error('Error accepting connection:', error);
      }
    } else if (notificationMessage.startsWith("applicant")) {
      try {
        console.log(`Accepting applicant ${senderBusinessName} for project, notification ID: ${notificationId}`);
        
        const projectMatch = notificationMessage.match(/applicant-project\((\d+)\)/);
        const projectId = projectMatch ? projectMatch[1] : null;
            
        if (projectId) {
            await closeProject(projectId);
        }
        
        const message = "project-accept";
        await removeNotification(notificationId);
        await addNotification(senderId, message);
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      } catch (error) {
          console.error('Error accepting applicant:', error);
      }
    }

  };

  const handleDeclineConnection = async (notificationId, notificationMessage) => {

    const notification = notifications.find(n => n.id === notificationId);

    if (!declineReason) {
      alert("Please select a reason for declining");
      return;
    }

    try {
      if (pendingDeclineNotification?.type?.startsWith("applicant")) {
        const projectMatch = notificationMessage.match(/applicant-project\((\d+)\)/);
        const projectId = projectMatch ? projectMatch[1] : null;
        const applicantUserId = notification.sender_user_id;
        
        if (projectId && applicantUserId) {
            await removeApplicant(projectId, applicantUserId);
        }
      }
      await removeNotification(notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      setShowDeclineConfirm(false);
      setPendingDeclineNotification(null);
      setDeclineReason('');
    } catch (error) {
      console.error('Error declining connection:', error);
    }
  };

  const handleDeclineClick = (notificationId, senderId, receiverId) => {
    const notification = notifications.find(n => n.id === notificationId);
    setPendingDeclineNotification({
      id: notificationId,
      senderId,
      receiverId,
      type: notification.message
    });
    setShowDeclineConfirm(true);
  };

  const handleCancelDecline = () => {
    setShowDeclineConfirm(false);
    setPendingDeclineNotification(null);
    setDeclineReason('');
  };

  const handleNotificationAction = (notificationId, senderId, receiverId, action) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      if (action === 'accept') {
        handleAcceptConnection(notificationId, senderId, receiverId, notification.sender_business_name || notification.sender_name, notification.message);
      } else {
        handleDeclineClick(notificationId, senderId, receiverId);
      }
    }
  };

  useEffect(() => {
    const fetchProjectTitles = async () => {
      const projectNotifications = notifications.filter(n => n.message.startsWith("applicant"));
      
      for (const notification of projectNotifications) {
        const projectMatch = notification.message.match(/applicant-project\((\d+)\)/);
        const projectId = projectMatch ? projectMatch[1] : null;
        
        if (projectId && !notificationDetails[projectId]) {
          try {
            const projectRes = await getProjectDetails(projectId);
            const projectTitle = projectRes.data.project?.name || `Project #${projectId}`;
            
            setNotificationDetails(prev => ({
              ...prev,
              [projectId]: projectTitle
            }));
          } catch (error) {
            console.error('Error fetching project details:', error);
            setNotificationDetails(prev => ({
              ...prev,
              [projectId]: `Project #${projectId}`
            }));
          }
        }
      }
    };

    if (notifications.length > 0) {
      fetchProjectTitles();
    }
  }, [notifications]);

  const getNotificationDisplayText = (notification) => {
    const senderName = notification.sender_business_name || notification.sender_name || "Someone";

    if (notification.message.startsWith("applicant")) {
      const projectMatch = notification.message.match(/applicant-project\((\d+)\)/);
      const projectId = projectMatch ? projectMatch[1] : null;
      
      const projectTitle = projectId ? notificationDetails[projectId] || `Project #${projectId}` : "your project";
      
      return `${senderName} has applied to your project "${projectTitle}"`;
    }
    
    switch (notification.message) {
      case "connect":
        return `${senderName} wants to connect with you`;
      case "accept":
        return `${senderName} accepted your connection request!`;
      case "project-accept":
        return `${senderName} accepted your project application!`;
      default:
        return notification.message || "New notification";
    }
  };


  async function logOut() {
    const res = await axios.post('/auth/logout');
    if (res.status == 200) {
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  const handleCloseProfile = async () => {
    const res = await getCurrentUserNotifications();
    if (res.data && res.data.notifications) {
      setNotifications(res.data.notifications);
    }
    
    setShowProfilePopup(false);
    setProfileData(null);
  };

  const handleViewProfile = async (businessId, notificationId, notificationOpened) => {
    try {

      if (!notificationOpened) {await setNotificationOpened(notificationId)}

      const businessRes = await getOtherBusinessInfo(businessId);
      const businessData = businessRes.data;
      
      setProfileData({
        companyName: businessData.businessName,
        contactInfo: [businessData.contactName, businessData.contactPhone, businessData.contactEmail],
        companyDescription: businessData.businessDescription,
        whatwedoData: businessData.services || [],
        clientData: businessData.clients || [],
        connectionNum: businessData.connections?.length || 0,
        companyCategory: businessData.businessCategory,
        fromNotifications: true
      });
      setShowProfilePopup(true);
    } catch (error) {
      console.error('Failed to fetch business profile:', error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-start text-left">
      <div className="flex items-center justify-between w-full">
        <h1 className="sm:text-xl 2xl:text-3xl md:text-2xl font-bold text-black-800">{module}</h1>
        <div className="flex gap-x-2">
          <div className="relative">
            <button 
              className="relative sm:translate-y-0.5 md:translate-y-2 translate-y-2.5 translate-x-1 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Notifications"
              aria-expanded={dropdownOpen}
              onClick={toggleDropdown}
            >
              <NotificationIcon className="w-7 h-7 @md:w-7 @md:h-7 text-white" />
              {notifications.length > 0 && (
                <div className="absolute top-5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full text-[0.6rem] text-white flex items-center justify-center">
                  <span className="relative -top-0.5">{notifications.length}</span>
                </div>
              )}
            </button>
            
            {dropdownOpen && (
              <div 
                id="dropdown" 
                className="absolute z-50 right-0 origin-top-right mt-2 bg-white rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto"
              >
                <div className="py-2">
                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                    Notifications ({notifications.length})
                  </h3>
                  
                  {notifications.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-500">No new notifications</p>
                  ) : (
                    <ul className="text-sm text-gray-700">
                      {notifications.map((notification) => (  
                        <li key={notification.id} className="border-b last:border-b-0">
                          <div className="px-4 py-3">
                            <p className="font-medium text-gray-900 mb-2">
                              {getNotificationDisplayText(notification)}
                            </p>

                            {(notification.message.startsWith("connect") || notification.message.startsWith("applicant")) && (
                              <div className="flex gap-2">
                                <PrimaryButton
                                  onClick={() => handleNotificationAction(notification.id, notification.sender_business_id, notification.receiver_business_id, 'accept')}
                                  className="text-xs px-3 py-1.5 flex-1"
                                >
                                  Accept
                                </PrimaryButton>
                                <SecondaryButton
                                  onClick={() => handleNotificationAction(notification.id, notification.sender_business_id, notification.receiver_business_id, 'decline')}
                                  className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 flex-1"
                                  disabled={!notification.opened}
                                >
                                  Decline
                                </SecondaryButton>
                              </div>
                            )}

                            {(notification.message.startsWith("connect") || notification.message.startsWith("applicant")) && (
                              <div className="mt-2">
                                <SecondaryButton
                                  onClick={() => handleViewProfile(notification.sender_business_id, notification.id, notification.opened)}
                                  className="text-xs px-3 py-1.5 w-full"
                                >
                                  View Profile
                                </SecondaryButton>
                              </div>
                            )}

                            {notification.time_sent && (
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(notification.time_sent).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="p-1 pl-1 pr-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Messages"
            onClick={(() => navigate("/chat-llm/alliance"))}
          >
            <MessageIcon className="w-5 h-5 @md:w-5 @md:h-5 text-white" />
          </button>
          
          <SecondaryButton
            onClick={logOut}
            className="sm:text-xs md:text-sm sm:-translate-y-1 sm:p-2 md:p-3 block text-center py-2.5 mt-2 w-full"
          >
            Log out
          </SecondaryButton>
        </div>
      </div>

      {/* Decline Confirmation */}
      {showDeclineConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCancelDecline}
          ></div>
          
          <div className="relative bg-white rounded-lg shadow-lg w-80 max-w-sm mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure you wish to decline?
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for declining:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {(pendingDeclineNotification?.type.startsWith("applicant") ? applicantDeclineReasons : declineReasons).map((reason) => (
                    <option key={reason.value} value={reason.value}>
                        {reason.label}
                    </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-3 justify-end">
              <SecondaryButton
                onClick={handleCancelDecline}
                className="text-sm px-4 py-2"
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={async () => {
                  const selectElement = document.querySelector('select[required]');
                  if (!declineReason) {
                    selectElement.reportValidity();
                    return;
                  }
                  handleDeclineConnection(pendingDeclineNotification.id, pendingDeclineNotification.type);
                }}
                className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700"
              >
                Decline
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

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
                companyName={profileData.companyName} 
                companyDescription={profileData.companyDescription} 
                whatwedoData={profileData.whatwedoData}
                clientData={profileData.clientData}
                contactInfo={profileData.contactInfo} 
                connectionNum={profileData.connectionNum}
                companyCategory={profileData.companyCategory}
                fromNotifications={profileData.fromNotifications}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default PortalHeader;
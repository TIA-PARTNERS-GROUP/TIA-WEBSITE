import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../utils/LoadingContext.jsx';
import { addNotification, getCurrentUserNotifications, removeNotification } from '../../../api/notification.js';
import PrimaryButton from '../../Button/PrimaryButton.jsx';
import SecondaryButton from "../../Button/SecondaryButton";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import MessageIcon from "../../Icons/MessageIcon";
import axios from '../../../api/axios.js';
import { addConnection } from '../../../api/business.js';


const PortalHeader = ( {module} ) => {
  
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const [notificationClicked, setNotificationClicked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
      const fetchUserNotifications = async () => {
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
        if (notif.message === "accept") {
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
        prevNotifications.filter(n => n.message !== "accept")
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

  const handleAcceptConnection = async (notificationId, senderId, receiverId, senderBusinessName) => {
    try {
      console.log(`Accepting connection from ${senderBusinessName}, notification ID: ${notificationId}`);
      const message = "accept";
      console.log(senderId, receiverId);
      await addConnection(senderId, receiverId);
      await removeNotification(notificationId);
      await addNotification(senderId, message);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (error) {
      console.error('Error accepting connection:', error);
    }
  };

  const handleDeclineConnection = async (notificationId) => {
    try {
      await removeNotification(notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (error) {
      console.error('Error declining connection:', error);
    }
  };

  const handleNotificationAction = (notificationId, senderId, receiverId, action) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      if (action === 'accept') {
        handleAcceptConnection(notificationId, senderId, receiverId, notification.sender_business_name || notification.sender_name);
      } else {
        handleDeclineConnection(notificationId);
      }
    }
  };

  const getNotificationDisplayText = (notification) => {
    const senderName = notification.sender_business_name || notification.sender_name || "Someone";

    switch (notification.message) {
      case "connect":
        return `${senderName} wants to connect with you`;
      case "accept":
        return `${senderName} accepted your connection request!`;
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

                            {notification.message === "connect" && (
                              <div className="flex gap-2">
                                <PrimaryButton
                                  onClick={() => handleNotificationAction(notification.id, notification.sender_business_id, notification.receiver_business_id, 'accept')}
                                  className="text-xs px-3 py-1.5 flex-1"
                                >
                                  Accept
                                </PrimaryButton>
                                <SecondaryButton
                                  onClick={() => handleNotificationAction(notification.id, 'decline')}
                                  className="text-xs px-3 py-1.5 flex-1"
                                >
                                  Decline
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
    </div>
  )
}

export default PortalHeader;
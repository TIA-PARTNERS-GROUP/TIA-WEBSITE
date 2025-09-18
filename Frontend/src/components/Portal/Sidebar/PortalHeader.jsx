import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryButton from "../../Button/SecondaryButton";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import MessageIcon from "../../Icons/MessageIcon";
import axios from '../../../api/axios.js';


const PortalHeader = ( {module} ) => {
  
  const navigate = useNavigate();

  const [notificationData, setNotificationData] = useState([
    {description: "QUT has requested to connect with you", link: "/manage/connections"},
    {description: "Apple has requested to connect with you", link: "/manage/connections"}
  ]);

  const [notificationClicked, setNotificationClicked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
    if (!notificationClicked) {
      setNotificationClicked(true);
    }
    if (notificationData.length == 0) {
      setNotificationData([{description: "No new notifications"}]);
    }
  }

  function handleNotificationClick(link, description) {
    setDropdownOpen(false);
    const updatedNotificationData = notificationData.filter(notification => notification.description !== description);
    setNotificationData(updatedNotificationData);
    navigate(link);
  }

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
              {((notificationData.length >= 1 && notificationData[0].description !== "No new notifications")) && (
                <div className="absolute top-5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full text-[0.6rem] text-white justify-center items-center">
                  <span className="relative -top-0.5">{notificationData.length}</span>
                </div>
              )}
            </button>
            
            {dropdownOpen && (
              <div 
                id="dropdown" 
                className="absolute z-50 right-0 origin-top-right mt-2 bg-white rounded-lg shadow-lg w-48"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {notificationData.map((notification, index) => (  
                    <li key={index}>
                      <a
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNotificationClick(notification.link, notification.description);
                        }}
                      >
                        {notification.description}
                      </a>
                    </li>
                  ))}
                </ul>
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
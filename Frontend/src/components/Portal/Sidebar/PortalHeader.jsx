import { useState } from 'react';

import SecondaryButton from "../../Button/SecondaryButton";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import MessageIcon from "../../Icons/MessageIcon";

// Update header title based on route title e.g. /dashboard becomes Dashboard
const routeRaw = location.pathname.split('/')[1] || 'home'; // Fetch route name and remove /
const routeFinal = routeRaw.charAt(0).toUpperCase() + routeRaw.slice(1); // Capitalise first letter

const PortalHeader = () => {
  
  // Notifications (placeholder for now)
  const [notificationData, setNotificationData] = useState([
    {description: "QUT has requested to connect with you", link: "/manage/connections"},
    {description: "Apple has requested to connect with you", link: "/manage/connections"}
  ]);

  // Notification clicked flag - set to true when notification clicked to remove red circle
  const [notificationClicked, setNotificationClicked] = useState(false);
  
  // Handles dropdown menu logic
  // Toggles dropdown bar using hidden tag, removes notifications after viewing and toggles notificatioClicked flag
  function toggleDropdown() {
    document.getElementById('dropdown').classList.toggle('hidden');
    if (notificationClicked) {
      setNotificationData([{description: "No new notifications", link: "#"}]);
    }
    setNotificationClicked(!notificationClicked);
  }

  return (
    <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
      <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl @md:text-3xl font-bold text-black-800">{routeFinal}</h1>
          <div className="flex gap-x-2 ">
            <button 
              className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Notifications"
              onClick={() => {
                toggleDropdown();
              }}
              >
              <NotificationIcon className="w-7 h-7 @md:w-7 @md:h-7 text-white" />

                <div 
                id="dropdown" 
                
                className="hidden absolute z-50 right-50 origin-top-right mt-2 bg-white rounded-lg shadow-lg w-48">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      {notificationData.map((notification, index) => (  
                        <button key={index} onClick={() => (window.location.href = notification.link)}>
                          <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{notification.description}</a>
                        </button>
                      ))}
                    </li>
                  </ul>
                </div>
                {((notificationData.length >= 2) && !notificationClicked) 
                  ? <div class="absolute top-5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full text-[0.6rem] text-white"><p className="absolute -top-0.5 left-0.5">{notificationData.length}</p></div> 
                  : <></>
                }
            </button>
            
            <button 
              className="p-1 pl-1 pr-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Notifications"
              >
              <MessageIcon className="w-5 h-5 @md:w-5 @md:h-5 text-white" />
            </button>
          
          <SecondaryButton
              onClick={() => (window.location.href = "/")}
              className="block text-center py-2.5 mt-2 w-full"
              >
              Log out
          </SecondaryButton>
          </div>
      </div>
    </div>
  )
}

export default PortalHeader;
import SecondaryButton from "../../Button/SecondaryButton";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import MessageIcon from "../../Icons/MessageIcon";

// Update header title based on route title e.g. /dashboard becomes Dashboard
const routeRaw = location.pathname.split('/')[1] || 'home'; // Fetch route name and remove /
const routeFinal = routeRaw.charAt(0).toUpperCase() + routeRaw.slice(1); // Capitalise first letter

const PortalHeader = () => (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl @md:text-3xl font-bold text-black-800">{routeFinal}</h1>
        <div className="flex gap-x-2 ">
          <button 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
          onClick={() => document.getElementById('dropdown').classList.toggle('hidden')}
          >
          <NotificationIcon className="w-7 h-7 @md:w-7 @md:h-7 text-white" />

            <div 
            id="dropdown" 
            
            className="hidden absolute z-50 right-50 origin-top-right mt-2 bg-white rounded-lg shadow-lg w-48">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">No new notifications</a>
                </li>
              </ul>
            </div>
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

export default PortalHeader;
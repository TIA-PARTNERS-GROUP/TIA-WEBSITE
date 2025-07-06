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
        <div className="flex gap-x-2">
          <button 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
          >
          <NotificationIcon className="w-7 h-7 @md:w-7 @md:h-7 text-white" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
          >
          <MessageIcon className="w-5 h-5 @md:w-5 @md:h-5 text-white" />
        </button>
        <SecondaryButton
            className="block text-center py-2.5 mt-2 w-full"
            >
            Log out
        </SecondaryButton>
        </div>
    </div>
  </div>
)

export default PortalHeader;
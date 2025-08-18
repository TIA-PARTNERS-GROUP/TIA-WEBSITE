import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "../../../components/Icons/DashboardIcon";
import ConnectIcon from "../../../components/Icons/ConnectIcon";
import BuildIcon from "../../../components/Icons/BuildIcon";
import CollaborateIcon from "../../../components/Icons/CollaborateIcon";
import NetworkIcon from "../../../components/Icons/NetworkIcon";
import TradeIcon from "../../../components/Icons/TradeIcon";
import ManageIcon from "../../../components/Icons/ManegIcon";


// Track sidebar paths, icons and labels for mapping NavItems below
const sidebarItems = [
  {match: "dashboard", path: "/dashboard", icon: <DashboardIcon className="w-4 h-4 @md:w-5 @md:h-5" />, label: "Dashboard" }, 
  {match: "manage", path: "/manage/profile", icon: <ManageIcon className="w-4 h-4 @md:w-5 @md:h-5" />, label: "Manage"}, 
  {match: "connect", path: "/connect/alliance/smartconnect", icon: <ConnectIcon className="w-4 h-4 @md:w-5 @md:h-5" />, label: "Connect"},
  {match: "build", path: "/build", icon: <BuildIcon className="w-4 h-4 @md:w-5 @md:h-5" />, label: "Build"},
  {match: "collaborate", path: "/collaborate", icon: <CollaborateIcon className="w-4 h-4 @md:w-5 @md:h-5" />, label: "Collaborate"},
  {match: "network", path: "/network", icon: <NetworkIcon className="w-4 h-4 @md:w-5 @md:h-5" />, label: "Network"},
  {match: "trade", path: "/trade", icon: <TradeIcon className="w-4 h-4 @md:w-5 @md:h-5" />, label: "Trade"}
];

const routeHierarchy = {
    'dashboard': 1,
    'manage': 2,
    'connect': 3,
    'build': 4,
    'collaborate': 5,
    'network': 6,
    'trade': 7
  };

const Sidebar = ({ initialLoad = false, activePage, setActivePage, setDirection}) => {

  const location = useLocation();
  const splitPath = location.pathname.split('/')[1];

  const handleModuleClick = (path, e) => {
    const prevPath = routeHierarchy[activePage]
    const currentPath = routeHierarchy[path]

    setDirection(currentPath > prevPath ? -1 : 1)
    setActivePage(path);
    window.scrollTo(0, 0);
  }

  const NavItem = ({ path, icon, label, match, isActive }) => (
    <Link to={path} onClick={() => handleModuleClick(match)} className={`font-bold flex items-center p-4 @md:p-2 space-x-2 @md:space-x-3 rounded-md cursor-pointer text-lg @md:text-base ${
      isActive 
        ? "bg-blue-600 text-white" 
        : "text-white-300 hover:bg-gray-700 hover:text-white"
    }`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
  
  return (
    <motion.div
      className="flex flex-col w-56 @md:w-64 p-4 @md:p-6 bg-hero_portal-side_bar text-white h-[calc(100vh-footerHeight)]"
      initial={initialLoad ? { x: "-100%" } : {}}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ minHeight: '100vh' }}
    >
      <div className="flex justify-center items-center mb-8 @md:mb-10">
        <div className="text-2xl @md:text-3xl p-1.5 @md:p-2 font-extrabold text-text-light italic pt-6">
          TIA
        </div>
      </div>
      <nav>
        <ul>
          {sidebarItems.map((item) => (
              <NavItem
                key={item.path}
                path={item.path}
                icon={item.icon} // Use icon from sidebarItems
                label={item.label} // Use label from sidebarItems
                match={item.match}
                isActive={splitPath === item.match} // Update sidebar selection based on route title e.g. Dashboard selected if on /dashboard
              />
          ))}
        </ul>
      </nav>
    </motion.div>
  )
};

export default Sidebar;
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardIcon from "../../../components/Icons/DashboardIcon";
import ConnectIcon from "../../../components/Icons/ConnectIcon";
import BuildIcon from "../../../components/Icons/BuildIcon";
import CollaborateIcon from "../../../components/Icons/CollaborateIcon";
import NetworkIcon from "../../../components/Icons/NetworkIcon";
import TradeIcon from "../../../components/Icons/TradeIcon";
import ManageIcon from "../../../components/Icons/ManegIcon";

// Read ‘Configuration Complete Status’ to control the display of the bottom button
import { loadDashboardConfig } from "../../../utils/dashboardConfig";

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

  const Sidebar = ({ initialLoad = false, activePage, setActivePage, setDirection, setActiveTab}) => {
    const location = useLocation();
    let splitPath = location.pathname.split('/')[1];
  
    // New: Track whether the user has selected the target
    const [selectedGoal, setSelectedGoal] = useState(
      () => localStorage.getItem("tia:selectedGoal")
    );
  
    useEffect(() => {
      const handler = () => {
        setSelectedGoal(localStorage.getItem("tia:selectedGoal"));
      };
      window.addEventListener("tia:selectedGoalChanged", handler);
      return () => window.removeEventListener("tia:selectedGoalChanged", handler);
    }, []);
  
    // original configuration settings (retained)
    const cfg = loadDashboardConfig();
    const showConfigure = true; // To display permanently, set to true; otherwise, check cfg.
  
    const handleModuleClick = (match) => {
      const prevPath = routeHierarchy[activePage];
      const currentPath = routeHierarchy[match];
  
      setDirection(currentPath > prevPath ? "down" : "up");
      setActivePage(match);
      setActiveTab('profile');
      window.scrollTo(0, 0);
    };
  

  const NavItem = ({ path, icon, label, match, isActive }) => (
    <Link to={path} onClick={() => handleModuleClick(match)} className={`font-bold flex items-center p-4 @md:p-2 space-x-2 @md:space-x-3 rounded-md cursor-pointer sm:text-xs xl:text-sm 2xl:text-lg @md:text-base ${
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
      className="flex flex-col sm:w-38 md:w-40 xl:w-52 2xl:w-56 p-4 @md:p-6 bg-hero_portal-side_bar text-white h-[calc(100vh-footerHeight)] z-50"
      initial={initialLoad ? { x: "-100%" } : {}}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ minHeight: '100vh' }}
    >
      <div className="flex justify-center items-center mb-8 @md:mb-10">
        <div className="text-3xl @md:text-3xl p-1.5 @md:p-2 font-extrabold text-text-light italic pt-6">
          TIA
        </div>
      </div>
      <nav>
        <ul>
          {sidebarItems.map((item) => (
              <NavItem
                key={item.path}
                path={item.path}
                icon={item.icon} 
                label={item.label}
                match={item.match}
                isActive={splitPath === item.match} // Update sidebar selection based on route title e.g. Dashboard selected if on /dashboard
              />
          ))}
        </ul>

        </nav>
{/* Configure button at the bottom (whether to display “showConfigure” remains available） */}
{showConfigure && (
  <div className="pt-4 mt-2 border-t border-white/10">
    {selectedGoal ? (
      // Selected target → Jumpable
      <Link
        to={`/onboarding?goal=${encodeURIComponent(selectedGoal)}`}
        className="block w-full text-left font-semibold sm:text-xs xl:text-sm 2xl:text-lg @md:text-base
                   px-4 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
        onClick={() => {
          setActiveTab?.("profile");
          setActivePage?.("dashboard");
          window.scrollTo(0, 0);
        }}
      >
        Configure workspace
      </Link>
    ) : (
      // No target selected → Greyed out and disabled
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="block w-full text-left font-semibold sm:text-xs xl:text-sm 2xl:text-lg @md:text-base
                   px-4 py-2.5 rounded-md bg-gray-400/50 text-white/70 cursor-not-allowed"
        title="Please select Cashflow / Build Team / Business Growth first"
      >
        Configure workspace
      </button>
    )}
  </div>
)}
</motion.div>

  )
};

export default Sidebar;
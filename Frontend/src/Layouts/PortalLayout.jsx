import Sidebar from "../components/Portal/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";

// Alternate Layout for Portal pages

const PortalLayout = ({activePage, setActivePage, setDirection, direction, setActiveTab}) => {

  return (
    <>
      <div className="font-poppins flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1">
            <aside className="h-screen sticky top-0 z-50">
                <Sidebar activePage={activePage} setActivePage={setActivePage} setDirection={setDirection} setActiveTab={setActiveTab}/>
            </aside>
            
            <div className="flex-1 flex flex-col">
              <main className="flex-1 z-10">
                <motion.div 
                  initial={{y: direction > "down" ? "-100%" : "100%" }}
                  animate={{ y: 0 }}
                  exit={{y: direction > "down" ? "100%" : "-100%" }}
                  transition={{ duration: 0.5, ease: easeInOut }}
                >
                  <Outlet /> {}
                </motion.div>
              </main>
              <Footer />
            </div>
        </div>
      </div>
    </>
  );
};

export default PortalLayout;
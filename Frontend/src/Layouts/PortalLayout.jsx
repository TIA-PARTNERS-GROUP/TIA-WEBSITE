import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Suspense } from "react";

import { useLoading } from "../utils/LoadingContext";

import Sidebar from "../components/Portal/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import LoadingSpinner from "../components/Hero/LoadingSpinner";

// Layout for Portal pages
const PortalLayout = ({activePage, setActivePage, setDirection, direction, setActiveTab}) => {

  const { isLoading } = useLoading();

  return (
      <div className="font-poppins flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1">
            <aside className="h-screen sticky top-0 z-50">
                <Sidebar activePage={activePage} setActivePage={setActivePage} setDirection={setDirection} setActiveTab={setActiveTab}/>
            </aside>
            
            <Suspense fallback={<LoadingSpinner />}>
            <div className="flex-1 flex flex-col">
              <main className="flex-1 z-10">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
                    <LoadingSpinner />
                  </div>
                )}
                <motion.div 
                  initial={{y: direction > "down" ? "-100%" : "100%" }}
                  animate={{ y: 0 }}
                  exit={{y: direction > "down" ? "100%" : "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <Outlet /> {}
                </motion.div>
              </main>
              <Footer />
            </div>
            </Suspense>
        </div>
      </div>
  );
};

export default PortalLayout;
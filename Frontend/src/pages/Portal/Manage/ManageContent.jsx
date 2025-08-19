import { useParams } from 'react-router-dom';
import { motion, easeInOut, AnimatePresence } from 'framer-motion';
import HorizontalTabs from "../../../components/Button/HorizontalTabs";
import Connections from "./Connections";
import CaseStudies from './CaseStudies';
import Testimonials from './Testimonials';
import Blogs from './Blogs';
import MasterMind from './MasterMind';
import Profile from './Profile';

// Tab names
const tabData = [
    {description: "Profile", path: "profile", element: <Profile />}, 
    {description: "Connections", path: "connections", element: <Connections />},
    {description: "Case Studies", path: "case-studies", element: <CaseStudies />}, 
    {description: "Testimonials", path: "testimonials", element: <Testimonials />}, 
    {description: "Blogs", path: "blogs", element: <Blogs />}, 
    {description: "Mastermind", path: "mastermind", element: <MasterMind />}
];

const ManageContent = ({activeTab, setActiveTab, tabDirection, setTabDirection}) => {
  const { manageType } = useParams();
  const activeManage = manageType || tabData[0].path
  const activeTabElement = tabData.find(tab => tab.path === activeManage).element || tabData[0].element;
  
  return (
    <div>
      <HorizontalTabs 
        tabData={tabData}
        basePath="/manage/"
        activePath={activeManage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTabDirection={setTabDirection}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeManage}
          initial={{x: tabDirection === "right" ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{x: tabDirection === "right" ? "-100%" : "100%"}}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {activeTabElement}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ManageContent;
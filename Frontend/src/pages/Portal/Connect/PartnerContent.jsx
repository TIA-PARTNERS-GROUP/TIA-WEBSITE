import { Outlet, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HorizontalTabs from "../../../components/Button/HorizontalTabs";

const partnerTabData = [
  {description: "Alliance Partners", path: "alliance"}, 
  {description: "Complementary Partners", path: "complementary"}, 
  {description: "MasterMind Partners", path: "mastermind"}, 
];

const PartnerContent = ({ activeTab, setActiveTab, tabDirection, setTabDirection }) => {
  const { partnerType } = useParams();
  const activePartner = partnerType || partnerTabData[0].path
  
  return (
    <div>
      <HorizontalTabs 
        tabData={partnerTabData}
        basePath="/connect/"
        activePath={activePartner}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTabDirection={setTabDirection}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activePartner}
          initial={{x: tabDirection === "right" ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{x: tabDirection === "right" ? "-100%" : "100%"}}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PartnerContent;
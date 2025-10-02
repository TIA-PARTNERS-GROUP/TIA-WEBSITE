import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HorizontalTabs from "../../../components/Button/HorizontalTabs";
import FindJob from "./FindJob";
import SubmitJob from "./SubmitJob";
import History from "./History";

// Tab names
const tabData = [
    {description: "Find Project", path: "find", element: <FindJob />}, 
    {description: "Submit New Project", path: "submit", element: <SubmitJob />},
    {description: "History", path: "history", element: <History />}, 
];

const TradeContent = ({ activeTab, setActiveTab, tabDirection, setTabDirection }) => {
  const { tradeType } = useParams();
  const activeTrade = tradeType || tabData[0].path
  const activeTabElement = tabData.find(tab => tab.path === activeTrade).element || tabData[0].element;

  return (
    <div>
      <HorizontalTabs 
        tabData={tabData}
        basePath="/trade/"
        activePath={activeTrade}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTabDirection={setTabDirection}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrade}
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

export default TradeContent;
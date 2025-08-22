import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import HorizontalTabs from "../../../components/Button/HorizontalTabs";
import SmartConnect from "../../../components/Portal/Connect/SmartConnect";
import QuickSearch from "../../../components/Portal/Connect/QuickSearch";
import { motion, AnimatePresence } from 'framer-motion';

const searchTabData = [
  {description: "SmartConnect", path: "smartconnect"}, 
  {description: "Quick Search", path: "quick-search"}
];

const SearchContent = ({ activeTab, setActiveTab, tabDirection, setTabDirection }) => {
  const { partnerType, searchType } = useParams();
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('q');

  const navigate = useNavigate();

  // Redirects to smartconnect if no searchType is specified
  useEffect(() => {
    if (partnerType && !searchType) {
      navigate(`/connect/${partnerType}/smartconnect`, { replace: true });
    }
  }, [partnerType, searchType, navigate]);

  // While redirecting, show nothing
  if (partnerType && !searchType) {
    return null;
  }

  return (
    <div className="pt-10 sm:pl-4 2xl:pl-20">
      <HorizontalTabs 
        tabData={searchTabData}
        basePath={`/connect/${partnerType}`}
        activePath={searchType || 'smartconnect'}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setTabDirection={setTabDirection}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={searchType}
          initial={{x: tabDirection === "right" ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{x: tabDirection === "right" ? "-100%" : "100%"}}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {searchType === "quick-search" ? (
            <QuickSearch queryValue = {queryValue} />
          ) : (
            <></>
          )}
          {searchType === "smartconnect" ? (
            <SmartConnect />
          ) : (
            <></>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SearchContent;
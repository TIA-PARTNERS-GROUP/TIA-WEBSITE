import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HorizontalTabs from "../../../components/Button/HorizontalTabs";
import SmartConnect from "../../../components/Portal/Connect/SmartConnect";
import QuickSearch from "../../../components/Portal/Connect/QuickSearch";

const searchTabData = [
  {description: "SmartConnect", path: "smartconnect"}, 
  {description: "Quick Search", path: "quick-search"}
];

const SearchContent = () => {
  const { partnerType, searchType } = useParams();
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
    <div className="pt-10 pl-20">
      <HorizontalTabs 
        tabData={searchTabData}
        basePath={`/connect/${partnerType}`}
        activePath={searchType || 'smartconnect'}
      />
      
      {searchType === "quick-search" ? (
        <QuickSearch />
      ) : (
        <SmartConnect />
      )}
    </div>
  );
};

export default SearchContent;
import { Outlet, useParams } from 'react-router-dom';
import HorizontalTabs from "../../../components/Button/HorizontalTabs";

const partnerTabData = [
  {description: "Alliance Partners", path: "alliance"}, 
  {description: "Complementary Partners", path: "complementary"}, 
  {description: "MasterMind Partners", path: "mastermind"}, 
];

const PartnerContent = () => {
  const { partnerType } = useParams();
  const activePartner = partnerType || partnerTabData[0].path
  
  return (
    <div>
      <HorizontalTabs 
        tabData={partnerTabData}
        basePath="/connect/"
        activePath={activePartner}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PartnerContent;
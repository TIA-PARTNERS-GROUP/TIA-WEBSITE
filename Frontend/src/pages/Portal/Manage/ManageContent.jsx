import { useParams } from 'react-router-dom';
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

const ManageContent = () => {
  const { manageType } = useParams();
  const activeManage = manageType || tabData[0].path

  const activeTab = tabData.find(tab => tab.path === activeManage) || tabData[0];
  
  return (
    <div>
      <HorizontalTabs 
        tabData={tabData}
        basePath="/manage/"
        activePath={activeManage}
      />
      <div>
        {activeTab.element}
      </div>
    </div>
  );
};

export default ManageContent;
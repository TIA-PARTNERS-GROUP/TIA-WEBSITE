import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TableView from '../../../components/Portal/Manage/TableView';
import IndividualView from '../../../components/Portal/Manage/IndividualView';
import WriteView from '../../../components/Portal/Manage/Write';
import GridView from '../../../components/Portal/Manage/GridView';
import ProfileView from '../../../components/Portal/Manage/ProfileView';
import ProfileOutput from '../../../components/Portal/Manage/ProfileOutput';
import EditView from '../../../components/Portal/Manage/EditView';

const TableViewContent = () => {
  const { manageType, tableViewType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [tables, setTables] = useState({
    casestudies: [{title: 'Router', date: new Date().toLocaleDateString(), content: "This article is empty."}],
    testimonials: [{title: "My Experience with TIA SmartConnect", date: new Date().toLocaleDateString(), content: "This article is empty."}],
    blogs: [ {title: "Networking", date: new Date().toLocaleDateString(), content: "This article is empty."}, {title: "Our Experience at TECH20", date: new Date().toLocaleDateString(), content: "This article is empty."}]
  });
  
  useEffect(() => {
    if (location.state?.newArticle) {
      const { title, type, date, content } = location.state.newArticle;
      
      setTables(prevTables => {
        const newTables = {...prevTables};
        const newItem = { title, date, content };
        
        switch(type) {
          case 'case-studies':
            newTables.casestudies = [...prevTables.casestudies, newItem];
            break;
          case 'testimonials':
            newTables.testimonials = [...prevTables.testimonials, newItem];
            break;
          case 'blogs':
            newTables.blogs = [...prevTables.blogs, newItem];
            break;
        }
        
        return newTables;
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  let activeTableType;
  if (manageType === "connections") {activeTableType = tableViewType || "grid-view";}
  else {activeTableType = tableViewType || "table-view";}

  let initialTableData;
  switch (manageType) {
    case "case-studies": initialTableData = tables.casestudies; break;
    case "testimonials": initialTableData = tables.testimonials; break;
    case "blogs": initialTableData = tables.blogs; break;
    default: initialTableData = null;
  }

  useEffect(() => {
    if (manageType && !tableViewType) {
      const defaultView = 
        manageType === "connections" ? "grid-view" :
        manageType === "profile" ? "view" :
      "table-view";
      navigate(`/manage/${manageType}/${defaultView}`, { replace: true });
    }
  }, [manageType, tableViewType, navigate]);

  if (manageType && !tableViewType) {
    return null;
  }

  return (
    <div>
      {(activeTableType === "table-view" && !(manageType === "connections")) && <TableView initialTableData={initialTableData}/>}
      {(activeTableType === "individual-view" && !(manageType === "connections")) && <IndividualView />}
      {(activeTableType === "write" && !(manageType === "connections")) && <WriteView />}
      {(activeTableType === "grid-view" && manageType === "connections") && <GridView />}
      {(activeTableType === "profile-view" && manageType === "connections") && <ProfileView />}
      {(activeTableType === "view" && manageType === "profile") && <ProfileOutput />}
      {(activeTableType === "edit" && manageType === "profile") && <EditView />}
    </div>
  );
};

export default TableViewContent;
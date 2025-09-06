import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
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

  let activeTableType;
  if (manageType === "connections") {activeTableType = tableViewType || "grid-view";}
  else {activeTableType = tableViewType || "table-view";}

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
      {(activeTableType === "table-view" && !(manageType === "connections")) && <TableView />}
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
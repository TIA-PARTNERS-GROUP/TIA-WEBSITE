import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout.jsx";
import PortalLayout from "./Layouts/PortalLayout.jsx";

const HomePage = React.lazy(() => import("./pages/LandingPage.jsx"));
const DashboardPage = React.lazy(() => import("./pages/Portal/Dashboard/DashboardPage.jsx"));
const ManagePage = React.lazy(() => import("./pages/Portal/Manage/ManagePage.jsx"));
const ConnectPage = React.lazy(() => import("./pages/Portal/Connect/ConnectPage.jsx"));
const PartnerContent = React.lazy(() => import("./pages/Portal/Connect/PartnerContent.jsx"));
const SearchContent = React.lazy(() => import("./pages/Portal/Connect/SearchContent.jsx"));
const ManageContent = React.lazy(() => import("./pages/Portal/Manage/ManageContent.jsx"));
const TableViewContent = React.lazy(() => import("./pages/Portal/Manage/TableViewContent.jsx"));

const TradePage = React.lazy(() => import("./pages/Portal/Trade/TradePage.jsx"));
const FindJob = React.lazy(() => import("./pages/Portal/Trade/FindJob.jsx"));
const SubmitJob = React.lazy(() => import("./pages/Portal/Trade/SubmitJob.jsx"));
const History = React.lazy(() => import("./pages/Portal/Trade/History.jsx"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>\
          <Route element={<PortalLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/manage" element={<ManagePage />}> 
              <Route path=":manageType" element={<ManageContent />}>
                <Route index element={<TableViewContent />} />
                <Route path=":tableViewType" element={<TableViewContent/>} />
              </Route>
            </Route>
            <Route path="/connect" element={<ConnectPage />}>
              <Route path=":partnerType" element={<PartnerContent />}>
                <Route index element={<SearchContent />} />
                <Route path=":searchType" element={<SearchContent />} />
              </Route>
            </Route>
            <Route path="/trade" element={<TradePage />}>
            <Route index element={<FindJob />} />
            <Route path="find" element={<FindJob />} />
            <Route path="submit" element={<SubmitJob />} />
            <Route path="history" element={<History />} />
          </Route>
          </Route>

          


          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

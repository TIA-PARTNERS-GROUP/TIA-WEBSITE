import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "./Layouts/MainLayout.jsx";
import PortalLayout from "./Layouts/PortalLayout.jsx";

const HomePage = React.lazy(() => import("./pages/LandingPage.jsx"));
const ChatPage = React.lazy(() => import("./pages/Portal/Chat/ChatPage.jsx"));

const DashboardPage = React.lazy(() => import("./pages/Portal/Dashboard/DashboardPage.jsx"));
const ManagePage = React.lazy(() => import("./pages/Portal/Manage/ManagePage.jsx"));
const ManageContent = React.lazy(() => import("./pages/Portal/Manage/ManageContent.jsx"));
const TableViewContent = React.lazy(() => import("./pages/Portal/Manage/TableViewContent.jsx"));

const ConnectPage = React.lazy(() => import("./pages/Portal/Connect/ConnectPage.jsx"));
const PartnerContent = React.lazy(() => import("./pages/Portal/Connect/PartnerContent.jsx"));
const SearchContent = React.lazy(() => import("./pages/Portal/Connect/SearchContent.jsx"));

const BuildPage = React.lazy(() => import("./pages/Portal/Build/BuildPage.jsx"));
const CollaboratePage = React.lazy(() => import("./pages/Portal/Collaborate/CollaboratePage.jsx"));
const NetworkPage = React.lazy(() => import("./pages/Portal/Network/NetworkPage.jsx"));

const TradePage = React.lazy(() => import("./pages/Portal/Trade/TradePage.jsx"));
const FindJob = React.lazy(() => import("./pages/Portal/Trade/FindJob.jsx"));
const SubmitJob = React.lazy(() => import("./pages/Portal/Trade/SubmitJob.jsx"));
const History = React.lazy(() => import("./pages/Portal/Trade/History.jsx"));

const LoginPage = React.lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage.jsx"));

function App() {

  const location = useLocation();

  // Active page + direction info for proper sidebar page navigation transitions
  const [activePage, setActivePage] = useState("dashboard");
  const [direction, setDirection] = useState("down");

  // Active tab + direction info for proper horizontal tab page navigation transitions
  const [activeTab, setActiveTab] = useState(location.pathname.split("/")[2] ?? 'profile');
  const [tabDirection, setTabDirection] = useState("right");

  return (
    <AnimatePresence mode="wait"> {/* Trigger page transition exit animations when first path segment changes, see key below */}
      <Routes location={location} key={location.pathname.split("/")[1]}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route>
          <Route path="/chat-llm" element={<ChatPage />} />
        </Route>
        <Route element={<PortalLayout activePage={activePage} setActivePage={setActivePage} direction={direction} setDirection={setDirection} setActiveTab={setActiveTab}/>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/manage" element={<ManagePage />}> 
            <Route path=":manageType" element={<ManageContent activeTab={activeTab} setActiveTab={setActiveTab} tabDirection={tabDirection} setTabDirection={setTabDirection}/>}>
              <Route index element={<TableViewContent />} />
              <Route path=":tableViewType" element={<TableViewContent/>} />
            </Route>
          </Route>
          <Route path="/connect" element={<ConnectPage />}>
            <Route path=":partnerType" element={<PartnerContent activeTab={activeTab} setActiveTab={setActiveTab} tabDirection={tabDirection} setTabDirection={setTabDirection}/>}>
              <Route index element={<SearchContent />} />
              <Route path=":searchType" element={<SearchContent activeTab={activeTab} setActiveTab={setActiveTab} tabDirection={tabDirection} setTabDirection={setTabDirection}/>} />
            </Route>
          </Route>
          <Route path="/build" element={<BuildPage />} />
          <Route path="/collaborate" element={<CollaboratePage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/trade" element={<TradePage />}>
            <Route index element={<FindJob />} />
            <Route path="find" element={<FindJob />} />
            <Route path="submit" element={<SubmitJob />} />
            <Route path="history" element={<History />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
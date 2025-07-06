import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout.jsx";
import PortalLayout from "./Layouts/PortalLayout.jsx";

const HomePage = React.lazy(() => import("./pages/LandingPage.jsx"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage.jsx"));

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>\
          <Route element={<PortalLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>\
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

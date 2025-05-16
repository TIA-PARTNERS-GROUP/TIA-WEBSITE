import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout.jsx';

const HomePage = React.lazy(() => import('./pages/Home/HomePage.jsx'));
const BenefitsPage = React.lazy(() => import('./pages/Benefits/BenefitsPage.jsx'));
const MembershipPage = React.lazy(() => import('./pages/Membership/MembershipPage.jsx'));


function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/membership" element={<MembershipPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

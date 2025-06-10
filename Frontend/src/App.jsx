import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layouts/MainLayout.jsx";

const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

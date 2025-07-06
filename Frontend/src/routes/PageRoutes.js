// src/routes/lazyPages.js
export const lazyImports = {
  '/benefits': () => import('../pages/Benefits/BenefitsPage.jsx'),
  '/membership': () => import('../pages/Membership/MembershipPage.jsx'),
  '/dashboard':() => import ('../pages/DashboardPage.jsx')
};

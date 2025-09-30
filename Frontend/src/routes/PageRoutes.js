
// src/routes/lazyPages.js
export const lazyImports = {
  '/benefits':    () => import('../pages/Benefits/BenefitsPage.jsx'),
  '/membership':  () => import('../pages/Membership/MembershipPage.jsx'),

  // Existing Dashboard files (in the Portal/Dashboard directory)
  '/dashboard':   () => import('../pages/Portal/Dashboard/DashboardPage.jsx'),
  '/firsttime':  () => import('../pages/Portal/Dashboard/FirstTimeView.jsx'),

  // New: Configuration Selection Page
  '/onboarding':  () => import('../pages/Portal/Dashboard/OnboardingPage.jsx'),
  

};


// src/routes/lazyPages.js
export const lazyImports = {
  '/benefits':    () => import('../pages/Benefits/BenefitsPage.jsx'),
  '/membership':  () => import('../pages/Membership/MembershipPage.jsx'),

  // ✅ 指向你现有的 Dashboard 文件（在 Portal/Dashboard 目录）
  '/dashboard':   () => import('../pages/Portal/Dashboard/DashboardPage.jsx'),
  '/firsttime':  () => import('../pages/Portal/Dashboard/FirstTimeView.jsx'),

  // ✅ 新增：配置选择页
  '/onboarding':  () => import('../pages/Portal/Dashboard/OnboardingPage.jsx'),
  

};

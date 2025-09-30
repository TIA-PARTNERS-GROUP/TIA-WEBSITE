// src/utils/dashboardConfig.js
const LS_KEY = "tia:dashboardConfig";

/** Goals & List of Selectable Submodules Under Each Goal (For Onboarding) */
export const GOALS = {
  cashflow: {
    label: "Cashflow",
    widgets: [
      { key: "complementary", label: "Complementary Partners" },
      { key: "alliance",       label: "Alliance Partners" },
      { key: "mastermind",     label: "Mastermind Partners" },
      { key: "jobs",           label: "Project / Job Listings" },
      { key: "tech",           label: "Tech Briefings" },
      { key: "events",         label: "Events" },
    ],
  },
  resources: {
    label: "Resources",
    widgets: [
      { key: "alliance",        label: "Alliance Partners" },
      { key: "mastermind",      label: "Mastermind Partners" },
      { key: "jobsPosted",      label: "Project / Job posted" },
      { key: "timeOutsourced",  label: "Time Outsourced" },
      { key: "eventsAttended",  label: "Events Attended – Connections Made" },
    ],
  },
  businessGrowth: {
    label: "Business Growth",
    widgets: [
      { key: "complementary", label: "Complementary Partners" },
      { key: "mastermind",    label: "Mastermind Partners" },
      { key: "builders",      label: "Business Builders" },
      { key: "tradePartners", label: "Trade Partners" },
      { key: "workOnBiz",     label: "Work On your business" },
      { key: "tech",          label: "Technology Briefings" },
      { key: "network",       label: "Network Events" },
    ],
  },
};

/** Initial default value (when not configured) */
const DEFAULT_CFG = {
  configured: false,
  lastGoal: "cashflow",     // Currently active target
  goals: {
    cashflow:       { enabled: true,  widgets: ["complementary"] },
    resources:      { enabled: false, widgets: [] },
    businessGrowth: { enabled: false, widgets: [] },
  },
};

/** Compatible with the old {configured, widgets, lastDomain} structure 
 * -> Migrated to the new structure Compatible with your old {configured, widgets, lastDomain} structure 
 * -> Migrate to the new structure */
function migrateLegacy(rawObj) {
  if (!rawObj || typeof rawObj !== "object") return DEFAULT_CFG;

  // old structure：{ configured, widgets:[], lastDomain:'cashflow' }
  if (!rawObj.goals) {
    const last = rawObj.lastDomain || "cashflow";
    return {
      configured: !!rawObj.configured,
      lastGoal: last,
      goals: {
        cashflow: {
          enabled: last === "cashflow" ? true : false,
          widgets: Array.isArray(rawObj.widgets) ? rawObj.widgets : [],
        },
        resources: {
          enabled: last === "resources" ? true : false,
          widgets: [],
        },
        businessGrowth: {
          enabled: last === "businessGrowth" ? true : false,
          widgets: [],
        },
      },
    };
  }
  // new structure
  return rawObj;
}

export function loadDashboardConfig() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_CFG;
    const obj = JSON.parse(raw);
    return migrateLegacy(obj);
  } catch {
    return DEFAULT_CFG;
  }
}

export function saveDashboardConfig(cfg) {
  localStorage.setItem(LS_KEY, JSON.stringify(cfg));
}

/** Retrieve the currently active goal (URL ?goal= takes precedence; otherwise, use lastGoal) */
export function getActiveGoal() {
  const cfg = loadDashboardConfig();
  const q = new URLSearchParams(window.location.search).get("goal");
  if (q && GOALS[q]) return q;
  return cfg.lastGoal in GOALS ? cfg.lastGoal : "cashflow";
}

/** Set the currently active goal (and persist it) */
export function setActiveGoal(goal) {
  if (!GOALS[goal]) return;
  const cfg = loadDashboardConfig();
  cfg.lastGoal = goal;
  saveDashboardConfig(cfg);
}

/** Save the checkbox selection for a particular goal (used when clicking “Save” during onboarding) */
export function saveGoalSelection(goal, widgets) {
  if (!GOALS[goal]) return;
  const cfg = loadDashboardConfig();
  cfg.configured = true;
  cfg.goals[goal] = {
    enabled: true,
    widgets: Array.isArray(widgets) ? [...widgets] : [],
  };
  cfg.lastGoal = goal;
  saveDashboardConfig(cfg);
}

/** Redirect after saving (currently all redirect to dashboard) */
export function nextAfterSave(goal) {
  return `/dashboard?goal=${encodeURIComponent(goal)}`;
}

/** Retain your original nextDestination API to prevent other legacy code from throwing errors. */
export const ROUTE_OF = {
  cashflow: "/dashboard",
  resources: "/dashboard",
  businessGrowth: "/dashboard",
};

export function nextDestination(widgets) {
// Old signature: Passed in as [‘cashflow’, ...]. Now we only return /dashboard.
// The function is retained for compatibility with legacy code; new code should use nextAfterSave(goal).
  return "/dashboard";
}

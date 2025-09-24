// src/utils/dashboardConfig.js
const LS_KEY = "tia:dashboardConfig";

/** 目标 & 各目标下可勾选的子模块清单（用于 Onboarding） */
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

/** 首次默认值（未配置时） */
const DEFAULT_CFG = {
  configured: false,
  lastGoal: "cashflow",     // 当前激活的目标
  goals: {
    cashflow:       { enabled: true,  widgets: ["complementary"] },
    resources:      { enabled: false, widgets: [] },
    businessGrowth: { enabled: false, widgets: [] },
  },
};

/** 兼容你旧的 {configured, widgets, lastDomain} 结构 -> 迁移为新结构 */
function migrateLegacy(rawObj) {
  if (!rawObj || typeof rawObj !== "object") return DEFAULT_CFG;

  // 旧结构：{ configured, widgets:[], lastDomain:'cashflow' }
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
  // 已是新结构
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

/** 获取当前激活 goal（URL ?goal= 优先，否则使用 lastGoal） */
export function getActiveGoal() {
  const cfg = loadDashboardConfig();
  const q = new URLSearchParams(window.location.search).get("goal");
  if (q && GOALS[q]) return q;
  return cfg.lastGoal in GOALS ? cfg.lastGoal : "cashflow";
}

/** 设置当前激活 goal（并持久化） */
export function setActiveGoal(goal) {
  if (!GOALS[goal]) return;
  const cfg = loadDashboardConfig();
  cfg.lastGoal = goal;
  saveDashboardConfig(cfg);
}

/** 保存某个 goal 的勾选结果（Onboarding 点击 Save 时用） */
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

/** 保存后跳转（你目前全部回到 dashboard） */
export function nextAfterSave(goal) {
  return `/dashboard?goal=${encodeURIComponent(goal)}`;
}

/** （可选）保持你原来的 nextDestination API，避免其它老代码报错 */
export const ROUTE_OF = {
  cashflow: "/dashboard",
  resources: "/dashboard",
  businessGrowth: "/dashboard",
};

export function nextDestination(widgets) {
  // 旧签名：传入的是 ["cashflow", ...] 这种。现在我们只返回 /dashboard。
  // 保留函数是为了兼容旧代码；新代码请用 nextAfterSave(goal)。
  return "/dashboard";
}

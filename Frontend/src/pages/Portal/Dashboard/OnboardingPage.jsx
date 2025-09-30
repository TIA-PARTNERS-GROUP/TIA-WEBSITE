// src/pages/Portal/Dashboard/OnboardingPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  loadDashboardConfig,
  saveDashboardConfig,
  nextDestination,
} from "../../../utils/dashboardConfig";

// —— Grouping of 3 Targets & Option Definitions——
const FORM_DEFS = {
  "cashflow": {
    chip: "Cashflow",
    note: "Setup your CashFlow WorkSpace - Select one or more of the following",
    groups: [
      {
        title: "Connect",
        items: [
          { key: "connect_complementary", label: "Complementary Partners", note: "Exchange business referrals" },
          { key: "connect_alliance",      label: "Alliance Partners",       note: "Work on joint projects" },
          { key: "connect_mastermind",    label: "Mastermind Partners",     note: "Build Mastermind panel" },
        ],
      },
      {
        title: "Trade",
        items: [
          { key: "trade_job_listings", label: "Project / Job Listings", note: "Keep updated, make connections" },
        ],
      },
      {
        title: "Network",
        items: [
          { key: "net_tech_briefings", label: "Tech Briefings", note: "Make business connections" },
          { key: "net_events",         label: "Events",         note: "Find work, find resources" },
        ],
      },
    ],
  },

  "build-team": {
    chip: "Resources",
    note: "Setup your Resources WorkSpace - Select one or more of the following",
    groups: [
      {
        title: "Connect",
        items: [
          { key: "connect_alliance",   label: "Alliance Partners",    note: "Work on joint projects" },
          { key: "connect_mastermind", label: "Mastermind Partners",  note: "Build Mastermind panel" },
        ],
      },
      {
        title: "Trade",
        items: [
          { key: "trade_job_posted",      label: "Project / Job posted", note: "Keep updated, make connections" },
          { key: "trade_time_outsourced", label: "Time Outsourced" },
        ],
      },
      {
        title: "Network",
        items: [
          { key: "net_events_attended", label: "Events Attended – Connections Made" },
        ],
      },
    ],
  },

  "business-growth": {
    chip: "Business Growth",
    note: "Setup your Growth WorkSpace - Select one or more of the following",
    groups: [
      {
        title: "Connect",
        items: [
          { key: "connect_complementary",     label: "Complementary Partners", note: "Exchange business referrals"  },
          { key: "connect_mastermind",        label: "Mastermind Partners",     note: "Build Mastermind panel" },
          { key: "connect_business_builders", label: "Business Builders" },
          { key: "connect_trade_partners",    label: "Trade Partners" },
        ],
      },
      {
        title: "Build",
        items: [
          { key: "build_work_on_business", label: "Work On your business" },
        ],
      },
      {
        title: "Network",
        items: [
          { key: "net_tech_briefings",  label: "Technology Briefings", note: "Make business connections" },
          { key: "net_network_events",  label: "Network Events",       note: "Find work, find resources" },
        ],
      },
    ],
  },
};

// Optional: For global display purposes; does not affect the logic of this page.
const ALL_WIDGETS = [
  { key: "cashflow",        label: "Cashflow" },
  { key: "resources",       label: "Resources" },
  { key: "businessGrowth",  label: "Business Growth" },
  { key: "dailyActivities", label: "Daily Activities" },
  { key: "nextAction",      label: "Next Action" },
  { key: "goalTracker",     label: "Goal Tracker" },
];

function useGoal() {
  const qs = new URLSearchParams(useLocation().search);
  return (qs.get("goal") || localStorage.getItem("tia:selectedGoal") || "cashflow").toLowerCase();
}

export default function OnboardingPage() {
  const goal = useGoal();
  const def = useMemo(() => FORM_DEFS[goal] ?? FORM_DEFS["cashflow"], [goal]);

  // Initialisation: Only when the goal changes for the first time, read the corresponding selections for that goal from the local configuration.
  const [selections, setSelections] = useState(() => {
    const cfg = loadDashboardConfig();
    return cfg?.selections?.[goal] || {};
  });

  // Reset only when the goal changes (to prevent infinite loops)
  useEffect(() => {
    const cfg = loadDashboardConfig();
    setSelections(cfg?.selections?.[goal] || {});
  }, [goal]);

  // Global Widget Selection (Retain existing logic)
  const [widgets, setWidgets] = useState(() => {
    const cfg = loadDashboardConfig();
    return cfg.widgets?.length ? cfg.widgets : ["cashflow"];
  });

  const toggleItem = (key) =>
    setSelections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleWidget = (k) =>
    setWidgets((prev) => (prev.includes(k) ? prev.filter((i) => i !== k) : [...prev, k]));

  const canSave = useMemo(
    () => Object.values(selections).some(Boolean),
    [selections]
  );

  const onSave = () => {
    const cfg = loadDashboardConfig();
    const next = {
      ...cfg,
      configured: true,
      lastGoal: goal,
      widgets,
      selections: {
        ...(cfg?.selections || {}),
        [goal]: selections, // Selection covering only the current goal
      },
    };
    saveDashboardConfig(next);
    const dest = nextDestination(widgets);
    window.location.assign(dest);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Top bar */}
      <div className="bg-white rounded-xl px-6 py-4 flex items-center justify-between shadow-sm">
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold">
          {def.chip}
        </span>
        <div className="text-gray-800 font-medium">Configure Your Workspace</div>
        <div className="w-8 h-8" />
      </div>

      {/* Main content: Left form + Right instructions & buttons */}
      <div className="bg-white rounded-xl p-6 grid grid-cols-12 gap-6 shadow-sm">
        {/* Left: Group selection */}
        <div className="col-span-12 lg:col-span-8">
          <div className="border rounded-xl p-6 space-y-8">
            {def.groups.map((g) => (
              <div key={g.title} className="space-y-3">
                <h4 className="text-gray-900 font-semibold">{g.title}</h4>
                <div className="space-y-2">
                  {g.items.map((it) => {
                    const checked = !!selections[it.key];
                    return (
                      <label key={it.key} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={checked}
                          onChange={() => toggleItem(it.key)}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{it.label}</div>
                          {it.note && <div className="text-xs text-gray-500">{it.note}</div>}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right-hand side: Description + Button */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-gray-700">
            <div className="font-semibold mb-2">{def.note}</div>
            <div>(When done – Click ‘Save’)</div>
          </div>

          <div className="mt-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!canSave}
              onClick={onSave}
              className={`px-6 py-2 rounded-xl text-white font-semibold ${
                canSave ? "bg-teal-500 hover:bg-teal-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}

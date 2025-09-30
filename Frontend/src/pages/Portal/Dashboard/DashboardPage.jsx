// src/pages/Portal/Dashboard/DashboardPage.jsx
import { useEffect, useMemo, useState } from "react";
import { loadDashboardConfig } from "../../../utils/dashboardConfig";

import PortalHeader from "../../../components/Portal/Sidebar/PortalHeader";
import ProfileTab from "../../../components/Portal/Dashboard/ProfileTab";
import FocusTab from "../../../components/Portal/Dashboard/FocusTab";
import NextAction from "../../../components/Portal/Dashboard/NextAction";


import DailyActivities from "../../../components/Portal/Dashboard/DailyActivities";

// ===== Mapping of 3 Domains =====
import {
  CASHFLOW_KEYS,
  renderDailyActivities as renderCashflowDaily,
  cashflowExtras,
} from "./widgets/cashflowMap";
import {
  RESOURCES_KEYS,
  renderResourcesDaily,
  resourcesExtras,
} from "./widgets/resourcesMap";
import {
  GROWTH_KEYS,
  renderGrowthDaily,
  growthExtras,
} from "./widgets/businessGrowthMap";
// =======================

const GRID = "grid grid-cols-3 sm:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 pb-4";

/** Display only ‘Goals achieved this quarter’ */
function GoalsCompletedCard({ percent = 22 }) {
  return (
    <div className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
      <h3 className="font-semibold mb-3">Goals Completed this Quarter</h3>
      <div className="flex flex-col gap-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{percent}% complete</span>
      </div>
    </div>
  );
}

export default function DashboardPage({mock = false}) {
  // Read local configuration (Onboarding saved)
  const cfg = useMemo(() => {
    if (mock) {
      return {
        lastGoal: "cashflow",
        selections: {
          cashflow: { revenue: true, expenses: true },
          resources: {},
          "business-growth": {},
        },
      };
    }
    return loadDashboardConfig() || {};
  }, [mock]);

  // Current objective: localStorage > cfg.lastGoal > 'cashflow'
  const [goal, setGoal] = useState(() => {
    if (mock) return "cashflow";
    const v =
      (typeof window !== "undefined" &&
        localStorage.getItem("tia:selectedGoal")) ||
      cfg.lastGoal ||
      "cashflow";
    return String(v).toLowerCase();
  });

  // Monitor target switching events on the FocusTab
  useEffect(() => {
    if (mock) return;
    const handler = (e) => {
      const v =
        e?.detail ||
        (typeof window !== "undefined" &&
          localStorage.getItem("tia:selectedGoal")) ||
        "cashflow";
      setGoal(String(v).toLowerCase());
    };
    window.addEventListener("tia:selectedGoalChanged", handler);
    return () => window.removeEventListener("tia:selectedGoalChanged", handler);
  }, [mock]);

  // Checked configuration for the current target (may be an empty object)
  const selections = (cfg.selections && cfg.selections[goal]) || {};

  // Has at least one item been configured (in any domain and for any key)?
  const hasAnySelection = useMemo(() => {
    const all = cfg.selections || {};
    return Object.values(all).some((obj) =>
      Object.values(obj || {}).some(Boolean)
    );
  }, [cfg.selections]);

  // —— Assemble the cards to be rendered —— //
  const cards = useMemo(() => {
    const out = [];

    // 1) Display only when the user has configured at least one item: GoalsCompleted + NextAction
    if (hasAnySelection) {
      out.push(<GoalsCompletedCard key="goalsQuarter" percent={22} />);
      out.push(
        <div key="next" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
          <NextAction
            initialActionData={[
              { description: "Finish setting up profile", input: false },
              { description: "Post your first Blog", input: false },
            ]}
          />
        </div>
      );
    }

    // 2) Based on the current goal, combine Daily (aggregated partner items) with other extras.
    if (goal === "cashflow") {
      const chosen = CASHFLOW_KEYS.filter((k) => !!selections[k]);
      const daily = renderCashflowDaily(chosen);
      if (daily) out.push(daily);
      out.push(...cashflowExtras(chosen));
      return out;
    }

    if (goal === "resources" || goal === "build-team") {
      const chosen = RESOURCES_KEYS.filter((k) => !!selections[k]);
      const daily = renderResourcesDaily(chosen);
      if (daily) out.push(daily);
      out.push(...resourcesExtras(chosen));
      return out;
    }

    if (goal === "business-growth" || goal === "businessgrowth") {
      const chosen = GROWTH_KEYS.filter((k) => !!selections[k]);
      const daily = renderGrowthDaily(chosen);
      if (daily) out.push(daily);
      out.push(...growthExtras(chosen));
      return out;
    }

    // Bottom line: Only display public cards that have been added (or none).
    return out;
  }, [goal, selections, hasAnySelection]);

  // —— Rendering —— //
  return (
    <main className="font-poppins relative min-h-screen sm:px-4 lg:px-8 2xl:px-10 bg-gray-100 w-full pt-4 space-y-4">
      <div className="bg-white rounded-xl p-8">
        <PortalHeader mock={mock} module={"Dashboard"} />
        <ProfileTab mock={mock}/>
      </div>

      <div className="bg-white rounded-xl p-8">
        <FocusTab />
      </div>

      <div className={GRID}>
        {cards.length > 0 ? (
          cards.map((node, i) => <div key={i}>{node}</div>)
        ) : (
          <>
            <div className="bg-white rounded-xl p-8 h-full">Nothing selected yet.</div>
            <div className="bg-white rounded-xl p-8 h-full">
              Go to “Configure workspace” in the left sidebar.
            </div>
            <div className="bg-white rounded-xl p-8 h-full" />
          </>
        )}
      </div>
    </main>
  );
}

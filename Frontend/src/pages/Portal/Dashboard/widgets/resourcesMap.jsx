// src/pages/Portal/Dashboard/widgets/resourcesMap.jsx
import GoalTracker from "../../../../components/Portal/Dashboard/GoalTracker";
import NextAction from "../../../../components/Portal/Dashboard/NextAction";
import DailyActivities from "../../../../components/Portal/Dashboard/DailyActivities";

// A key consistent with the resources definition in OnboardingPage
export const RESOURCES_KEYS = [
  "connect_alliance",
  "connect_mastermind",
  "trade_job_posted",
  "trade_time_outsourced",
  "net_events_attended",
];

// Which activities are considered “partner activities” and aggregated into the same Daily Activities?
export const RES_PARTNER_KEYS = ["connect_alliance", "connect_mastermind"];

//  Partner items aggregated into a Daily Activities dashboard (with step counter + CONNECT)
export function renderResourcesDaily(chosenKeys) {
  const picks = RES_PARTNER_KEYS.filter((k) => chosenKeys.includes(k));
  if (picks.length === 0) return null;

  const bars = [];

  if (picks.includes("connect_alliance")) {
    bars.push({
      progress: 55,
      description: "Alliance Partners connected",
      quarterlyGoal: 6,
      onQuarterlyGoalChange: (n) => console.log("Alliance goal ->", n),
      actionLabel: "CONNECT",
      onActionClick: () => window.location.assign("/connect/alliance/smartconnect"),
    });
  }

  if (picks.includes("connect_mastermind")) {
    bars.push({
      progress: 48,
      description: "Mastermind Partners connected",
      quarterlyGoal: 6,
      onQuarterlyGoalChange: (n) => console.log("Mastermind goal ->", n),
      actionLabel: "CONNECT",
      onActionClick: () => window.location.assign("/connect/mastermind/smartconnect"),
    });
  }

  const overall =
    bars.length > 0
      ? Math.round(bars.reduce((s, b) => s + Number(b.progress || 0), 0) / bars.length)
      : 0;

  return (
    <div key="res-daily" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
      <DailyActivities overallProgress={overall} barData={bars} />
    </div>
  );
}

// Non-partner items: Add as selected (keep placeholder + appropriate button)
export function resourcesExtras(chosenKeys) {
  const out = [];

  if (chosenKeys.includes("trade_job_posted")) {
    out.push(
      <div key="job-posted" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Project / Job posted</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button
          className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => console.log("Go post a job")}
        >
          POST
        </button>
      </div>
    );
  }

  if (chosenKeys.includes("trade_time_outsourced")) {
    out.push(
      <div key="time-outsourced" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Time Outsourced</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button
          className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => window.location.assign("/connect/alliance/quick-search")}
        >
          FIND TALENT
        </button>
      </div>
    );
  }

  if (chosenKeys.includes("net_events_attended")) {
    out.push(
      <div key="events-attended" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Events Attended – Connections Made</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button
          className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => window.location.assign("/connect/alliance/quick-search")}
        >
          ATTEND
        </button>
      </div>
    );
  }

  return out;
}

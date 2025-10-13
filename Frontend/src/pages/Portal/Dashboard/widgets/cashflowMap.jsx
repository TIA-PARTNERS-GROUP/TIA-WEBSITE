import GoalTracker from "../../../../components/Portal/Dashboard/GoalTracker";
import NextAction from "../../../../components/Portal/Dashboard/NextAction";
import DailyActivities from "../../../../components/Portal/Dashboard/DailyActivities";

export const CASHFLOW_KEYS = [
  "connect_complementary",
  "connect_alliance",
  "connect_mastermind",
  "trade_job_listings",
  "net_tech_briefings",
  "net_events",
];

// Partner Class Key
export const PARTNER_KEYS = [
  "connect_complementary",
  "connect_alliance",
  "connect_mastermind",
];

// Aggregate the “selected partner items” into a single Daily Activities card
export function renderDailyActivities(selectedKeys) {
  const picks = PARTNER_KEYS.filter((k) => selectedKeys.includes(k));
  if (picks.length === 0) return null;

  const bars = [];

  if (picks.includes("connect_complementary")) {
    bars.push({
      progress: 40,
      description: "Complementary Partners connected",
      quarterlyGoal: 6,
      onQuarterlyGoalChange: (n) =>
        console.log("Complementary goal ->", n),
      actionLabel: "CONNECT",
      onActionClick: () =>
        window.location.assign("/connect/complementary/smartconnect"),
    });
  }

  if (picks.includes("connect_alliance")) {
    bars.push({
      progress: 60,
      description: "Alliance Partners connected",
      quarterlyGoal: 6,
      onQuarterlyGoalChange: (n) =>
        console.log("Alliance goal ->", n),
      actionLabel: "CONNECT",
      onActionClick: () =>
        window.location.assign("/connect/alliance/smartconnect"),
    });
  }

  if (picks.includes("connect_mastermind")) {
    bars.push({
      progress: 80,
      description: "Mastermind Partners connected",
      quarterlyGoal: 6,
      onQuarterlyGoalChange: (n) =>
        console.log("Mastermind goal ->", n),
      actionLabel: "CONNECT",
      onActionClick: () =>
        window.location.assign("/connect/mastermind/smartconnect"),
    });
  }

   // overall take the average of three items
  const overall =
    bars.length > 0
      ? Math.round(
          bars.reduce((s, b) => s + Number(b.progress || 0), 0) / bars.length
        )
      : 0;

  return (
    <div key="daily" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
      <DailyActivities overallProgress={overall} barData={bars} />
    </div>
  );
}

// Non-partner items: Add corresponding cards based on selection
export function cashflowExtras(selectedKeys) {
  const out = [];

  if (selectedKeys.includes("net_tech_briefings")) {
    out.push(
      <div key="tech" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Tech Briefings</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
          Add a tech briefing
        </button>
      </div>
    );
  }

  if (selectedKeys.includes("trade_job_listings")) {
    out.push(
      <div key="jobs" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Project / Job Listings</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
          Post a new listing
        </button>
      </div>
    );
  }

  if (selectedKeys.includes("net_events")) {
    out.push(
      <div key="events" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Events</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
          Find relevant events
        </button>
      </div>
    );
  }

  return out;
}

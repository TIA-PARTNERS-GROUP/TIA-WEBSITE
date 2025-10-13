import DailyActivities from "../../../../components/Portal/Dashboard/DailyActivities";

// Consistent with the business-growth definition of Onboarding
export const GROWTH_KEYS = [
  "connect_complementary",
  "connect_mastermind",
  "connect_business_builders",
  "connect_trade_partners",
  "build_work_on_business",
  "net_tech_briefings",
  "net_network_events",
];

// Partner Category (Aggregated into a single Daily Activities)
export const PARTNER_KEYS_GROWTH = ["connect_complementary", "connect_mastermind"];

// Partner items aggregated into a Daily Activities dashboard (with step counter + CONNECT)
export function renderGrowthDaily(chosenKeys) {
  const picks = PARTNER_KEYS_GROWTH.filter((k) => chosenKeys.includes(k));
  if (picks.length === 0) return null;

  const bars = [];

  if (picks.includes("connect_complementary")) {
    bars.push({
      progress: 62,
      description: "Complementary Partners connected",
      quarterlyGoal: 6,
      onQuarterlyGoalChange: (n) => console.log("Complementary goal ->", n),
      actionLabel: "CONNECT",
      onActionClick: () => window.location.assign("/connect/complementary/smartconnect"),
    });
  }

  if (picks.includes("connect_mastermind")) {
    bars.push({
      progress: 45,
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
    <div key="daily-growth" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
      <DailyActivities overallProgress={overall} barData={bars} />
    </div>
  );
}

// Non-partner items: Add as selected
export function growthExtras(chosenKeys) {
  const out = [];

  if (chosenKeys.includes("connect_business_builders")) {
    out.push(
      <div key="g-builders" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Business Builders</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button
          className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => window.location.assign("/connect")}
        >
          CONNECT
        </button>
      </div>
    );
  }

  if (chosenKeys.includes("connect_trade_partners")) {
    out.push(
      <div key="g-trade-partners" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Trade Partners</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button
          className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => window.location.assign("/connect")}
        >
          CONNECT
        </button>
      </div>
    );
  }

  if (chosenKeys.includes("build_work_on_business")) {
    out.push(
      <div key="g-work-on" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Work On your business</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button
          className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => console.log("Open work-on-business flow")}
        >
          START
        </button>
      </div>
    );
  }

  if (chosenKeys.includes("net_tech_briefings")) {
    out.push(
      <div key="g-tech" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Technology Briefings</h3>
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

  if (chosenKeys.includes("net_network_events")) {
    out.push(
      <div key="g-events" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Network Events</h3>
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

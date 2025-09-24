// src/pages/Portal/Dashboard/widgets/businessGrowthMap.jsx
import DailyActivities from "../../../../components/Portal/Dashboard/DailyActivities";

/** 增长域可配置的 key（按你 Onboarding 的命名改就行） */
export const GROWTH_KEYS = [
  "connect_complementary",
  "connect_mastermind",
  "connect_business_builders",
  "connect_trade_partners",
  "build_work_on_business",
  "net_tech_briefings",
  "net_network_events",
];

/** 伙伴类：需要合并到一张 Daily 卡 */
const PARTNER_KEYS = [
  "connect_complementary",
  "connect_mastermind",
  "connect_business_builders",
  "connect_trade_partners",
];

/** 把选中的伙伴项合并成一张 Daily Activities 卡 */
export function renderGrowthDaily(selectedKeys) {
  const picks = PARTNER_KEYS.filter((k) => selectedKeys.includes(k));
  if (picks.length === 0) return null;

  const bars = [];
  if (picks.includes("connect_complementary")) {
    bars.push({ progress: "40", description: "Complementary Partners connected" });
  }
  if (picks.includes("connect_mastermind")) {
    bars.push({ progress: "50", description: "Mastermind Partners connected" });
  }
  if (picks.includes("connect_business_builders")) {
    bars.push({ progress: "30", description: "Business Builders engaged" });
  }
  if (picks.includes("connect_trade_partners")) {
    bars.push({ progress: "45", description: "Trade Partners connected" });
  }

  const overall =
    bars.length > 0
      ? Math.round(bars.reduce((s, b) => s + Number(b.progress || 0), 0) / bars.length)
      : 0;

  return (
    <div key="growth-daily" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
      <h3 className="font-semibold mb-3">Daily Activities</h3>
      <DailyActivities overallProgress={overall} barData={bars} />
    </div>
  );
}

/** 非伙伴项：按选择追加对应卡片 */
export function growthExtras(selectedKeys) {
  const cards = [];

  if (selectedKeys.includes("build_work_on_business")) {
    cards.push(
      <div key="growth-build" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Work On your business</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
      </div>
    );
  }

  if (selectedKeys.includes("net_tech_briefings")) {
    cards.push(
      <div key="growth-tech" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Technology Briefings</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
          Add a tech briefing
        </button>
      </div>
    );
  }

  if (selectedKeys.includes("net_network_events")) {
    cards.push(
      <div key="growth-events" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Network Events</h3>
        <div className="text-sm text-gray-500">Coming soon...</div>
        <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
          Find relevant events
        </button>
      </div>
    );
  }

  return cards;
}
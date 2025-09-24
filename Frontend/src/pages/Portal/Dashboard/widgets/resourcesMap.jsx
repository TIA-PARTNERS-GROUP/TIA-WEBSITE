// src/pages/Portal/Dashboard/widgets/resourcesMap.jsx
import GoalTracker from "../../../../components/Portal/Dashboard/GoalTracker";
import NextAction from "../../../../components/Portal/Dashboard/NextAction";
import DailyActivities from "../../../../components/Portal/Dashboard/DailyActivities";

// 与 OnboardingPage 的 resources 定义一致的 key
export const RESOURCES_KEYS = [
    "connect_alliance",
    "connect_mastermind",
    "trade_job_posted",
    "trade_time_outsourced",
    "net_events_attended",
  ];
  
  // 哪些算“伙伴类”，聚合到同一张 Daily Activities
  export const RES_PARTNER_KEYS = [
    "connect_alliance",
    "connect_mastermind",
  ];
  
  // 伙伴项聚合成一张 Daily Activities
  export function renderResourcesDaily(chosenKeys) {
    const picks = RES_PARTNER_KEYS.filter(k => chosenKeys.includes(k));
    if (picks.length === 0) return null;
  
    const bars = [];
    if (picks.includes("connect_alliance")) {
      bars.push({ progress: "35", description: "Alliance partners in progress" });
    }
    if (picks.includes("connect_mastermind")) {
      bars.push({ progress: "45", description: "Mastermind panel completeness" });
    }
    const overall = Math.round(
      bars.reduce((s, b) => s + Number(b.progress || 0), 0) / bars.length
    );
  
    return (
      <div key="res-daily" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
        <h3 className="font-semibold mb-3">Daily Activities</h3>
        <DailyActivities overallProgress={overall} barData={bars} />
      </div>
    );
  }
  
  // 非伙伴项：按选择追加
  export function resourcesExtras(chosenKeys) {
    const out = [];
  
    if (chosenKeys.includes("trade_job_posted")) {
      out.push(
        <div key="job-posted" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
          <h3 className="font-semibold mb-3">Project / Job posted</h3>
          <div className="text-sm text-gray-500">Coming soon...</div>
          <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
            Add new posting
          </button>
        </div>
      );
    }
  
    if (chosenKeys.includes("trade_time_outsourced")) {
      out.push(
        <div key="time-outsourced" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
          <h3 className="font-semibold mb-3">Time Outsourced</h3>
          <div className="text-sm text-gray-500">Coming soon...</div>
          <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
            Log outsourced time
          </button>
        </div>
      );
    }
  
    if (chosenKeys.includes("net_events_attended")) {
      out.push(
        <div key="events-attended" className="bg-white rounded-xl sm:p-4 2xl:p-8 h-full">
          <h3 className="font-semibold mb-3">Events Attended</h3>
          <div className="text-sm text-gray-500">Coming soon...</div>
          <button className="mt-4 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
            Add attended event
          </button>
        </div>
      );
    }
  
    return out;
  }
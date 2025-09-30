// components/Portal/Dashboard/DailyActivities.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import CircularProgressBar from "../../Button/CircularProgressBar";

/**
 * barData: Array<{
 *   progress: number | string,
 *   description: string,
 *   quarterlyGoal?: number,                 // To display the stepper, pass a number (e.g., 6)
 *   onQuarterlyGoalChange?: (n:number)=>void,
 *   actionLabel?: string,                   // Display button text (e.g., “CONNECT” / “ATTEND”)
 *   onActionClick?: () => void
 * }>
 */
const DailyActivities = ({ overallProgress = 0, barData = [] }) => (
  <div className="flex flex-col items-start pb-4 text-left gap-10">
    {/* Header + overall progress */}
    <div className="flex items-center gap-3 w-full">
      <h2 className="pt-1 sm:text-sm md:text-lg 2xl:text-xl font-bold text-black-800">
        Daily Activities
      </h2>
      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Number(overallProgress) || 0}%` }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${Number(overallProgress) || 0}%` }}
        />
      </div>
      <p className="text-right sm:invisible lg:visible sm:text-xs text-sm text-gray-500 mt-1">
        {Number(overallProgress) || 0}% complete
      </p>
    </div>

    {/* Items */}
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 w-full">
      {barData.map((bar, idx) => (
        <ActivityItem key={idx} {...bar} />
      ))}
    </div>
  </div>
);

function ActivityItem({
  progress = 0,
  description = "",
  quarterlyGoal, // number? Once transmitted, the stepper motor will display.
  onQuarterlyGoalChange,
  actionLabel, // string? After transmission, the button will appear.
  onActionClick,
}) {
  const [goal, setGoal] = useState(
    typeof quarterlyGoal === "number" ? quarterlyGoal : undefined
  );

  const changeGoal = (delta) => {
    if (typeof goal !== "number") return;
    const next = Math.max(0, goal + delta);
    setGoal(next);
    onQuarterlyGoalChange?.(next);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <CircularProgressBar progress={progress} size={100} />

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        className="sm:text-xs 2xl:text-sm text-center mt-2 leading-tight"
      >
        {description}
      </motion.p>

      {/* Quarterly Goal Stepper */}
      {typeof goal === "number" && (
        <div className="mt-1 inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs shadow-sm bg-white">
          <button
            type="button"
            onClick={() => changeGoal(-1)}
            className="px-1 leading-none hover:text-indigo-600"
            aria-label="decrease quarterly goal"
          >
            ◀
          </button>
          <span className="min-w-6 text-center tabular-nums">{goal}</span>
          <button
            type="button"
            onClick={() => changeGoal(1)}
            className="px-1 leading-none hover:text-indigo-600"
            aria-label="increase quarterly goal"
          >
            ▶
          </button>
        </div>
      )}

      {/* Operation button（like CONNECT/ATTEND） */}
      {actionLabel && (
        <button
          type="button"
          onClick={onActionClick}
          className="mt-2 px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default DailyActivities;

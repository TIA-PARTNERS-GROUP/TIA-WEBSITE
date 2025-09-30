import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CashFlowIcon from "../../../components/Icons/CurrencyIcon";
import BuildTeamIcon from "../../../components/Icons/TeamBuildingIcon";
import BusinessGrowthIcon from "../../../components/Icons/TrendingUpIcon";
import PlayButtonWithHint from "../../Portal/Dashboard/PlayButtonWithHint";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};




function FeatureCard({ icon, title, selected, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      variants={itemVariants}
      animate={{
        scale: [1, 1.01, 1],
        transition: { duration: 3, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" },
      }}
      className={[
        "flex flex-col items-center justify-center p-4 @md:p-6 rounded-lg shadow-md transition outline-none",
        "focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        selected
          ? // After being clicked: Maintain gradient highlight
            "text-white bg-gradient-to-r from-violet-600 to-blue-500"
          : // Unselected: White background + border; allows slight hover shadow but does not change color
            "text-gray-900 bg-white border border-gray-200 hover:shadow"
      ].join(" ")}
    >
      {icon}
      <span className="mt-1 md:mt-2 text-center text-xs md:text-xs font-semibold">{title}</span>
    </motion.button>
  );
}

export default function FocusTab() {
  const [selected, setSelected] = useState(null);

  // First mount: Retrieve from localStorage; if absent, default to ‘cashflow’ and broadcast.
  useEffect(() => {
    let v = localStorage.getItem("tia:selectedGoal");
    if (!v) {
      v = "cashflow"; // 也可以换成你想要的默认模块
      localStorage.setItem("tia:selectedGoal", v);
      window.dispatchEvent(new CustomEvent("tia:selectedGoalChanged", { detail: v }));
    }
    setSelected(v);
  }, []);

  const items = [
    { key: "cashflow",         label: "Cashflow",         icon: <CashFlowIcon className="sm:w-4 sm:h-4 w-6 h-6 @md:w-8 @md:h-8" /> },
    { key: "build-team",       label: "Resources",       icon: <BuildTeamIcon className="sm:w-4 sm:h-4 w-6 h-6 @md:w-8 @md:h-8" /> },
    { key: "business-growth",  label: "Growth",  icon: <BusinessGrowthIcon className="sm:w-4 sm:h-4 w-6 h-6 @md:w-8 @md:h-8" /> },
  ];

  const handlePick = (key) => {
    if (key === selected) return;               // Avoid broadcasting the same item repeatedly
    setSelected(key);
    localStorage.setItem("tia:selectedGoal", key);
    window.dispatchEvent(new CustomEvent("tia:selectedGoalChanged", { detail: key }));
  };

  return (
    <div className="container mx-auto flex flex-col items-start text-left">
      <div className="flex items-center gap-2">
        <h2 className="sm:text-sm 2xl:text-lg font-semibold">What do you need help with?</h2>
        <PlayButtonWithHint />
      </div>

      <motion.section
        className="grid grid-cols-3 sm:gap-5 2xl:gap-8 mt-6 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((it) => (
          <FeatureCard
            key={it.key}
            icon={it.icon}
            title={it.label}
            selected={selected === it.key}
            onClick={() => handlePick(it.key)}
          />
        ))}
      </motion.section>
    </div>
  );
}





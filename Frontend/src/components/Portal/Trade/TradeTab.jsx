import { NavLink } from "react-router-dom";

const TradeTab = () => {
  const tabs = [
    { label: "FIND JOB", path: "/trade/find" },
    { label: "SUBMIT JOB", path: "/trade/submit" },
    { label: "HISTORY", path: "/trade/history" },
  ];

  return (
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.path}
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold text-white ${
              isActive
                ? "bg-blue-500"
                : tab.label === "HISTORY"
                ? "bg-black"
                : "bg-gray-800"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default TradeTab;

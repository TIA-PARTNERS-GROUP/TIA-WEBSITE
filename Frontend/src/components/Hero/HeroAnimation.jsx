import DashboardIcon from "../../components/Icons/DashboardIcon";
import SettingsIcon from "../../components/Icons/SettingsIcon";
import ConnectIcon from "../../components/Icons/ConnectIcon";
import BuildIcon from "../../components/Icons/BuildIcon";
import CollaborateIcon from "../../components/Icons/CollaborateIcon";
import NetworkIcon from "../../components/Icons/NetworkIcon";
import TradeIcon from "../../components/Icons/TradeIcon";
import ManageIcon from "../../components/Icons/ManegIcon";
import CashFlowIcon from "../../components/Icons/CurrencyIcon";
import BuildTeamIcon from "../../components/Icons/TeamBuildingIcon";
import BusinessGrowthIcon from "../../components/Icons/TrendingUpIcon";

import ProfileImage from "../../assets/images/profile.png";

const CircularProgress = ({ value, color }) => {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - value) * circ) / 100;

  const colorClasses = {
    green: "text-green-500",
    orange: "text-orange-500",
    blue: "text-blue-500",
  };

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={r}
          cx="60"
          cy="60"
        />
        <circle
          className={`${colorClasses[color]}`}
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={r}
          cx="60"
          cy="60"
          style={{
            strokeDasharray: circ,
            strokeDashoffset: strokePct,
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      <span className={`absolute text-3xl font-bold ${colorClasses[color]}`}>
        {value}
      </span>
    </div>
  );
};

const NavItem = ({ icon, label }) => (
  <li className="flex items-center p-2 space-x-3 text-gray-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white">
    {icon}
    <span>{label}</span>
  </li>
);

const FeatureCard = ({ icon, title }) => (
  <div className="flex flex-col items-center justify-center p-6 text-white bg-gray-700 rounded-lg shadow-md">
    {icon}
    <span className="mt-2 text-sm font-semibold">{title}</span>
  </div>
);

const GridCard = ({ icon, bgColor }) => (
  <div
    className={`flex items-center justify-center p-8 rounded-lg shadow-md ${bgColor}`}
  >
    {icon}
  </div>
);

const Sidebar = () => (
  <div className="flex flex-col w-64 p-6 bg-hero_portal-side_bar text-white">
    {/* Mac-style window controls */}
    <div className="flex space-x-2 mb-8">
      <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"></div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full cursor-pointer"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"></div>
    </div>

    <div className="flex justify-center items-center mb-10">
      <div className="text-3xl p-2 font-extrabold text-text-light italic">
        TIA
      </div>
    </div>

    <nav>
      <ul>
        <NavItem
          icon={<DashboardIcon className="w-5 h-5" />}
          label="Dashboard"
        />
        <NavItem icon={<ManageIcon className="w-5 h-5" />} label="Manage" />
        <NavItem icon={<ConnectIcon className="w-5 h-5" />} label="Connect" />
        <NavItem icon={<BuildIcon className="w-5 h-5" />} label="Build" />
        <NavItem
          icon={<CollaborateIcon className="w-5 h-5" />}
          label="Collaborate"
        />
        <NavItem icon={<NetworkIcon className="w-5 h-5" />} label="Network" />
        <NavItem icon={<TradeIcon className="w-5 h-5" />} label="Trade" />
      </ul>
    </nav>
    <div className="flex items-center p-0 mt-auto space-x-5 cursor-pointer">
      {/* === MODIFIED: Increased profile icon size from w-10 h-10 to w-12 h-12 === */}
      <img src={ProfileImage} alt="User Avatar" className="w-17 h-14 rounded" />
      <div>
        <p className="text-sm font-semibold">My Account</p>
      </div>
    </div>
  </div>
);

const DashboardContent = () => (
  <div className="flex-1 p-8 bg-gray-100">
    <header>
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <p className="text-gray-500">Hi, Jacob</p>
    </header>

    <section className="flex justify-around p-6 mt-8 bg-white rounded-lg shadow-md">
      <CircularProgress value={55} color="green" />
      <CircularProgress value={90} color="orange" />
      <CircularProgress value={40} color="blue" />
    </section>

    <section className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
      <FeatureCard
        icon={<CashFlowIcon className="w-8 h-8" />}
        title="Cashflow"
      />
      <FeatureCard
        icon={<BuildTeamIcon className="w-8 h-8" />}
        title="Build Team"
      />
      <FeatureCard
        icon={<BusinessGrowthIcon className="w-8 h-8" />}
        title="Business Growth"
      />
    </section>

    <section className="p-6 mt-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-600">Ladder to Exit</span>
        <span className="font-bold text-gray-800">66%</span>
      </div>
      <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "66%" }}
        ></div>
      </div>
    </section>

    <section className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
      <GridCard
        icon={<SettingsIcon className="w-10 h-10 text-white" />}
        bgColor={`bg-pink-500`}
      />
      <GridCard
        icon={<ConnectIcon className="w-10 h-10 text-white" />}
        bgColor="bg-orange-400"
      />
      <GridCard
        icon={<BuildIcon className="w-10 h-10 text-white" />}
        bgColor="bg-lime-500"
      />
      <GridCard
        icon={<CollaborateIcon className="w-10 h-10 text-white" />}
        bgColor="bg-blue-500"
      />
      <GridCard
        icon={<TradeIcon className="w-10 h-10 text-white" />}
        bgColor="bg-yellow-400"
      />
      <GridCard
        icon={<NetworkIcon className="w-10 h-10 text-white" />}
        bgColor="bg-cyan-400"
      />
    </section>
  </div>
);

export default function HeroAnimation() {
  return (
    // This outer div centers the entire dashboard component on the page
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div
        className="flex w-full overflow-hidden bg-white rounded-lg shadow-2xl"
        style={{ maxWidth: "1200px" }}
      >
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
}

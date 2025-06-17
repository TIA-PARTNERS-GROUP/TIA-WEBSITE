// --- User's Icon Imports ---
// Using the icon components you provided
import DashboardIcon from "../../components/Icons/DashboardIcon";
import SettingsIcon from "../../components/Icons/SettingsIcon";
import ConnectIcon from "../../components/Icons/ConnectIcon"; // Note: I've used ConnectIcon as the name to match the UI label
import BuildIcon from "../../components/Icons/BuildIcon";
import CollaborateIcon from "../../components/Icons/CollaborateIcon";
import NetworkIcon from "../../components/Icons/NetworkIcon";
import TradeIcon from "../../components/Icons/TradeIcon";

// --- Remaining Placeholder Icons ---
// These icons were not in your import list and are still placeholders.
// You can create these components and import them just like the ones above.
const Icon = ({ children, className }) => (
  <div className={`w-6 h-6 ${className}`}>{children}</div>
);
const ManageIcon = (props) => (
  <Icon {...props}>
    {" "}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
      />
    </svg>{" "}
  </Icon>
);
const CashflowIcon = (props) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v.75A.75.75 0 014.5 8.25h-.75m0 0H3.75A.75.75 0 013 7.5v-.75m6 12l-3-3m0 0l-3 3m3-3v12.75m0-12.75L12 9.75M12 9.75L9.75 12m0 0L12 14.25m4.5-4.5l3 3m0 0l3-3m-3 3V1.5m0 12.75L18 9.75m0 0L16.5 12m0 0L18 14.25"
      />
    </svg>
  </Icon>
);
const BuildTeamIcon = (props) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-.063.996-.594.996-1.185a2.25 2.25 0 00-4.5 0c0 .59.426 1.122.996 1.185m-7.5 2.962c.57-.063.996-.594.996-1.185a2.25 2.25 0 00-4.5 0c0 .59.426 1.122.996 1.185m16.5-5.85a2.25 2.25 0 00-4.5 0c0 .59.426 1.122.996 1.185m-7.5 2.962c.57-.063.996-.594.996-1.185a2.25 2.25 0 00-4.5 0c0 .59.426 1.122.996 1.185"
      />
    </svg>
  </Icon>
);
const BusinessGrowthIcon = (props) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    </svg>
  </Icon>
);
const ShareIcon = (props) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.05.588.08m0 0a2.25 2.25 0 11-3.182 0m3.182 0l-2.618 1.83m2.618-1.83l2.618 1.83m-5.236 5.236a2.25 2.25 0 11-3.182 0m3.182 0c.195-.025.39-.05.588-.08m0 0l-2.618-1.83m2.618 1.83l2.618-1.83"
      />
    </svg>
  </Icon>
);
const JusticeIcon = (props) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.818-5.62-2.247m0 0a5.988 5.988 0 01-2.036-.243c-.483-.174-.711-.703-.59-1.202L9 4.971m-3.001-.094c-.99.203-1.99.377-3 .52M6 4.877l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.036.243c-2.132 0-4.14-.818-5.62-2.247m0 0l5.62-5.62m0 0l5.62 5.62"
      />
    </svg>
  </Icon>
);

// --- Reusable Components (That use the icons) ---

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

// --- Main Component Structure ---

const Sidebar = () => (
  <div className="flex flex-col w-64 p-6 bg-gray-800 text-white">
    <div className="flex items-center mb-10">
      <div className="p-2 mr-3 font-bold text-black bg-white rounded-md">
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
    <div className="flex items-center p-2 mt-auto space-x-3 cursor-pointer">
      <img
        src="https://i.pravatar.cc/40?u=jacob"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
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
        icon={<CashflowIcon className="w-8 h-8" />}
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
        bgColor="bg-pink-500"
      />
      <GridCard
        icon={<CollaborateIcon className="w-10 h-10 text-white" />}
        bgColor="bg-orange-400"
      />
      <GridCard
        icon={<BuildIcon className="w-10 h-10 text-white" />}
        bgColor="bg-lime-500"
      />
      <GridCard
        icon={<ShareIcon className="w-10 h-10 text-white" />}
        bgColor="bg-blue-500"
      />
      <GridCard
        icon={<JusticeIcon className="w-10 h-10 text-white" />}
        bgColor="bg-yellow-400"
      />
      <GridCard
        icon={<NetworkIcon className="w-10 h-10 text-white" />}
        bgColor="bg-cyan-400"
      />
    </section>
  </div>
);

// --- The Main Exported Component ---

export default function HeroAnimation() {
  return (
    <div className="min-h-screen p-4 bg-gray-200 font-sans">
      <h1 className="mb-4 text-xl font-semibold text-gray-500">
        Hero Animation
      </h1>
      <div
        className="flex mx-auto overflow-hidden bg-white rounded-lg shadow-2xl"
        style={{ maxWidth: "1200px" }}
      >
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// --- Icon and Image Imports (no changes) ---
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

const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration: 1.5,
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.round(latest);
          }
        },
      });
    }
  }, [isInView, value]);

  return <span ref={ref}>{value}</span>;
};

const CircularProgress = ({ value, color }) => {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - value) * circ) / 100;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const colorClasses = {
    green: "text-green-500",
    orange: "text-orange-500",
    blue: "text-blue-500",
  };

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center w-32 h-32"
    >
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
        <motion.circle
          className={`${colorClasses[color]}`}
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={r}
          cx="60"
          cy="60"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: isInView ? strokePct : circ }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />
      </svg>
      <span className={`absolute text-3xl font-bold ${colorClasses[color]}`}>
        <AnimatedCounter value={value} />
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
  <motion.div
    className="flex flex-col items-center justify-center p-6 text-white bg-gray-700 rounded-lg shadow-md"
    variants={itemVariants}
    animate={{
      scale: [1, 1.04, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeInOut",
      },
    }}
  >
    {icon}
    <span className="mt-2 text-sm font-semibold">{title}</span>
  </motion.div>
);

const GridCard = ({ icon, bgColor }) => (
  <motion.div
    className={`flex items-center justify-center p-8 rounded-lg shadow-md ${bgColor}`}
    variants={itemVariants}
    animate={{
      scale: [1, 1.04, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay: Math.random() * 3,
        ease: "easeInOut",
      },
    }}
  >
    {icon}
  </motion.div>
);

// === MODIFIED: Restored the navigation links inside the sidebar ===
const Sidebar = () => (
  <motion.div
    className="flex flex-col w-64 p-6 bg-hero_portal-side_bar text-white"
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
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
      <img src={ProfileImage} alt="User Avatar" className="w-12 h-12 rounded" />
      <div>
        <p className="text-sm font-semibold">My Account</p>
      </div>
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// === MODIFIED: Removed 'overflow-y-auto' to prevent inner scrollbar ===
const DashboardContent = () => {
  const progressBarRef = useRef(null);
  const isProgressBarInView = useInView(progressBarRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Hi, Jacob</p>
      </motion.header>

      <motion.section
        className="flex flex-wrap justify-around p-6 mt-8 bg-white rounded-lg shadow-md gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <CircularProgress value={55} color="green" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CircularProgress value={90} color="orange" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CircularProgress value={40} color="blue" />
        </motion.div>
      </motion.section>

      <motion.section
        className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
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
      </motion.section>

      <motion.section
        ref={progressBarRef}
        className="p-6 mt-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isProgressBarInView ? 1 : 0,
          y: isProgressBarInView ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-600">Ladder to Exit</span>
          <span className="font-bold text-gray-800">66%</span>
        </div>
        <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: isProgressBarInView ? "66%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
        </div>
      </motion.section>

      <motion.section
        className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
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
      </motion.section>
    </div>
  );
};

// === MODIFIED: Removed fixed height to allow content to define height ===
export default function HeroAnimation() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
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

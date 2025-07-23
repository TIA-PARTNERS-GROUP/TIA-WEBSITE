// Re-import everything as before
import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

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
  // Use a smaller base radius for smaller container sizes
  const r = 40; // Smaller base radius
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
    // Responsive sizing based on parent container width
    <div
      ref={ref}
      // Default small, then larger for @md (container medium size)
      className="relative flex items-center justify-center w-24 h-24 @md:w-32 @md:h-32"
    >
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {" "}
        {/* viewBox helps scale SVG content */}
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
      {/* Responsive font size for the counter */}
      <span
        className={`absolute text-2xl @md:text-3xl font-bold ${colorClasses[color]}`}
      >
        <AnimatedCounter value={value} />
      </span>
    </div>
  );
};

const NavItem = ({ icon, label }) => (
  // Responsive padding, spacing, and font size for nav items
  <li className="flex items-center p-1.5 @md:p-2 space-x-2 @md:space-x-3 text-gray-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white text-sm @md:text-base">
    {icon}
    <span>{label}</span>
  </li>
);

const FeatureCard = ({ icon, title }) => (
  <motion.div
    // Responsive padding and text size
    className="flex flex-col items-center justify-center p-4 @md:p-6 text-white bg-gray-700 rounded-lg shadow-md"
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
    {/* Responsive font size */}
    <span className="mt-1 @md:mt-2 text-xs @md:text-sm font-semibold">
      {title}
    </span>
  </motion.div>
);

const GridCard = ({ icon, bgColor }) => (
  <motion.div
    // Responsive padding
    className={`flex items-center justify-center p-6 @md:p-8 rounded-lg shadow-md ${bgColor}`}
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

const Sidebar = () => (
  <motion.div
    // Responsive width and padding based on container size
    className="flex flex-col w-48 @md:w-64 p-4 @md:p-6 bg-hero_portal-side_bar text-white"
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="flex space-x-2 mb-6 @md:mb-8">
      <div className="w-2.5 h-2.5 @md:w-3 @md:h-3 bg-red-500 rounded-full cursor-pointer"></div>
      <div className="w-2.5 h-2.5 @md:w-3 @md:h-3 bg-yellow-400 rounded-full cursor-pointer"></div>
      <div className="w-2.5 h-2.5 @md:w-3 @md:h-3 bg-green-500 rounded-full cursor-pointer"></div>
    </div>
    <div className="flex justify-center items-center mb-8 @md:mb-10">
      {/* Responsive font size for TIA */}
      <div className="text-2xl @md:text-3xl p-1.5 @md:p-2 font-extrabold text-text-light italic">
        TIA
      </div>
    </div>
    <nav>
      <ul>
        {/* Responsive icon sizes for NavItem */}
        <NavItem
          icon={<DashboardIcon className="w-4 h-4 @md:w-5 @md:h-5" />}
          label="Dashboard"
        />
        <NavItem
          icon={<ManageIcon className="w-4 h-4 @md:w-5 @md:h-5" />}
          label="Manage"
        />
        <NavItem
          icon={<ConnectIcon className="w-4 h-4 @md:w-5 @md:h-5" />}
          label="Connect"
        />
        <NavItem
          icon={<BuildIcon className="w-4 h-4 @md:w-5 @md:h-5" />}
          label="Build"
        />
        <NavItem
          icon={<CollaborateIcon className="w-4 h-4 @md:w-5 @md:h-5" />}
          label="Collaborate"
        />
        <NavItem
          icon={<NetworkIcon className="w-4 h-4 @md:w-5 @md:h-5" />}
          label="Network"
        />
        <NavItem
          icon={<TradeIcon className="w-4 h-4 @md:w-5 @md:h-5" />}
          label="Trade"
        />
      </ul>
    </nav>
    <div className="flex items-center p-0 mt-auto space-x-3 @md:space-x-5 cursor-pointer">
      {/* Responsive profile image size and font size */}
      <img
        src={ProfileImage}
        alt="User Avatar"
        className="w-10 h-10 @md:w-12 @md:h-12 rounded"
      />
      <div>
        <p className="text-xs @md:text-sm font-semibold">My Account</p>
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

const DashboardContent = () => {
  const progressBarRef = useRef(null);
  const isProgressBarInView = useInView(progressBarRef, {
    once: true,
    amount: 0.5,
  });

  return (
    // Responsive overall padding
    <div className="flex-1 p-6 @md:p-8 bg-gray-100">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Responsive font sizes for header */}
        <h2 className="text-2xl @md:text-3xl font-bold text-gray-800">
          Dashboard
        </h2>
        <p className="text-sm @md:text-base text-gray-500">Hi, Jacob</p>
      </motion.header>

      <motion.section
        // Responsive padding, margin-top, and gap
        className="flex flex-wrap justify-around p-4 @md:p-6 mt-6 @md:mt-8 bg-white rounded-lg shadow-md gap-3 @md:gap-4"
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
        // Responsive gap and margin-top, and grid columns based on container width
        className="grid grid-cols-3 gap-4 @md:gap-6 mt-6 @md:mt-8 @md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Responsive icon sizes for FeatureCard */}
        <FeatureCard
          icon={<CashFlowIcon className="w-6 h-6 @md:w-8 @md:h-8" />}
          title="Cashflow"
        />
        <FeatureCard
          icon={<BuildTeamIcon className="w-6 h-6 @md:w-8 @md:h-8" />}
          title="Build Team"
        />
        <FeatureCard
          icon={<BusinessGrowthIcon className="w-6 h-6 @md:w-8 @md:h-8" />}
          title="Business Growth"
        />
      </motion.section>

      <motion.section
        ref={progressBarRef}
        // Responsive padding and margin-top
        className="p-4 @md:p-6 mt-6 @md:mt-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isProgressBarInView ? 1 : 0,
          y: isProgressBarInView ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          {/* Responsive font sizes */}
          <span className="text-sm @md:text-base font-semibold text-gray-600">
            Ladder to Exit
          </span>
          <span className="text-base @md:text-lg font-bold text-gray-800">
            66%
          </span>
        </div>
        <div className="w-full mt-1.5 @md:mt-2 bg-gray-200 rounded-full h-2 @md:h-2.5">
          {/* Responsive height */}
          <motion.div
            className="bg-blue-600 h-2 @md:h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: isProgressBarInView ? "66%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
        </div>
      </motion.section>

      <motion.section
        // Responsive gap and margin-top, and grid columns
        className="grid grid-cols-3 gap-4 @md:gap-6 mt-6 @md:mt-8 @sm:grid-cols-2 @lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Responsive icon sizes for GridCard */}
        <GridCard
          icon={
            <SettingsIcon className="w-8 h-8 @md:w-10 @md:h-10 text-white" />
          }
          bgColor={`bg-pink-500`}
        />
        <GridCard
          icon={
            <ConnectIcon className="w-8 h-8 @md:w-10 @md:h-10 text-white" />
          }
          bgColor="bg-orange-400"
        />
        <GridCard
          icon={<BuildIcon className="w-8 h-8 @md:w-10 @md:h-10 text-white" />}
          bgColor="bg-lime-500"
        />
        <GridCard
          icon={
            <CollaborateIcon className="w-8 h-8 @md:w-10 @md:h-10 text-white" />
          }
          bgColor="bg-blue-500"
        />
        <GridCard
          icon={<TradeIcon className="w-8 h-8 @md:w-10 @md:h-10 text-white" />}
          bgColor="bg-yellow-400"
        />
        <GridCard
          icon={
            <NetworkIcon className="w-8 h-8 @md:w-10 @md:h-10 text-white" />
          }
          bgColor="bg-cyan-400"
        />
      </motion.section>
    </div>
  );
};

// HeroAnimation component (main wrapper)
export default function HeroAnimation() {
  return (
    <div
      className="flex w-full overflow-hidden bg-white rounded-lg shadow-2xl mx-auto my-8
                 container" // <-- Marked as a container
      style={{
        maxWidth: "1100px", // The max size this container can be
        maxHeight: "650px",
        minWidth: "320px", // Smallest size you want the container to be
        minHeight: "100px",
      }}
    >
      <Sidebar />
      <DashboardContent />
    </div>
  );
}

import { motion } from "framer-motion";

import CashFlowIcon from "../../../components/Icons/CurrencyIcon";
import BuildTeamIcon from "../../../components/Icons/TeamBuildingIcon";
import BusinessGrowthIcon from "../../../components/Icons/TrendingUpIcon";

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

const FeatureCard = ({ icon, title }) => (
  <motion.div
    className="flex flex-col items-center justify-center p-4 @md:p-6 text-white bg-gradient-to-r from-violet-600 to-violet-600 hover:from-violet-600 hover:to-blue-500 rounded-lg shadow-md cursor-pointer"
    variants={itemVariants}
    animate={{
      scale: [1, 1.01, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeInOut",
      },
    }}
  >
    {icon}
    <span className="mt-1 md:mt-2 text-center text-xs md:text-xs font-semibold">
      {title}
    </span>
  </motion.div>
);

const FocusTab = () => (
  <div className="container mx-auto flex flex-col items-start text-left">
    <h2 className="sm:text-sm 2xl:text-lg font-semibold">What do you need help with?</h2>
    <motion.section
        className="grid grid-cols-3 sm:gap-5 2xl:gap-8 mt-6 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeatureCard
          icon={<CashFlowIcon className="sm:w-4 sm:h-4 w-6 h-6 @md:w-8 @md:h-8" />}
          title="Cashflow"
        />
        <FeatureCard
          icon={<BuildTeamIcon className="sm:w-4 sm:h-4 w-6 h-6 @md:w-8 @md:h-8" />}
          title="Build Team"
        />
        <FeatureCard
          icon={<BusinessGrowthIcon className="sm:w-4 sm:h-4 w-6 h-6 @md:w-8 @md:h-8" />}
          title="Business Growth"
        />
      </motion.section>
  </div>
)

export default FocusTab;


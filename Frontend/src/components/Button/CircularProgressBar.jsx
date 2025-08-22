import { motion } from "framer-motion";

const CircularProgressBar = ({ progress = 75, size = 120, strokeWidth = 10}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ duration: 1.5, ease: "easeInOut" }} className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          initial={{strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-rose-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-lg font-semibold text-rose-500">
        {progress}%
      </span>
    </motion.div>
  );
};

export default CircularProgressBar;
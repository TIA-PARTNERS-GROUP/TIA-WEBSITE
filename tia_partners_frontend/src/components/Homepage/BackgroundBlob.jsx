import { motion } from "framer-motion";

const BackgroundBlob = ({ className }) => {
  return (
    <motion.div
      className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 20, -20, 0],
        y: [0, -20, 20, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default BackgroundBlob;

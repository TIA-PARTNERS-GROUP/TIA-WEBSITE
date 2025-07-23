import { motion, useInView, animate } from "framer-motion";
import SecondaryButton from "../../Button/SecondaryButton";

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

const FeatureCard = ({ description }) => (
  <motion.div
    className="w-full p-4 @md:p-6 text-black hover:bg-gray-200 rounded-lg cursor-pointer"
    variants={itemVariants}
  >
    <span className="mt-1 @md:mt-2 text-md @md:text-md font-semibold">
      - {description}
    </span>
  </motion.div>
);

const NextAction = ({ actionData }) => (
  <div className="container text-left gap-2">
    <h2 className="pt-1 pb-4 text-2xl @md:text-3xl font-bold text-black-800">Next Action</h2>
    <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}>
          <div className="flex flex-col w-full text-left">
            {actionData.map((action, index) => (
                <FeatureCard key={index} description={action.description} />
            ))}
          </div>
    </motion.section>
    <SecondaryButton
            className="text-sm block text-center py-0.5 mt-2 max-w-[185px]"
            >
            + Add new task
        </SecondaryButton>
  </div>
)

export default NextAction;
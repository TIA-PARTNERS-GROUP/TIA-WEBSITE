import { motion } from "framer-motion";
import CircularProgressBar from "../../Button/CircularProgressBar";

const DailyActivities = ({overallProgress, barData}) => (
  <div className="flex flex-col items-start pb-4 text-left gap-10">
    <div className="flex items-center gap-3 w-full">
      <h2 className="pt-1 sm:text-sm md:text-lg 2xl:text-xl font-bold text-black-800">Daily Activities</h2>
      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mt-2">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${overallProgress}%` }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${overallProgress}%` }}
        ></motion.div>
      </div>
        <p className="text-right sm:invisible lg:visible sm:text-xs text-sm text-gray-500 mt-1">
          {overallProgress}% complete
        </p>
    </div>
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 w-full">
        {barData.map((bar, index) => (
            <div key={index} className="flex flex-col items-center gap-2"> 
                <CircularProgressBar progress={bar.progress} size={100}/>
                <motion.p initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ duration: 1.5, ease: "easeInOut" }} className="sm:text-xs 2xl:text-sm text-center mt-2">{bar.description}</motion.p>
            </div>
        ))}
    </div>
  </div>
)

export default DailyActivities;
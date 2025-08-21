import CircularProgressBar from "../../Button/CircularProgressBar";

const DailyActivities = ({overallProgress, barData}) => (
  <div className="flex flex-col items-start pb-4 text-left gap-10">
    <div className="flex items-center gap-3 w-full">
      <h2 className="pt-1 text-2xl @md:text-3xl font-bold text-black-800">Daily Activities</h2>
      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mt-2">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
        <p className="text-right text-sm text-gray-500 mt-1">
          {overallProgress}% complete
        </p>
    </div>
    <div className="grid grid-cols-3 gap-8 w-full">
        {barData.map((bar, index) => (
            <div key={index} className="flex flex-col items-center gap-2"> 
                <CircularProgressBar progress={bar.progress} size={100} />
                <p className="text-sm text-center mt-2">{bar.description}</p>
            </div>
        ))}
    </div>
  </div>
)

export default DailyActivities;
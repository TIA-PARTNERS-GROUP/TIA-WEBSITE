import SecondaryButton from "../../Button/SecondaryButton";

const GoalTracker = ({ goalData }) => (
  <div className="container text-left gap-2">
    <h2 className="pt-1 pb-4 sm:text-sm md:text-lg 2xl:text-xl font-bold text-black-800">Goal Tracker</h2>
        {goalData.map((goal, index) => (  
          <div key={index} className="lg:py-4 2xl:py-2">
            <div className="grid sm:grid-cols-1 xl:grid-cols-3 grid-cols-3 xl:grid-cols-[2fr_2fr_0.1fr] grid-cols-[3fr_2fr_0.1fr] lg:gap-2 gap-4 w-full text-center">
              <p className="relative -top-2 text-left sm:text-xs 2xl:text-sm">{goal.description}</p>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-rose-500 h-2.5 rounded-full" 
                  style={{ width: `${goal.progress}%` }} // Width based on progress
                ></div>
              </div>
              <p className="relative -top-2 text-right text-sm text-gray-500 mt-1">
                {goal.progress}%
              </p>
            </div>
          </div>
        ))}
    <SecondaryButton
            className="sm:text-xs sm:px-2 sm:py-3 text-sm block text-center py-0.5 mt-2 max-w-[215px]"
            >
            + Add new tracker
    </SecondaryButton>
  </div>
)

export default GoalTracker;
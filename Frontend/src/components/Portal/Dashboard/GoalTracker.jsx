import SecondaryButton from "../../Button/SecondaryButton";

const GoalTracker = () => (
  <div className="flex flex-col items-start pb-4 text-left gap-2">
    <h2 className="pt-1 text-2xl @md:text-xl font-bold text-black-800">Goal Tracker</h2>
    <SecondaryButton
            className="text-sm block text-center py-0.5 mt-2 max-w-[200px]"
            >
            Add new tracker
        </SecondaryButton>
  </div>
)

export default GoalTracker;
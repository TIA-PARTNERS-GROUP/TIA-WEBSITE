import SecondaryButton from "../../Button/SecondaryButton";

const NextAction = () => (
  <div className="flex flex-col items-start pb-4 text-left gap-2">
    <h2 className="pt-1 text-2xl @md:text-3xl font-bold text-black-800">Next Action</h2>
    <SecondaryButton
            className="text-sm block text-center py-0.5 mt-2 max-w-[160px]"
            >
            Add new task
        </SecondaryButton>
  </div>
)

export default NextAction;
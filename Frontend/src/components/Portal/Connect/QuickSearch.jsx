import ConnectionsGrid from "../../../components/Portal/Connect/ConnectionsGrid";

const connectionsData = [
  {title: "DexRouter Ltd.", description: "Here at DexRouter, we manufacture and distribute cutting-edge router products."},
  {title: "Jim's Cabling", description: "Providing all of your cabling needs!"},
  {title: "Westmine Solutions", description: "Westmine Solutions is a bustling startup focusing on providing high-quality web development solutions."},
  {title: "AccuT", description: "Fast, reliable, and always on time."}
]

const QuickSearch = () => (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <h2 className="text-3xl font-semibold">Quick Search</h2>
    <p className="pt-2 pb-20 text-md">Manually search for connections:</p>
    <ConnectionsGrid connectionsData={connectionsData}/>
  </div>
)

export default QuickSearch;
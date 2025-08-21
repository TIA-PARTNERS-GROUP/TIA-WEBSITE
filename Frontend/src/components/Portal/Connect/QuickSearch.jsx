import { useSearchParams } from "react-router-dom";
import ConnectionsGrid from "../../../components/Portal/Connect/ConnectionsGrid";
import SearchBar from "./SearchBar";

const connectionsData = [
    {
        title: "DexRouter Ltd.", 
        description: "Here at DexRouter, we manufacture and distribute cutting-edge router products.", 
        whatwedoData: [
            {description: "Router Manufacturing"}
        ],
        contactInfo: ["Tim Matters", "0123 456 789", "tim@dexrouter.com.au"]
    },
    {
        title: "Jim's Cabling", 
        description: "Providing all of your cabling needs!",
        whatwedoData: [
            {description: "Cabling Installation"}
        ],
        contactInfo: ["Jim Bean", "0123 456 789", "jim@jimscabling.com.au"]
    },
    {
        title: "Westmine Solutions", 
        description: "Westmine Solutions is a bustling startup focusing on providing high-quality web development solutions.",
        whatwedoData: [
            {description: "Website creation"},
            {description: "Custom LLM creation"}
        ],
        contactInfo: ["Anton Kirkegard", "0123 456 789", "anton@dwestminesolutions.com.au"]
    },
    {
        title: "AccuT", 
        description: "Fast, reliable, and always on time.",
        whatwedoData: [
            {description: "Package Delivery"}
        ],
        contactInfo: ["Franz Kafka", "0123 456 789", "franz@accut.com.au"]
    }
];

const QuickSearch = () => {

  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('q') || null;

  return (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <h2 className="text-3xl font-semibold">Quick Search</h2>
    <p className="pt-2 pb-10 text-md">Manually search for connections:</p>
    <SearchBar />
    <ConnectionsGrid queryValue={queryValue} connectionsData={connectionsData}/>
  </div>
)}

export default QuickSearch;
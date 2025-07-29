import ConnectionsGrid from "../Connect/ConnectionsGrid";

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

const GridView = () => {
  return (
    <div className="bg-white rounded-xl px-8 py-2">
        <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800">Connections</h2>
        <p className="py-8 text-lg">You are currently connected to these companies:</p>
        <ConnectionsGrid connectionsData={connectionsData} connectionModule={true}/>
    </div>
  );
};

export default GridView;
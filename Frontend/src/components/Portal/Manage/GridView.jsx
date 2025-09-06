import { useEffect, useState } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getCurrentBusinessInfo, getOtherBusinessInfo } from "../../../api/business";
import ConnectionsGrid from "../Connect/ConnectionsGrid";


/*const connectionsData = [
    {
        title: "DexRouter Ltd.", 
        contactInfo: ["Tim Matters", "0123 456 789", "tim@dexrouter.com.au"],
        description: "Here at DexRouter, we manufacture and distribute cutting-edge router products.", 
        whatwedoData: [
            {description: "Router Manufacturing"}
        ]
    },
    {
        title: "Jim's Cabling", 
        contactInfo: ["Jim Bean", "0123 456 789", "jim@jimscabling.com.au"],
        description: "Providing all of your cabling needs!",
        whatwedoData: [
            {description: "Cabling Installation"}
        ]
    },
    {
        title: "Westmine Solutions", 
        contactInfo: ["Anton Kirkegard", "0123 456 789", "anton@dwestminesolutions.com.au"],
        description: "Westmine Solutions is a bustling startup focusing on providing high-quality web development solutions.",
        whatwedoData: [
            {description: "Website creation"},
            {description: "Custom LLM creation"}
        ]
    },
    {
        title: "AccuT", 
        contactInfo: ["Franz Kafka", "0123 456 789", "franz@accut.com.au"],
        description: "Fast, reliable, and always on time.",
        whatwedoData: [
            {description: "Package Delivery"}
        ]
    }
];*/

const GridView = () => {

  const { startLoading, stopLoading } = useLoading();
  const [ connectionsData, setConnectionsData ] = useState([]);
  const [ selectedIDs, setSelectedIDs ] = useState([]);

  useEffect(() => {

    const fetchConnections = async () => {
        startLoading();
        
        try {
 
        const res = await getCurrentBusinessInfo();
        const connectionIDs = res.data.connections.map(item => item.id);
        

        const connectionPromises = connectionIDs.map(id => 
            getOtherBusinessInfo(id)
            .then(businessRes => ({
                title: businessRes.data.businessName, 
                contactInfo: [businessRes.data.contactName, businessRes.data.contactPhone, businessRes.data.contactEmail],
                description: businessRes.data.businessDescription,
                whatwedoData: businessRes.data.services || [],
                clientData: businessRes.data.clients || [],
                connectionNum: businessRes.data.connections.length || 0
            }))
            .catch(error => {
                console.error(`Error fetching business ${id}:`, error);
                return null;
            })
        );
        
        const connectionsData = await Promise.all(connectionPromises);
        const validConnections = connectionsData.filter(connection => connection !== null);
        setConnectionsData(validConnections);
        
        } catch (error) {
        console.error('Error fetching connections:', error);
        } finally {
        stopLoading();
        }
    };

    fetchConnections();
  }, [])

  return (
    <div className="bg-white rounded-xl sm:px-6 lg:px-6 2xl:px-8 py-2">
        <h2 className="lg:pl-4 2xl:pl-10 pt-10 sm:text-xl 2xl:text-4xl md:text-2xl font-semibold text-black-800">Connections</h2>
        <p className="lg:pl-4 2xl:pl-10 py-8 sm:text-xs 2xl:text-lg">You are currently connected to these companies:</p>
        <ConnectionsGrid connectionsData={connectionsData} connectionModule={true} />
    </div>
  );
};

export default GridView;
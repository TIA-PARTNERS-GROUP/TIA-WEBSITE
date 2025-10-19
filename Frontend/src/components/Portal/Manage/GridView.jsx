import { useEffect, useState } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getCurrentBusinessInfo, getOtherBusinessInfo } from "../../../api/business";
import ConnectionsGrid from "../Connect/ConnectionsGrid";

const GridView = () => {

  const { startLoading, stopLoading } = useLoading();
  const [ connectionsData, setConnectionsData ] = useState([]);
  const [ selectedIDs, setSelectedIDs ] = useState([]);

  useEffect(() => {

    const fetchConnections = async () => {
        startLoading();
        
        try {
 
        const res = await getCurrentBusinessInfo();

        const connectionPromises = res.data.connections.map(connection => 
            getOtherBusinessInfo(connection.business_id) 
            .then(businessRes => ({
                connectionId: connection.connection_id,
                businessId: connection.business_id,
                title: businessRes.data.businessName, 
                description: businessRes.data.businessDescription,
                category: businessRes.data.businessCategory,
                connectionTypeId: connection.connection_type_id
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
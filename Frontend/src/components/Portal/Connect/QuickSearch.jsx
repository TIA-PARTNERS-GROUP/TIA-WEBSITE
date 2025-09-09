import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getCurrentBusinessInfo, queryBusinesses } from "../../../api/business";
import ConnectionsGrid from "../../../components/Portal/Connect/ConnectionsGrid";
import SearchBar from "./SearchBar";

const QuickSearch = () => {

  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get('q') || null;

  const { startLoading, stopLoading } = useLoading();
      const [ connectionsData, setConnectionsData ] = useState([]);
  
      useEffect(() => {
  
      const fetchConnections = async () => {
          startLoading(queryValue);
          
          try {   
              const personalDetails = await getCurrentBusinessInfo();
              const personalId = personalDetails.data.id;
              const personalConnections = personalDetails.data.connections.map(connection => ({
                  connection_id: connection.connection_id, 
                  business_id: connection.business_id}));
              const res = await queryBusinesses(1, 10, queryValue); 
              const newConnectionsData = res.data.data.map(businessRes => {
                  const connection = personalConnections.find(conn => conn.business_id === businessRes.id);
                  return {
                      connectionId: connection ? connection.connection_id : null,
                      businessId: businessRes.id,
                      title: businessRes.name,
                      description: businessRes.description
                  }
              });
              
              const filteredData = newConnectionsData.filter(business => business.businessId !== personalId);
              setConnectionsData(filteredData);
              
          
          } catch (error) {
              console.error('Error fetching connections:', error);
          } finally {
              stopLoading();
          }
      };
  
      fetchConnections(queryValue);
      }, [queryValue])

  return (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <h2 className="lg:pl-4 2xl:pl-10 pt-10 sm:text-xl 2xl:text-4xl md:text-2xl font-semibold text-black-800">Quick Search</h2>
    <p className="lg:pl-4 2xl:pl-10 py-8 sm:text-xs 2xl:text-lg">Manually search for connections:</p>
    <SearchBar />
    <ConnectionsGrid queryValue={queryValue} connectionsData={connectionsData}/>
  </div>
)}

export default QuickSearch;
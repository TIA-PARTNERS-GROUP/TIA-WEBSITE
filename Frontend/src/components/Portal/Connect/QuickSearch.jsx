import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getCurrentBusinessInfo, queryBusinesses } from "../../../api/business";
import ConnectionsGrid from "../../../components/Portal/Connect/ConnectionsGrid";
import SearchBar from "./SearchBar";
import PaginationNav from "./PaginationNav";

const QuickSearch = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryValue = searchParams.get('q') || null;
    const categoriesParam = searchParams.get('categories') || '';
    const connectionStatus = searchParams.get('status') || null;
    const sortParam = searchParams.get('sort') || 'name-asc';
    const categories = categoriesParam ? categoriesParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id)) : [];
    const pageFromParams = parseInt(searchParams.get('page')) || 1;

    const { startLoading, stopLoading } = useLoading();
    const [ connectionsData, setConnectionsData ] = useState([]);
    const [currentPage, setCurrentPage] = useState(pageFromParams);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(pageFromParams);
    }, [pageFromParams]);
  
    useEffect(() => {

    const fetchConnections = async () => {
        startLoading(queryValue);
        
        try {   
            const personalDetails = await getCurrentBusinessInfo();
            const personalId = personalDetails.data.id;
            const personalConnections = personalDetails.data.connections.map(connection => ({
                connection_id: connection.connection_id, 
                business_id: connection.business_id
            }));

            const categoriesString = categories.length > 0 ? categories.join(',') : null;
            const res = await queryBusinesses(currentPage, itemsPerPage, queryValue, categoriesString); 
            const newConnectionsData = res.data.data.map(businessRes => {
                const connection = personalConnections.find(conn => conn.business_id === businessRes.id);
                return {
                    connectionId: connection ? connection.connection_id : null,
                    businessId: businessRes.id,
                    title: businessRes.name,
                    description: businessRes.description,
                    category: businessRes.category_name,
                    contactName: businessRes.contact_name
                }
            });
            
            let filteredData = newConnectionsData.filter(business => business.businessId !== personalId);

            if (connectionStatus) {
                const status = connectionStatus.toLowerCase();
                if (status === 'connected') {
                    filteredData = filteredData.filter(business => business.connectionId !== null);
                } else if (status === 'not-connected') {
                    filteredData = filteredData.filter(business => business.connectionId === null);
                }
            }

            if (sortParam === 'name-asc') {
                    filteredData.sort((a, b) => a.title.localeCompare(b.title));
                } else if (sortParam === 'name-desc') {
                    filteredData.sort((a, b) => b.title.localeCompare(a.title));
            }

            setConnectionsData(filteredData);

            setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
            setTotalItems(filteredData.length);
        
        } catch (error) {
            console.error('Error fetching connections:', error);
        } finally {
            stopLoading();
        }
    };

    fetchConnections(queryValue);
    }, [queryValue, categoriesParam, connectionStatus, sortParam, currentPage])

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
        setCurrentPage(newPage);
        
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', newPage.toString());
        navigate({ search: newSearchParams.toString() });
        }
    };

  return (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <h2 className="lg:pl-4 2xl:pl-10 pt-10 sm:text-xl 2xl:text-4xl md:text-2xl font-semibold text-black-800">Quick Search</h2>
    <p className="lg:pl-4 2xl:pl-10 py-8 sm:text-xs 2xl:text-lg">Manually search for connections:</p>
    <SearchBar />
    <ConnectionsGrid queryValue={queryValue} connectionsData={connectionsData}/>
    <PaginationNav
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
    />
  </div>
)}

export default QuickSearch;
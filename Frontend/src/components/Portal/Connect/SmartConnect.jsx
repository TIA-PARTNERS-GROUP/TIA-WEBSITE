import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getCurrentBusinessInfo, queryBusinesses } from "../../../api/business";
import ConnectionsGrid from "../../../components/Portal/Connect/ConnectionsGrid";
import PaginationNav from "./PaginationNav";
import PrimaryButton from "../../Button/PrimaryButton";

const SmartConnect = ({ partnerType }) => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const pageFromParams = parseInt(searchParams.get('page')) || 1;

    const { startLoading, stopLoading } = useLoading();
    const [ connectionsData, setConnectionsData ] = useState([]);
    const [currentPage, setCurrentPage] = useState(pageFromParams);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {

    const fetchConnections = async () => {
        startLoading();
        
        try {   
            const personalDetails = await getCurrentBusinessInfo();
            const personalId = personalDetails.data.id;
            const personalConnections = personalDetails.data.connections.map(connection => ({
                connection_id: connection.connection_id, 
                business_id: connection.business_id}));
            const res = await queryBusinesses(1, 10); 
            const newConnectionsData = res.data.data.map(businessRes => {
                const connection = personalConnections.find(conn => conn.business_id === businessRes.id);
                return {
                    connectionId: connection ? connection.connection_id : null,
                    businessId: businessRes.id,
                    title: businessRes.name,
                    description: businessRes.description,
                    category: businessRes.category_name
                }
            });
            
            const filteredData = newConnectionsData.filter(business => business.businessId !== personalId);
            setConnectionsData(filteredData);

            setTotalPages(res.data.pagination.totalPages);
            setTotalItems(res.data.pagination.totalItems - 1);
        
        } catch (error) {
            console.error('Error fetching connections:', error);
        } finally {
            stopLoading();
        }
    };

    fetchConnections();
    }, [])

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
            <h2 className="lg:pl-4 2xl:pl-10 pt-10 pb-10 sm:text-xl 2xl:text-4xl md:text-2xl font-semibold text-black-800">SmartConnect</h2>
            <div className="lg:pl-4 2xl:pl-10 py-4 sm:text-xs 2xl:text-lg">
                <PrimaryButton onClick={() => navigate(`/chat-llm/${partnerType}`)}>Chat with SmartConnect Agent</PrimaryButton>
            </div>
            <p className="lg:pl-4 2xl:pl-10 py-8 sm:text-xs 2xl:text-lg">Our SmartConnect system has recommended the following connections based on your profile:</p>
            <ConnectionsGrid connectionsData={connectionsData}/>
            <PaginationNav
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
)}

export default SmartConnect;
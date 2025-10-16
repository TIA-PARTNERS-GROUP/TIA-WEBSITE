import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getComplementaryPartners, getAlliancePartners, getMastermindPartners } from "../../../api/gnn";
import ConnectionsGrid from "../../../components/Portal/Connect/ConnectionsGrid";
import PaginationNav from "./PaginationNav";
import PrimaryButton from "../../Button/PrimaryButton";

const SmartConnect = () => {
  const { partnerType } = useParams();
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const [connectionsData, setConnectionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchConnections = async () => {
      startLoading();

      try {
        let apiFn;

        switch (partnerType?.toLowerCase()) {
          case "complementary":
            apiFn = getComplementaryPartners;
            break;
          case "alliance":
            apiFn = getAlliancePartners;
            break;
          case "mastermind":
            apiFn = getMastermindPartners;
            break;
          default:
            console.error("Invalid partner type:", partnerType);
            stopLoading();
            return;
        }

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout after 2 seconds')), 2000);
        });

        const res = await Promise.race([apiFn(currentPage, itemsPerPage), timeoutPromise]);
        const data = res.data || [];

        // Map the recommendations into connection card format
        const formattedConnections = data.map((item, index) => {
          const user = item.recommendation?.user;
          return {
            businessId: user?.id,
            title: user?.business || user?.name,
            description: user?.description,
            category: user?.category,
            contactName: user?.name,
            contactEmail: null, // not provided in response
            reason: item.reason
          };
        });

        setConnectionsData(formattedConnections);
        setTotalItems(data.length);
        setTotalPages(Math.ceil(data.length / itemsPerPage));

      } catch (error) {
        console.error("Error fetching partner recommendations:", error);
        setConnectionsData([]);
        setTotalItems(0);
        setTotalPages(1);
        setCurrentPage(1);
      } finally {
        stopLoading();
      }
    };

    fetchConnections();
  }, [partnerType, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
      <h2 className="lg:pl-4 2xl:pl-10 pt-10 pb-10 sm:text-xl 2xl:text-4xl md:text-2xl font-semibold text-black-800">
        SmartConnect
      </h2>

      <div className="lg:pl-4 2xl:pl-10 py-4 sm:text-xs 2xl:text-lg">
        <PrimaryButton onClick={() => navigate(`/chat-llm/${partnerType}`)}>
          Chat with SmartConnect Agent
        </PrimaryButton>
      </div>

      <p className="lg:pl-4 2xl:pl-10 py-8 sm:text-xs 2xl:text-lg">
        Our SmartConnect system has recommended the following {partnerType} partners based on your profile:
      </p>

      <ConnectionsGrid connectionsData={connectionsData} />

      <PaginationNav
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SmartConnect;

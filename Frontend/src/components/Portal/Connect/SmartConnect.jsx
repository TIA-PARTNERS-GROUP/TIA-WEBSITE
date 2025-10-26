import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getComplementaryPartners, getAlliancePartners, getMastermindPartners } from "../../../api/gnn";
import { getMyProjects } from "../../../api/projects";
import ConnectionsGrid from "../../../components/Portal/Connect/ConnectionsGrid";
import PaginationNav from "./PaginationNav";
import PrimaryButton from "../../Button/PrimaryButton";
import { getCurrentUserInfo } from "../../../api/user";

const SmartConnect = () => {
  const { partnerType } = useParams();
  const navigate = useNavigate();

  const { startLoading, stopLoading } = useLoading();

  const [connectionsData, setConnectionsData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNoData, setHasNoData] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
  const fetchConnections = async () => {
    startLoading();
    setHasNoData(false);
    setNoDataMessage("");

    try {
      // Step 0: get current user ID
      const userRes = await getCurrentUserInfo();
      const userId = userRes?.data?.data?.id;
      if (!userId) {
        console.error("Could not get current user ID");
        stopLoading();
        return;
      }

      let combinedData = [];
      let isEmpty = false;

      switch (partnerType?.toLowerCase()) {
        case "complementary":
          combinedData = (await getComplementaryPartners(userId))?.data?.partners || [];
            if (combinedData.length === 0) {
              isEmpty = true;
              setNoDataMessage("Can't find any complementary partners");
            }
          break;

        case "alliance":
          const myProjectsRes = await getMyProjects();
          const projects = myProjectsRes?.data?.projects || [];

          if (projects.length === 0) {
            isEmpty = true;
            setNoDataMessage("Can't find any alliance partners - try creating a project first.");
            combinedData = [];
          } else {
            const partnerPromises = projects.map(p =>
              getAlliancePartners(p.id).catch(err => {
                console.error(`Error fetching partners for project ${p.id}:`, err);
                return { data: { partners: [] } };
              })
            );
            const results = await Promise.all(partnerPromises);
            combinedData = results.flatMap(r => r.data?.partners || []);

            if (combinedData.length === 0) {
                isEmpty = true;
                setNoDataMessage("Can't find any alliance partners");
            }
          }
          break;

        case "mastermind":
          combinedData = (await getMastermindPartners(userId))?.data?.partners || [];
          if (combinedData.length === 0) {
            isEmpty = true;
            setNoDataMessage("Can't find any mastermind partners - try filling out the strengths section on your profile.");
          }
          break;

        default:
          console.error("Invalid partner type:", partnerType);
          stopLoading();
          return;
      }

      setHasNoData(isEmpty);

      // If no data, skip the rest of processing
      if (isEmpty) {
        setConnectionsData([]);
        setRecommendations([]);
        setTotalItems(0);
        setTotalPages(1);
        setCurrentPage(1);
        stopLoading();
        return;
      }

      // Deduplicate based on recommendation.user.id
      const uniqueData = [];
      const seen = new Set();
      for (const item of combinedData) {
        const userId = item.recommendation?.user?.id;
        if (userId && !seen.has(userId)) {
          seen.add(userId);
          uniqueData.push(item);
        }
      }

      setRecommendations(combinedData);

      // Format for display
      const formattedConnections = uniqueData.map(item => {

        const user = item.recommendation.user; // safe because of deduplication check
        return {
          businessId: user.id,
          title: user.business || user.name,
          description: user.description || "",
          category: user.category || "",
          contactName: user.name,
          contactEmail: null,
          reason: item.reason || ""
        };
      });

      // Apply pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setConnectionsData(formattedConnections.slice(startIndex, endIndex));
      setTotalItems(formattedConnections.length);
      setTotalPages(Math.ceil(formattedConnections.length / itemsPerPage));

    } catch (error) {
      console.error("Error fetching partner recommendations:", error);
      setConnectionsData([]);
      setRecommendations([]);
      setTotalItems(0);
      setTotalPages(1);
      setCurrentPage(1);
      setNoDataMessage("Error loading partner recommendations");
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

      {hasNoData ? (
        <div className="lg:pl-4 2xl:pl-10 py-8 sm:text-xs 2xl:text-lg text-gray-600">
          {noDataMessage}
        </div>
      ) : (
        <>
          <ConnectionsGrid 
            connectionsData={connectionsData}
            searchType="smartconnect"
            recommendations={recommendations}
          />

          <PaginationNav
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SmartConnect;
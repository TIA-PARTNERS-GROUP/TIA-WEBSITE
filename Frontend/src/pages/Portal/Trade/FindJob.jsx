import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { queryProjects } from "../../../api/projects";
import ArticleTable from "../../../components/Portal/Manage/ArticleTable";
import SearchBar from "../../../components/Portal/Connect/SearchBar";
import PaginationNav from "../../../components/Portal/Connect/PaginationNav";

const FindJob = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryValue = searchParams.get('q') || null;
    const categoriesParam = searchParams.get('categories') || '';
    const skillsParam = searchParams.get('skills') || '';
    const regionsParam = searchParams.get('regions') || '';
    const statusParam = searchParams.get('status') || null;
    const sortParam = searchParams.get('sort') || 'name-asc';
    
    const categories = categoriesParam ? categoriesParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id)) : [];
    const skills = skillsParam ? skillsParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id)) : [];
    const regions = regionsParam ? regionsParam.split(',').filter(region => region.trim() !== '') : [];
    
    const pageFromParams = parseInt(searchParams.get('page')) || 1;

    const { startLoading, stopLoading } = useLoading();
    const [projectsData, setProjectsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(pageFromParams);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(pageFromParams);
    }, [pageFromParams]);
  
    useEffect(() => {
        const fetchProjects = async () => {
            startLoading(queryValue);
            
            try {   
                const categoriesString = categories.length > 0 ? categories.join(',') : null;
                const skillsString = skills.length > 0 ? skills.join(',') : null;
                const regionsString = regions.length > 0 ? regions.join(',') : null;
                
                const res = await queryProjects(currentPage, itemsPerPage, queryValue, categoriesString, skillsString, regionsString, statusParam);
                
                // Transform API response to match ArticleTable expected format
                const projects = res.data.data.map(project => ({
                    id: project.id,
                    title: project.name,
                    description: project.description,
                    status: project.status,
                    openDate: project.open_date,
                    closeDate: project.close_date,
                    completionDate: project.completion_date,
                    category: project.category_name,
                    skills: project.skills || [],
                    regions: project.regions || [],
                    manager: project.manager_name,
                    createdAt: project.created_at,
                    // Add fields that ArticleTable expects
                    date: project.open_date || project.created_at, // Use open date or created date
                    content: project.description // Use description as content
                }));
                
                let filteredData = projects;

                // Apply status filter if provided
                if (statusParam) {
                    filteredData = filteredData.filter(project => project.status === statusParam);
                }

                // Apply sorting
                if (sortParam === 'name-asc') {
                    filteredData.sort((a, b) => a.title.localeCompare(b.title));
                } else if (sortParam === 'name-desc') {
                    filteredData.sort((a, b) => b.title.localeCompare(a.title));
                } else if (sortParam === 'date-asc') {
                    filteredData.sort((a, b) => new Date(a.openDate) - new Date(b.openDate));
                } else if (sortParam === 'date-desc') {
                    filteredData.sort((a, b) => new Date(b.openDate) - new Date(a.openDate));
                }

                setProjectsData(filteredData);
                setTotalPages(Math.ceil(res.data.pagination?.total / itemsPerPage) || 1);
                setTotalItems(res.data.pagination?.total || filteredData.length);
            
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                stopLoading();
            }
        };

        fetchProjects();
    }, [queryValue, categoriesParam, skillsParam, regionsParam, statusParam, sortParam, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            setCurrentPage(newPage);
            
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('page', newPage.toString());
            navigate({ search: newSearchParams.toString() });
        }
    };

    const handleProjectRowClick = (project) => {
        navigate(`/projects/${project.id}`, {
            state: {
                id: project.id,
                title: project.title,
                description: project.description,
                status: project.status,
                openDate: project.openDate,
                closeDate: project.closeDate,
                completionDate: project.completionDate,
                category: project.category,
                skills: project.skills,
                regions: project.regions
            }
        });
    };

    return (
      <div className="bg-white rounded-xl sm:px-6 lg:px-6 2xl:px-8 py-2">
        <h2 className="pt-10 sm:text-xl 2xl:text-3xl md:text-2xl font-semibold text-black-800 pb-4">Find Project</h2>
        <SearchBar isProjectsRoute={true}/>
         <ArticleTable 
            isTradeRoute={true}
            tableData={projectsData}
            onRowClick={handleProjectRowClick}
            showManagementControls={false}
        />
        
        <PaginationNav
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
        />
      </div>
    )
  };
  
  export default FindJob;
  
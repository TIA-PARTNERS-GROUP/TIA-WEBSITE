import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import { getMyProjects, getAppliedProjects } from "../../../api/projects";
import ArticleTable from "../../../components/Portal/Manage/ArticleTable";
import SearchBar from "../../../components/Portal/Connect/SearchBar";
import PaginationNav from "../../../components/Portal/Connect/PaginationNav";
import { getCategoriesList, getSkillsList } from "../../../api/categories";

const History = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryValue = searchParams.get('q') || null;
    const categoriesParam = searchParams.get('categories') || '';
    const skillsParam = searchParams.get('skills') || '';
    const regionsParam = searchParams.get('regions') || '';
    const statusParam = searchParams.get('status') || null;
    const projectTypeParam = searchParams.get('type') || 'all';
    const sortParam = searchParams.get('sort') || 'date-desc';
    
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

    const [dataRevision, setDataRevision] = useState(0);

    const regionMap = {
        'qld': 'Queensland',
        'nsw': 'New South Wales',
        'vic': 'Victoria',
        'tas': 'Tasmania',
        'sa': 'South Australia',
        'wa': 'Western Australia',
        'nt': 'Northern Territory',
        'act': 'Australian Capital Territory'
    };

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
                
                let myProjects = [];
                let appliedProjects = [];

                if (projectTypeParam === 'all' || projectTypeParam === 'managed') {
                    const myRes = await getMyProjects();
                    myProjects = myRes.data.projects || [];
                }

                if (projectTypeParam === 'all' || projectTypeParam === 'applied') {
                    const appliedRes = await getAppliedProjects();
                    appliedProjects = appliedRes.data.projects || [];
                }

                const allProjects = [...myProjects, ...appliedProjects];
                const uniqueProjects = allProjects.filter((project, index, self) => 
                    index === self.findIndex(p => p.id === project.id)
                );

                const categoriesRes = await getCategoriesList();
                const categoriesMap = categoriesRes.data.categories.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});

                const skillsRes = await getSkillsList();
                const skillsMap = skillsRes.data.skills.reduce((acc, skill) => {
                    acc[skill.id] = skill.name;
                    return acc;
                }, {});

                const projects = uniqueProjects.map(project => ({
                    id: project.id,
                    managed_by_user_id: project.managed_by_user_id,
                    business_id: project.business_id,
                    business_name: project.business_name,
                    title: project.name,
                    description: project.description,
                    status: project.status,
                    openDate: project.open_date,
                    closeDate: project.close_date,
                    completionDate: project.completion_date,
                    category: project.categories && project.categories.length > 0 
                        ? categoriesMap[project.categories[0]] || `Category ${project.categories[0]}`
                        : "N/A",
                    skills: project.skills && project.skills.length > 0 
                        ? skillsMap[project.skills[0]] || `Skill ${project.skills[0]}`
                        : "N/A",
                    skillsDisplay: project.skills && project.skills.length > 0 
                        ? project.skills.map(skillId => skillsMap[skillId] || `Skill ${skillId}`)
                        : ["N/A"],
                    regions: project.regions ? project.regions.map(region => regionMap[region.toLowerCase()] || region) : [],
                    date: project.open_date || project.created_at,
                    content: project.description,
                    projectType: myProjects.some(p => p.id === project.id) ? 'managed' : 'applied',

                    application: project.application || null
                }));

                let filteredData = projects;

                if (statusParam) {
                    filteredData = filteredData.filter(project => project.status === statusParam);
                }

                if (projectTypeParam !== 'all') {
                    filteredData = filteredData.filter(project => project.projectType === projectTypeParam);
                }

                if (queryValue) {
                    filteredData = filteredData.filter(project => 
                        project.title.toLowerCase().includes(queryValue.toLowerCase()) ||
                        project.description.toLowerCase().includes(queryValue.toLowerCase())
                    );
                }

                if (categories.length > 0) {
                    filteredData = filteredData.filter(project => 
                        project.categories && project.categories.some(catId => categories.includes(catId))
                    );
                }

                if (sortParam === 'name-asc') {
                    filteredData.sort((a, b) => a.title.localeCompare(b.title));
                } else if (sortParam === 'name-desc') {
                    filteredData.sort((a, b) => b.title.localeCompare(a.title));
                } else if (sortParam === 'date-asc') {
                    filteredData.sort((a, b) => new Date(a.openDate) - new Date(b.openDate));
                } else if (sortParam === 'date-desc') {
                    filteredData.sort((a, b) => new Date(b.openDate) - new Date(a.openDate));
                } else if (sortParam === 'type') {
                    filteredData.sort((a, b) => a.projectType.localeCompare(b.projectType));
                }

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedData = filteredData.slice(startIndex, endIndex);

                setProjectsData(paginatedData);
                setTotalPages(Math.ceil(filteredData.length / itemsPerPage) || 1);
                setTotalItems(filteredData.length);
            
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                stopLoading();
            }
        };

        fetchProjects();
    }, [queryValue, categoriesParam, skillsParam, regionsParam, statusParam, projectTypeParam, sortParam, currentPage, dataRevision]);

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
                managed_by_user_id: project.managed_by_user_id,
                title: project.title,
                description: project.description,
                status: project.status,
                openDate: project.openDate,
                closeDate: project.closeDate,
                completionDate: project.completionDate,
                category: project.category,
                skills: project.skills,
                regions: project.regions,
                projectType: project.projectType,
                application: project.application
            }
        });
    };

    const handleDeleteProject = (projectId) => {
        console.log('History: Deleting project', projectId);
        setDataRevision(prev => prev + 1);
    };

    const handleProjectEdit = (updatedProject) => {
        setDataRevision(prev => prev + 1);
    };

    return (
      <div className="bg-white rounded-xl sm:px-6 lg:px-6 2xl:px-8 py-2">
        <h2 className="pt-10 sm:text-xl 2xl:text-3xl md:text-2xl font-semibold text-black-800 pb-4">Project History</h2>
        <SearchBar 
            isProjectsRoute={true} 
            isHistoryRoute={true} 
            projectType={projectTypeParam}
        />
         <ArticleTable 
            isTradeRoute={true}
            tableData={projectsData}
            onRowClick={handleProjectRowClick}
            showManagementControls={false}
            onDeleteProject={handleDeleteProject}
            onEditProject={handleProjectEdit}
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
  
  export default History;
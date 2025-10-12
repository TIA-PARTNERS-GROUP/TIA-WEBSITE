import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import { getCurrentUserInfo } from "../../../api/user";
import { deleteProject, getAppliedProjects, updateProject } from "../../../api/projects";
import { addApplicant } from "../../../api/projects";
import { addNotification } from "../../../api/notification";
import { getCategoriesList, getSkillsList } from "../../../api/categories";
import CloseIcon from "../../Icons/CloseIcon";
import EditIcon from "../../Icons/EditIcon";
import ChevronDownIcon from "../../Icons/ChevronDownIcon";
import ChevronUpIcon from "../../Icons/ChevronUpIcon";

const ProjectPopup = ({
    project,
    onClose,
    onDelete,
    onApply,
    onEdit
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState({});

    const { startLoading, stopLoading } = useLoading();

    const [categories, setCategories] = useState([]);
    const [skills, setSkills] = useState([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSkillsOpen, setIsSkillsOpen] = useState(false);
    const [isRegionsOpen, setIsRegionsOpen] = useState(false);

    const [selectedSkillObjects, setSelectedSkillObjects] = useState([]);

    const [dataReady, setDataReady] = useState(false); 

    const australianStates = ["nsw", "vic", "qld", "wa", "sa", "tas", "act", "nt"];
    const stateLabels = {
        nsw: "New South Wales",
        vic: "Victoria",
        qld: "Queensland", 
        wa: "Western Australia",
        sa: "South Australia",
        tas: "Tasmania",
        act: "Australian Capital Territory",
        nt: "Northern Territory"
    };

    // Helper to get skill objects from IDs
    const getSkillObjectsFromIds = (skillIds, allSkills) => {
        if (!Array.isArray(skillIds)) return [];
        return skillIds
            .filter((id) => typeof id === "number")
            .map((id) => allSkills.find(skill => skill.id === id))
            .filter(obj => obj !== undefined); // Filter out any skills not found
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        
        // FIX: Use local time methods (getFullYear, getMonth, getDate) 
        // instead of UTC methods (getUTCFullYear, etc.)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        
        return `${year}-${month}-${day}`;
    };

    // Consolidated useEffect for fetching lists and initializing project states
    useEffect(() => {

        const fetchData = async () => {
            try {
                const [categoriesRes, skillsRes] = await Promise.all([
                    getCategoriesList(),
                    getSkillsList()
                ]);

                setCategories(categoriesRes.data.categories || []);
                const fetchedSkills = skillsRes.data.skills || [];
                setSkills(fetchedSkills); // Set skills state


                if (project) {
                    const initialSkillIds = Array.isArray(project.skills)
                        ? project.skills.filter((id) => typeof id === "number")
                        : [];
                    
                    
                    // 1. Set editedProject state
                    setEditedProject({
                        title: project.title || "",
                        description: project.description || "",
                        status: project.status || "open",
                        category: project.category || "",
                        categoryId: project.categories?.[0] || null,
                        // skillIds is an array of NUMBERS (IDs) only
                        skillIds: initialSkillIds, 
                        regions: Array.isArray(project.regions)
                            ? project.regions.filter((r) => typeof r === "string" && r.length > 0)
                            : [],
                        openDate: formatDateForInput(project.openDate),
                        closeDate: formatDateForInput(project.closeDate),
                        completionDate: formatDateForInput(project.completionDate),
                    });

                    // 2. Set selectedSkillObjects using the freshly fetched 'fetchedSkills'
                    const skillObjects = getSkillObjectsFromIds(initialSkillIds, fetchedSkills);
                    setSelectedSkillObjects(skillObjects);
                    
                }
            } catch (error) {
                console.error('[DEBUG: INIT] Error fetching data:', error);
            }
        };

        startLoading();
        fetchData()
            .then(() => {
                stopLoading();
                setDataReady(true);
            })
            .catch((error) => {
                console.error("Error during fetch:", error);
                stopLoading(); 
                setDataReady(false); // Handle error case
            });
    }, [project]); 


    useEffect(() => {
        const checkOwnership = async () => {
            const res = await getCurrentUserInfo();
            // Optional chaining for safety
            setIsOwner(res.data.data.id === project?.managed_by_user_id);
        }

        const checkApplicationStatus = async () => {
            try {
                const appliedRes = await getAppliedProjects();
                const hasAppliedToProject = appliedRes.data.projects.some(appliedProject => 
                    appliedProject.id === project?.id
                );
                setHasApplied(hasAppliedToProject);
            } catch (error) {
                console.error('Error checking application status:', error);
            }
        };

        // Only run checks if project exists
        if (project) {
            checkOwnership();
            checkApplicationStatus();
        }
        
    }, [project]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'long', 
            year: 'numeric'
        });
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await deleteProject(project.id);
            onDelete(project.id);
            onClose();
        } catch (error) {
            console.error('Error deleting project:', error);
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleApply = async () => {
        setIsLoading(true);
        try {
            const message = `applicant-project(${project.id})`;
            await addApplicant(project.id);
            await addNotification(project.business_id, message);
            onApply(project.id);
            onClose();
        } catch (error) {
            console.error('Error applying to project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // Ensure skillIds is an array of numbers before sending
            const updatedData = {
                ...editedProject,
                skillIds: editedProject.skillIds.filter((id) => typeof id === "number"),
                regions: editedProject.regions.filter((r) => typeof r === "string"),
            };

            await updateProject(project.id, updatedData);

            setIsEditing(false);
            if (onEdit) {
                // Pass the updated data back. The parent must use this to update the 'project' prop.
                onEdit(updatedData);
            }
        } catch (error) {
            console.error('[DEBUG: SAVE] Error updating project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);

        // Get original skill IDs (guaranteed to be an array of numbers or an empty array)
        const originalSkillIds = Array.isArray(project?.skills)
            ? project.skills.filter((id) => typeof id === "number")
            : [];
        


        // Reset editedProject to original values from the project prop
        setEditedProject({
            title: project?.title || '',
            description: project?.description || '',
            status: project?.status || 'open',
            category: project?.category || '',
            categoryId: project?.categories && project.categories.length > 0 ? project.categories[0] : null,
            skillIds: originalSkillIds, // This is the array of IDs
            regions: Array.isArray(project?.regions) 
                ? project.regions.filter(region => region !== null && region !== undefined)
                : [],
            openDate: formatDateForInput(project?.openDate),
            closeDate: formatDateForInput(project?.closeDate),
            completionDate: formatDateForInput(project?.completionDate)
        });

        // Reset selectedSkillObjects for display using the fetched skills list
        const restoredSkills = getSkillObjectsFromIds(originalSkillIds, skills);
        setSelectedSkillObjects(restoredSkills);
    };

    const handleInputChange = (field, value) => {
        setEditedProject(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCategorySelect = (selectedCategory) => {
        setEditedProject(prev => ({
            ...prev,
            category: selectedCategory.name,
            categoryId: selectedCategory.id
        }));
        setIsCategoryOpen(false);
    };

    const handleSkillSelect = (selectedSkill) => {
        if (!editedProject.skillIds.includes(selectedSkill.id)) {
            // Add ID to skillIds
            setEditedProject((prev) => ({
                ...prev,
                skillIds: [...prev.skillIds, selectedSkill.id],
            }));
            // Add full skill object to selectedSkillObjects for display
            setSelectedSkillObjects((prev) => [...prev, selectedSkill]);
        }
        setIsSkillsOpen(false);
    };

    const removeSkill = (skillId) => {
        // Remove ID from skillIds
        setEditedProject((prev) => ({
            ...prev,
            skillIds: prev.skillIds.filter((id) => id !== skillId),
        }));
        // Remove object from selectedSkillObjects
        setSelectedSkillObjects((prev) => prev.filter((skill) => skill.id !== skillId));
    };

    const handleRegionSelect = (selectedRegion) => {
        if (!selectedRegion) return;
        setEditedProject(prev => {
            const current = Array.isArray(prev.regions) ? prev.regions : [];
            if (current.includes(selectedRegion)) return prev;
            return { ...prev, regions: [...current, selectedRegion] };
        });
        setIsRegionsOpen(false);
    };


    const removeRegion = (region) => {
        setEditedProject(prev => ({
            ...prev,
            regions: prev.regions.filter(r => r !== region)
        }));
    };

    const getSelectedCategoryName = () => {
        if (editedProject.category) return editedProject.category;
        if (editedProject.categoryId) {
            const category = categories.find(cat => cat.id === editedProject.categoryId);
            return category ? category.name : "Select Category";
        }
        return "Select Category";
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[900px] max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
                
                {isEditing ? (
                    <div className="p-6 text-white bg-gradient-to-r from-indigo-600 to-blue-600 relative">
                        <button 
                            onClick={handleCancelEdit}
                            className="absolute top-6 right-4 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                            <CloseIcon className="w-6 h-6 text-black" />
                        </button>
                        
                        <input
                            type="text"
                            value={editedProject.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="text-3xl font-semibold mb-4 pr-16 bg-transparent border-b border-white border-opacity-50 focus:outline-none focus:border-white w-full text-white placeholder-white placeholder-opacity-70"
                            placeholder="Project Title"
                        />
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-300 mb-2">Open Date:</p>
                                <input
                                    type="date"
                                    value={editedProject.openDate}
                                    onChange={(e) => handleInputChange('openDate', e.target.value)}
                                    className="font-medium bg-transparent border-b border-white border-opacity-50 focus:outline-none focus:border-white w-full text-white"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300 mb-2">Close Date:</p>
                                <input
                                    type="date"
                                    value={editedProject.closeDate}
                                    onChange={(e) => handleInputChange('closeDate', e.target.value)}
                                    className="font-medium bg-transparent border-b border-white border-opacity-50 focus:outline-none focus:border-white w-full text-white"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300 mb-2">Completion Date:</p>
                                <input
                                    type="date"
                                    value={editedProject.completionDate}
                                    onChange={(e) => handleInputChange('completionDate', e.target.value)}
                                    className="font-medium bg-transparent border-b border-white border-opacity-50 focus:outline-none focus:border-white w-full text-white"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-white bg-gradient-to-r from-indigo-600 to-blue-600 relative">
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-4 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                            <CloseIcon className="w-6 h-6 text-black" />
                        </button>
                        
                        {isOwner && (
                            <button 
                                onClick={handleEdit}
                                className="absolute top-6 right-16 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                                title="Edit Project"
                            >
                                <EditIcon className="w-6 h-6 text-black" />
                            </button>
                        )}
                        
                        <h3 className="text-3xl font-semibold mb-4 pr-16">{project?.title}</h3>
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-300 mb-2">Open Date:</p>
                                <p className="font-medium">{formatDate(project?.openDate)}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-300 mb-2">Close Date:</p>
                                <p className="font-medium">{formatDate(project?.closeDate)}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-300 mb-2">Completion Date:</p>
                                <p className="font-medium">{formatDate(project?.completionDate)}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {isEditing ? (
                        <>
                            <div className="gap-6 mb-6">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Status:</p>
                                    <select
                                        value={editedProject.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="px-2 py-1 rounded text-xs font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="gap-6 mb-6">
                                <p className="text-sm text-gray-600 mb-2">Submitted By:</p>
                                <p className="font-medium">{project?.business_name}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-6">
                                {/* Category Dropdown */}
                                <div className="form-group relative">
                                    <p className="text-sm text-gray-600 mb-2">Category:</p>
                                    <button
                                        type="button"
                                        className="w-full hs-dropdown-toggle text-left border border-gray-300 rounded bg-white 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                                   focus:border-transparent transition-all duration-200 flex items-center justify-between py-2 px-3"
                                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    >
                                        <span className="truncate">{getSelectedCategoryName()}</span>
                                        {isCategoryOpen ? (
                                            <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        ) : (
                                            <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        )}
                                    </button>
                                    
                                    {isCategoryOpen && (
                                        <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                                                       max-h-60 overflow-y-auto w-full">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:outline-none focus:bg-blue-50 
                                                               focus:text-blue-600 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                                                    onClick={() => handleCategorySelect(cat)}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Skills Dropdown */}
                                <div className="form-group relative">
                                    <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                                    <button
                                        type="button"
                                        className="w-full hs-dropdown-toggle text-left border border-gray-300 rounded bg-white 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                                   focus:border-transparent transition-all duration-200 flex items-center justify-between py-2 px-3"
                                        onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                                    >
                                        <span className="truncate">
                                            {selectedSkillObjects.length > 0
                                                ? `${selectedSkillObjects.length} selected` 
                                                : "Select Skills"}
                                        </span>
                                        {isSkillsOpen ? (
                                            <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        ) : (
                                            <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        )}
                                    </button>
                                    
                                    {isSkillsOpen && (
                                        <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                                                       max-h-60 overflow-y-auto w-full">
                                            {skills.map((skill) => (
                                                <button
                                                    key={skill.id}
                                                    type="button"
                                                    // Add a check to highlight already selected skills
                                                    className={`w-full px-4 py-3 text-left hover:bg-gray-100 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0
                                                                ${editedProject.skillIds.includes(skill.id) ? 'bg-blue-50 text-blue-600' : 'focus:bg-blue-50 focus:text-blue-600'}`}
                                                    onClick={() => handleSkillSelect(skill)}
                                                    disabled={editedProject.skillIds.includes(skill.id)}
                                                >
                                                    {skill.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Selected Skills Display - using selectedSkillObjects for display names */}
                                    {selectedSkillObjects.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedSkillObjects.map((skill) => (
                                                <span key={skill.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {skill.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill(skill.id)} // Use the ID for removal
                                                        className="ml-2 hover:text-blue-600"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                </div>

                                {/* Regions Dropdown */}
                                <div className="form-group relative">
                                    <p className="text-sm text-gray-600 mb-2">Regions:</p>
                                    <button
                                        type="button"
                                        className="w-full hs-dropdown-toggle text-left border border-gray-300 rounded bg-white 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                                   focus:border-transparent transition-all duration-200 flex items-center justify-between py-2 px-3"
                                        onClick={() => setIsRegionsOpen(!isRegionsOpen)}
                                    >
                                        <span className="truncate">
                                            {Array.isArray(editedProject.regions) && editedProject.regions.length > 0 
                                                ? `${editedProject.regions.length} selected` 
                                                : "Select Regions"}
                                        </span>
                                        {isRegionsOpen ? (
                                            <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        ) : (
                                            <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        )}
                                    </button>
                                    
                                    {isRegionsOpen && (
                                        <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                                                       max-h-60 overflow-y-auto w-full">
                                            {australianStates.map((stateCode) => (
                                                <button
                                                    key={stateCode}
                                                    type="button"
                                                    className={`w-full px-4 py-3 text-left hover:bg-gray-100 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0
                                                                ${editedProject.regions.includes(stateCode) ? 'bg-green-50 text-green-600' : 'focus:bg-blue-50 focus:text-blue-600'}`}
                                                    onClick={() => handleRegionSelect(stateCode)}
                                                    disabled={editedProject.regions.includes(stateCode)}
                                                >
                                                    {stateLabels[stateCode]}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Selected Regions Display */}
                                    {Array.isArray(editedProject.regions) && editedProject.regions.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {editedProject.regions.map(region => (
                                                <span 
                                                    key={region}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                >
                                                    {stateLabels[region] || region.toUpperCase()}
                                                    <button 
                                                        type="button"
                                                        onClick={() => removeRegion(region)}
                                                        className="ml-2 hover:text-green-600"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-md font-semibold mb-2">About the project:</p>
                                <textarea
                                    value={editedProject.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                                    placeholder="Project description..."
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="gap-6 mb-6">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Status:</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        project?.status === 'open' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {project?.status === 'open' ? 'Open' : 'Closed'}
                                    </span>
                                </div>
                            </div>

                            <div className="gap-6 mb-6">
                                <p className="text-sm text-gray-600 mb-2">Submitted By:</p>
                                <p className="font-medium">{project?.business_name}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Category:</p>
                                    <p className="font-medium">{project?.category || "N/A"}</p>
                                </div>

                                {project?.skills && (
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {/* Logic to display skills from the original project prop */}
                                            {Array.isArray(project.skills) ? (
                                                project.skills
                                                    .map(skillId => skills.find(s => s.id === skillId)) // Find the skill object
                                                    .filter(s => s) // Filter out null/undefined if skill not found
                                                    .map((skill, index) => (
                                                        <span 
                                                            key={skill.id || index}
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                        >
                                                            {skill.name}
                                                        </span>
                                                    ))
                                            ) : typeof project.skills === 'string' ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {project.skills}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    N/A
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {project?.regions && project.regions.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Regions:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.regions.map((region, index) => (
                                                <span 
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                >
                                                    {stateLabels[region] || region.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <p className="text-md font-semibold mb-2">About the project:</p>
                                <div className="py-2">
                                    <p className="text-sm whitespace-pre-wrap">{project?.description}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {isEditing ? (
                        <div className="flex gap-3 justify-end">
                            <SecondaryButton 
                                onClick={handleCancelEdit}
                                disabled={isLoading}
                                className="px-4 py-2"
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton 
                                onClick={handleSave}
                                disabled={isLoading}
                                className="px-4 py-2"
                            >
                                {isLoading ? "Saving..." : "Save Changes"}
                            </PrimaryButton>
                        </div>
                    ) : (
                        showDeleteConfirm ? (
                            <div className="mb-6 p-4 border border-red-300 bg-red-50 rounded-lg">
                                <p className="text-sm text-red-800 font-medium mb-2">
                                    Are you sure you want to delete this project? This action cannot be undone.
                                </p>
                                <div className="flex gap-2">
                                    <SecondaryButton 
                                        onClick={() => setShowDeleteConfirm(false)}
                                        disabled={isLoading}
                                        className="px-3 py-1 text-sm"
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton 
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700"
                                    >
                                        {isLoading ? "Deleting..." : "Delete Project"}
                                    </PrimaryButton>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-3 justify-end">
                                <SecondaryButton 
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="px-4 py-2"
                                >
                                    Close
                                </SecondaryButton>
                                
                                {isOwner ? (
                                    <>
                                        <PrimaryButton 
                                            onClick={() => setShowDeleteConfirm(true)}
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700"
                                        >
                                            Delete Project
                                        </PrimaryButton>
                                    </>
                                ) : project?.status === 'open' ? (
                                    hasApplied ? (
                                        <PrimaryButton 
                                            disabled={true}
                                            className="px-4 py-2 bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                        >
                                            Pending Application...
                                        </PrimaryButton>
                                    ) : (
                                        <PrimaryButton 
                                            onClick={handleApply}
                                            disabled={isLoading || !dataReady}
                                            className="px-4 py-2"
                                        >
                                            {isLoading ? "Applying..." : "Apply to Project"}
                                        </PrimaryButton>
                                    )
                                ) : null}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectPopup;
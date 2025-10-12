import { useState, useEffect } from "react";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import { getCurrentUserInfo } from "../../../api/user";
import { deleteProject, getAppliedProjects, getProjectDetails } from "../../../api/projects";
import { addApplicant } from "../../../api/projects";
import { addNotification } from "../../../api/notification";
import { getOtherBusinessInfo } from "../../../api/business";

const ProjectPopup = ({
    project,
    onClose,
    onDelete,
    onApply
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        const checkOwnership = async () => {
            const res = await getCurrentUserInfo();
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

        checkOwnership();
        checkApplicationStatus();
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[900px] max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>

                <div className="gap-6 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Project Name:</p>
                    <p className="font-medium">{project?.title}</p>
                </div>

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

                <div className="grid grid-cols-3 gap-6 mb-6">

                    

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Category:</p>
                        <p className="font-medium">{project?.category || "N/A"}</p>
                    </div>

                    {project?.skills && (
                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                            <div className="flex flex-wrap gap-2">
                                {typeof project.skills === 'string' ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {project.skills}
                                    </span>
                                ) : Array.isArray(project.skills) ? (
                                    project.skills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                        >
                                            {typeof skill === 'object' ? skill.name : `Skill ${skill}`}
                                        </span>
                                    ))
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {project.skills}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Open Date:</p>
                        <p className="font-medium">{formatDate(project?.openDate)}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Close Date:</p>
                        <p className="font-medium">{formatDate(project?.closeDate)}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Completion Date:</p>
                        <p className="font-medium">{formatDate(project?.completionDate)}</p>
                    </div>
                </div>



                {project?.regions && project.regions.length > 0 && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">Regions:</p>
                        <div className="flex flex-wrap gap-2">
                            {project.regions.map((region, index) => (
                                <span 
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                    {region}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Description:</p>
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <p className="text-sm whitespace-pre-wrap">{project?.description}</p>
                    </div>
                </div>

                {showDeleteConfirm ? (
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
                            <PrimaryButton 
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={isLoading}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700"
                            >
                                Delete Project
                            </PrimaryButton>
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
                                    onClick={() => handleApply(project.managed_by_user_id)}
                                    disabled={isLoading}
                                    className="px-4 py-2"
                                >
                                    {isLoading ? "Applying..." : "Apply to Project"}
                                </PrimaryButton>
                            )
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPopup;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../utils/LoadingContext";
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx";
import SecondaryButton from "../../../components/Button/SecondaryButton";
import ChevronDownIcon from "../../../components/Icons/ChevronDownIcon";
import ChevronUpIcon from "../../../components/Icons/ChevronUpIcon";

const SubmitJob = () => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const [submitting, setSubmitting] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [categoryId, setCategoryId] = useState(null);
  const [skill, setSkill] = useState("Select Skills");
  const [skillId, setSkillId] = useState(null);
  const [state, setState] = useState("Select State");
  const [details, setDetails] = useState("");

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);

  // TODO: Fetch categories from API
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  
  const australianStates = [
    "New South Wales",
    "Victoria", 
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory"
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      // TODO: Implement API call to fetch categories
      // try {
      //   const categoriesRes = await getJobCategories();
      //   setCategories(categoriesRes.data.categories);
      // } catch (error) {
      //   console.error('Error fetching categories:', error);
      // }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory.name);
    setCategoryId(selectedCategory.id);
    setIsCategoryOpen(false);
  };

  const handleSkillSelect = (selectedSkill) => {
    setSkill(selectedSkill.name);
    setSkillId(selectedSkill.id);
    setIsSkillsOpen(false);
  }

  const handleStateSelect = (selectedState) => {
    setState(selectedState);
    setIsStateOpen(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // TODO: Implement API call to submit job
      // const jobData = {
      //   projectName,
      //   openDate,
      //   closeDate,
      //   completionDate,
      //   categoryId,
      //   skills: skills.map(skill => skill.description),
      //   state,
      //   details
      // };
      // await submitJob(jobData);
      
      // TODO: Navigate to success page or job listing
      // navigate(`/trade/jobs/success`);
      console.log("Job submitted:", {
        projectName,
        openDate,
        closeDate,
        completionDate,
        category,
        skill,
        state,
        details
      });
      
    } catch (error) {
      console.error('Error submitting job:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl sm:px-6 lg:px-6 2xl:px-8 py-2">
      <h2 className="pt-10 sm:text-xl 2xl:text-3xl md:text-2xl font-semibold text-black-800 pb-4">Submit New Project</h2>
      
      {/* Project Name */}
      <div className="form-group">
        <p className="pt-4 pb-1 text-md font-semibold text-blue-600">PROJECT NAME</p>
        <input 
          type="text" 
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border-b-2 placeholder-gray-300 w-full" 
          placeholder="Enter project name..." 
          required
        />
      </div>

      {/* Dates Section */}
      <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Project Timeline</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">OPEN DATE</p>
          <input 
            type="date" 
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
            className="border-b-2 placeholder-gray-300 w-full" 
            required
          />
        </div>
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">CLOSE DATE</p>
          <input 
            type="date" 
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
            className="border-b-2 placeholder-gray-300 w-full" 
            required
          />
        </div>
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">COMPLETION DATE</p>
          <input 
            type="date" 
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            className="border-b-2 placeholder-gray-300 w-full" 
            required
          />
        </div>
      </div>

      {/* Category and State */}
      <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Project Details</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="form-group relative">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">CATEGORY</p>
          <button
            type="button"
            className="w-full hs-dropdown-toggle text-left border-b-2 border-gray-200 bg-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all duration-200 flex items-center justify-between py-2"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <span className="truncate">{category}</span>
            {isCategoryOpen ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          
          {isCategoryOpen && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
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

        <div className="form-group relative">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">SKILLS</p>
          <button
            type="button"
            className="w-full hs-dropdown-toggle text-left border-b-2 border-gray-200 bg-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all duration-200 flex items-center justify-between py-2"
            onClick={() => setIsSkillsOpen(!isSkillsOpen)}
          >
            <span className="truncate">{skill}</span>
            {isSkillsOpen ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          
          {isSkillsOpen && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                           max-h-60 overflow-y-auto w-full">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:outline-none focus:bg-blue-50 
                             focus:text-blue-600 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSkillSelect(skill)}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="form-group relative">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">STATE</p>
          <button
            type="button"
            className="w-full hs-dropdown-toggle text-left border-b-2 border-gray-200 bg-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all duration-200 flex items-center justify-between py-2"
            onClick={() => setIsStateOpen(!isStateOpen)}
          >
            <span className="truncate">{state}</span>
            {isStateOpen ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          
          {isStateOpen && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                           max-h-60 overflow-y-auto w-full">
              {australianStates.map((stateOption) => (
                <button
                  key={stateOption}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:outline-none focus:bg-blue-50 
                             focus:text-blue-600 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleStateSelect(stateOption)}
                >
                  {stateOption}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Description*/}
      <div className="form-group">
        <p className="pt-4 pb-1 text-md font-semibold text-blue-600">DESCRIPTION</p>
        <textarea 
          type="text" 
          cols="30"
          rows="10"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="border-2 placeholder-gray-300 w-full" 
          placeholder="Provide detailed description of the project, requirements, and scope..." 
          autoComplete="new-password" 
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-20 flex gap-x-6 items-center pb-10">
        <SecondaryButton 
          className="px-20" 
          onClick={() => navigate("/trade/find")}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton 
          className="px-20" 
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Job"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SubmitJob;
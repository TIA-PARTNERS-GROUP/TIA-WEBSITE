import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  addClients, 
  addServices, 
  getCurrentBusinessInfo, 
  removeClients, 
  removeServices, 
  updateCurrentBusinessProfile,
  addSkills,
  addStrengths,
  removeSkills,
  removeStrengths 
} from "../../../api/business.js";
import { useLoading } from "../../../utils/LoadingContext.jsx";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import DeleteIcon from "../../Icons/DeleteIcon.jsx";
import ChevronDownIcon from "../../Icons/ChevronDownIcon.jsx";
import ChevronUpIcon from "../../Icons/ChevronUpIcon.jsx";
import { getCategoriesList, getSkillsList, getStrengthsList } from "../../../api/categories.js";

const EditView = () => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const [saving, setSaving] = useState(false);

  const [companyName, setCompanyName] = useState("Loading...");
  const [category, setCategory] = useState("Loading...");
  const [categoryId, setCategoryId] = useState(null);
  const [contactInfo, setContactInfo] = useState(["Loading...", "Loading...", "Loading..."]);
  const [companyDescription, setCompanyDescription] = useState("Loading...");
  const [whatwedoData, setWhatWeDoData] = useState([{description: "Loading..."}]);
  const [clientData, setClientData] = useState([{description: "Loading..."}]);

  const [originalWhatWeDoData, setOriginalWhatWeDoData] = useState([{}]);
  const [originalClientData, setOriginalClientData] = useState([{}]);

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [skills, setSkills] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [userStrengths, setUserStrengths] = useState([]);
  const [originalUserSkills, setOriginalUserSkills] = useState([]);
  const [originalUserStrengths, setOriginalUserStrengths] = useState([]);

  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState(false);
  const [strengthsDropdownOpen, setStrengthsDropdownOpen] = useState(false);

  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category_name || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const strengthsByCategory = strengths.reduce((acc, strength) => {
    const category = strength.category_name || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(strength);
    return acc;
  }, {});

  useEffect(() => {
    const fetchCategoriesAndSkills = async () => {
      try {
        const [categoriesRes, skillsRes, strengthsRes] = await Promise.all([
          getCategoriesList(),
          getSkillsList(),
          getStrengthsList()
        ]);
        
        setCategories(categoriesRes.data.categories);
        setSkills(skillsRes.data.skills);
        setStrengths(strengthsRes.data.strengths);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoriesAndSkills();
  }, []);

  function formatString(str) {
    if (!str) {return null};
    return str
        .split('-') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' '); 
  }

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      startLoading();
      
      try {
        const res = await getCurrentBusinessInfo();
        const { 
          businessDescription, 
          businessCategory,
          contactName, 
          contactPhone, 
          contactEmail, 
          businessName, 
          services, 
          clients,
          skills: userSkillsData,
          strengths: userStrengthsData
        } = res.data;
        
        setCompanyDescription(businessDescription);
        setCategory(formatString(businessCategory));
        setContactInfo([contactName, contactPhone, contactEmail]);
        setCompanyName(businessName);
        setWhatWeDoData(services.map(service => ({ description: service.description })));
        setClientData(clients.map(client => ({ description: client.description })));
        
        setUserSkills(userSkillsData.map(skill => skill.skill_id));
        setUserStrengths(userStrengthsData.map(strength => strength.strength_id));
        setOriginalUserSkills(userSkillsData.map(skill => skill.skill_id));
        setOriginalUserStrengths(userStrengthsData.map(strength => strength.strength_id));

        setOriginalWhatWeDoData(services);
        setOriginalClientData(clients);

        const foundCategory = categories.find(cat => 
          cat.name.toLowerCase() === formatString(businessCategory)?.toLowerCase()
        );

        if (foundCategory) {
          setCategoryId(foundCategory.id);
        }
      } catch (error) {
        console.error('Error fetching business info:', error);
      } finally {
        stopLoading();
      }
    };

    fetchBusinessInfo();
  }, [categories]);

  const handleSkillToggle = (skillId) => {
    setUserSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const handleStrengthToggle = (strengthId) => {
    setUserStrengths(prev => {
      if (prev.includes(strengthId)) {
        return prev.filter(id => id !== strengthId);
      } else {
        return [...prev, strengthId];
      }
    });
  };

  const getSkillName = (skillId) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.name : 'Unknown Skill';
  };

  const getStrengthName = (strengthId) => {
    const strength = strengths.find(s => s.id === strengthId);
    return strength ? strength.name : 'Unknown Strength';
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory.name);
    setCategoryId(selectedCategory.id);
    setIsOpen(false);
  };

  const handleContactPersonChange = (event) => {
    setContactInfo([event.target.value, contactInfo[1], contactInfo[2]]);
  };

  const handlePhoneNumberChange = (event) => {
    setContactInfo([contactInfo[0], event.target.value, contactInfo[2]]);
  };

  const handleEmailChange = (event) => {
    setContactInfo([contactInfo[0], contactInfo[1], event.target.value]);
  };

  const handleDescriptionChange = (event) => {
    setCompanyDescription(event.target.value);
  };

  const handleWhatWeDoChange = (index, newDescription) => {
    const updatedData = [...whatwedoData];
    updatedData[index] = {
      ...updatedData[index],
      description: newDescription,
      input: true
    };
    setWhatWeDoData(updatedData);
  };

  const handleClientChange = (index, newDescription) => {
    const updatedData = [...clientData];
    updatedData[index] = {
      ...updatedData[index],
      description: newDescription,
      input: true
    };
    setClientData(updatedData);
  };

  const handleAddService = () => {
    setWhatWeDoData([...whatwedoData, { description: "" }]);
  };

  const handleAddClient = () => {
    setClientData([...clientData, { description: "" }]);
  };

  const handleRemoveService = (index) => {
    setWhatWeDoData(whatwedoData => whatwedoData.filter((_, i) => i !== index));
  };

  const handleRemoveClient = (index) => {
    setClientData(clientData => clientData.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const serviceIds = originalWhatWeDoData.map(service => service.service_id);
      const clientIds = originalClientData.map(client => client.client_id);
      const serviceDescriptions = whatwedoData.map(service => service.description);
      const clientDescriptions = clientData.map(client => client.description);

      const skillsToRemove = originalUserSkills.filter(id => !userSkills.includes(id));
      const skillsToAdd = userSkills.filter(id => !originalUserSkills.includes(id));
      
      const strengthsToRemove = originalUserStrengths.filter(id => !userStrengths.includes(id));
      const strengthsToAdd = userStrengths.filter(id => !originalUserStrengths.includes(id));

      // Build promises array conditionally
      const promises = [
        updateCurrentBusinessProfile(companyName, contactInfo[0], contactInfo[1], contactInfo[2], companyDescription, categoryId)
      ];

      if (serviceIds.length > 0) {
        promises.push(removeServices(serviceIds));
      }
      if (serviceDescriptions.length > 0) {
        promises.push(addServices(serviceDescriptions));
      }

      if (clientIds.length > 0) {
        promises.push(removeClients(clientIds));
      }
      if (clientDescriptions.length > 0) {
        promises.push(addClients(clientDescriptions));
      }

      if (skillsToRemove.length > 0) {
        promises.push(removeSkills(skillsToRemove));
      }
      if (skillsToAdd.length > 0) {
        promises.push(addSkills(skillsToAdd));
      }

      if (strengthsToRemove.length > 0) {
        promises.push(removeStrengths(strengthsToRemove));
      }
      if (strengthsToAdd.length > 0) {
        promises.push(addStrengths(strengthsToAdd));
      }

      await Promise.all(promises);
      
      window.scrollTo(0, 0);
      navigate(`/manage/profile/view`);
    } catch (error) {
      console.error('Error saving profile:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl px-8 py-2">
      <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800 pb-4">Edit Profile</h2>
      
      <div className="form-group">
        <p className="pt-4 pb-1 text-md font-semibold text-blue-600">COMPANY NAME</p>
        <input 
          type="text" 
          value={companyName}
          onChange={handleCompanyNameChange}
          className="border-b-2 placeholder-gray-300" 
          placeholder="Company Name..." 
          required
        />
      </div>
      
      <div className="form-group">
        <p className="pt-4 pb-1 text-md font-semibold text-blue-600">BUSINESS CATEGORY</p>
        <button
          type="button"
          className="w-[19%] hs-dropdown-toggle text-left border-b-2 border-gray-200 bg-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent transition-all duration-200 flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{category}</span>
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
          )}
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                         max-h-60 overflow-y-auto">
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

      <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Contact Info</h2>
      <div className="grid grid-cols-3">
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">CONTACT PERSON</p>
          <input 
            type="text" 
            onChange={handleContactPersonChange}
            value={contactInfo[0]}
            className="border-b-2 placeholder-gray-300" 
            placeholder="Contact Person..." 
            autoComplete="new-password" 
            required
          />
        </div>
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">PHONE NUMBER</p>
          <input 
            type="text" 
            value={contactInfo[1]}
            onChange={handlePhoneNumberChange}
            className="border-b-2 placeholder-gray-300" 
            placeholder="Phone Number..." 
            autoComplete="new-password" 
            required
          />
        </div>
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">EMAIL</p>
          <input 
            type="text" 
            value={contactInfo[2]}
            onChange={handleEmailChange}
            className="border-b-2 placeholder-gray-300" 
            placeholder="Email..." 
            autoComplete="new-password" 
            required
          />
        </div>
      </div>

      <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Summary</h2>
      <div className="form-group">
        <p className="pt-4 pb-1 text-md font-semibold text-blue-600">COMPANY DESCRIPTION</p>
        <textarea 
          type="text" 
          cols="30"
          rows="10"
          value={companyDescription}
          onChange={handleDescriptionChange}
          className="border-2 placeholder-gray-300 w-full" 
          placeholder="Give a brief description of your company..." 
          autoComplete="new-password" 
          required
        />
      </div>

      {/* Skills Section */}
      <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Skills & Strengths</h2>
      <div className="grid grid-cols-2 pb-10 gap-x-20">
        {/* Skills Dropdown */}
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">SKILLS</p>
          <div className="relative">
            <button
              type="button"
              className="w-full text-left border-2 border-gray-200 bg-white rounded-lg p-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all duration-200 flex items-center justify-between"
              onClick={() => setSkillsDropdownOpen(!skillsDropdownOpen)}
            >
              <span>Select Skills ({userSkills.length} selected)</span>
              {skillsDropdownOpen ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {skillsDropdownOpen && (
              <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                            max-h-60 overflow-y-auto w-full">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <div className="px-4 py-2 bg-gray-50 font-semibold text-gray-700 border-b">
                      {category}
                    </div>
                    {categorySkills.map((skill) => (
                      <label
                        key={skill.id}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={userSkills.includes(skill.id)}
                          onChange={() => handleSkillToggle(skill.id)}
                          className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex-1">{skill.name}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Selected Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {userSkills.map(skillId => (
              <div key={skillId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                {getSkillName(skillId)}
                <button
                  type="button"
                  onClick={() => handleSkillToggle(skillId)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths Dropdown */}
        <div className="form-group">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">STRENGTHS</p>
          <div className="relative">
            <button
              type="button"
              className="w-full text-left border-2 border-gray-200 bg-white rounded-lg p-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all duration-200 flex items-center justify-between"
              onClick={() => setStrengthsDropdownOpen(!strengthsDropdownOpen)}
            >
              <span>Select Strengths ({userStrengths.length} selected)</span>
              {strengthsDropdownOpen ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {strengthsDropdownOpen && (
              <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg 
                            max-h-60 overflow-y-auto w-full">
                {Object.entries(strengthsByCategory).map(([category, categoryStrengths]) => (
                  <div key={category}>
                    <div className="px-4 py-2 bg-gray-50 font-semibold text-gray-700 border-b">
                      {category}
                    </div>
                    {categoryStrengths.map((strength) => (
                      <label
                        key={strength.id}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={userStrengths.includes(strength.id)}
                          onChange={() => handleStrengthToggle(strength.id)}
                          className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex-1">{strength.name}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Selected Strengths */}
          <div className="mt-3 flex flex-wrap gap-2">
            {userStrengths.map(strengthId => (
              <div key={strengthId} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                {getStrengthName(strengthId)}
                <button
                  type="button"
                  onClick={() => handleStrengthToggle(strengthId)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Services and Clients</h2>
      <div className="grid grid-cols-3 pb-20 gap-x-20">
        <div className="form-group flex flex-col gap-y-6">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">SERVICES</p>
          {whatwedoData.map((item, index) => (
            <div key={index} className="flex w-full justify-between gap-x-2">
              <input
                type="text"
                value={item.description} 
                onChange={(e) => handleWhatWeDoChange(index, e.target.value)}
                className="border-b-2 placeholder-gray-300 w-full" 
                placeholder="What does your company do?..." 
              />
              <button onClick={() => handleRemoveService(index)}>
                <DeleteIcon />
              </button>
            </div>
          ))}
          <SecondaryButton 
            className="relative -translate-y-4 text-sm block text-center py-0.5 mt-2 max-w-[185px]"
            onClick={handleAddService}
          >
            + Add new service
          </SecondaryButton>
        </div>
        
        <div className="form-group flex flex-col gap-y-6">
          <p className="pt-4 pb-1 text-md font-semibold text-blue-600">CLIENTS</p>
          {clientData.map((item, index) => (
            <div key={index} className="flex w-full justify-between gap-x-2">
              <input
                type="text"
                value={item.description} 
                onChange={(e) => handleClientChange(index, e.target.value)}
                className="border-b-2 placeholder-gray-300 w-full" 
                placeholder="What type of client does your company serve?..." 
              />
              <button onClick={() => handleRemoveClient(index)}>
                <DeleteIcon />
              </button>
            </div>
          ))}
          <SecondaryButton 
            className="relative -translate-y-4 text-sm block text-center py-0.5 mt-2 max-w-[185px]"
            onClick={handleAddClient}
          >
            + Add new client
          </SecondaryButton>
        </div>
      </div>

      <div className="pt-20 flex gap-x-6 items-center">
        <SecondaryButton className="px-20" onClick={() => {window.scrollTo(0, 0); navigate("/manage/profile/view")}}>
          Cancel
        </SecondaryButton>
        <PrimaryButton className="px-20" onClick={handleSave}>
          Save
        </PrimaryButton>
        {saving && <p>Saving...</p>}
      </div>
    </div>
  );
};

export default EditView;
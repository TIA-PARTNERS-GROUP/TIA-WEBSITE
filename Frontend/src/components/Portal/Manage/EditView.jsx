import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClients, addServices, getCurrentBusinessInfo, removeClients, removeServices, updateCurrentBusinessProfile } from "../../../api/business.js";
import { useLoading } from "../../../utils/LoadingContext.jsx";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import DeleteIcon from "../../Icons/DeleteIcon.jsx";
import ChevronDownIcon from "../../Icons/ChevronDownIcon.jsx";
import ChevronUpIcon from "../../Icons/ChevronUpIcon.jsx";

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
  const categories = [
    {id: 1, name: 'Manufacuring'},
    {id: 2, name: 'Installation'},
    {id: 3, name: 'Software Development'},
    {id: 4, name: 'Cybersecurity'}
  ]

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
        clients 
      } = res.data;
      
      setCompanyDescription(businessDescription);
      setCategory(formatString(businessCategory));
      setContactInfo([contactName, contactPhone, contactEmail]);
      setCompanyName(businessName);
      setWhatWeDoData(services.map(service => ({ description: service.description })));
      setClientData(clients.map(client => ({ description: client.description })));
      
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
}, []);


  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  }
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory.name);
    setCategoryId(selectedCategory.id)
    setIsOpen(false);
  }
  const handleContactPersonChange = (event) => {
    setContactInfo([event.target.value, contactInfo[1], contactInfo[2]]);
  }
  const handlePhoneNumberChange = (event) => {
    setContactInfo([contactInfo[0], event.target.value, contactInfo[2]]);
  }
  const handleEmailChange = (event) => {
    setContactInfo([contactInfo[0], contactInfo[1], event.target.value]);
  }
  const handleDescriptionChange = (event) => {
    setCompanyDescription(event.target.value);
  }
  
  const handleWhatWeDoChange = (index, newDescription) => {
    const updatedData = [...whatwedoData];
    updatedData[index] = {
      ...updatedData[index],
      description: newDescription,
      input: true
    };
    setWhatWeDoData(updatedData);
  }

  const handleClientChange = (index, newDescription) => {
    const updatedData = [...clientData];
    updatedData[index] = {
      ...updatedData[index],
      description: newDescription,
      input: true
    };
    setClientData(updatedData);
  }

  const handleAddService = () => {
    setWhatWeDoData([...whatwedoData, { description: ""}]);
  };
  const handleAddClient = () => {
    setClientData([...clientData, { description: ""}]);
  };

  const handleRemoveService = (index) => {
    setWhatWeDoData(whatwedoData => whatwedoData.filter((_, i) => i !== index));
  }
  const handleRemoveClient = (index) => {
    setClientData(clientData => clientData.filter((_, i) => i !== index));
  }


  const handleSave = () => {
    setSaving(true);
    const serviceIds = originalWhatWeDoData.map(service => service.service_id);
    const clientIds = originalClientData.map(client => client.client_id);
    const serviceDescriptions = whatwedoData.map(service => service.description);
    const clientDescriptions = clientData.map(client => client.description);

    const pRemoveServices = removeServices(serviceIds)
      .then((data) => {data})
      .catch((error) => {console.error('Error removing services:', error);}
    );

    const pRemoveClients = removeClients(clientIds)
      .then((data) => {data})
      .catch((error) => {console.error('Error removing clients:', error);}
    );

    const pAddServices = addServices(serviceDescriptions)
      .then((data) => {data})
      .catch((error) => {console.error('Error adding services:', error);}
    );

    const pAddClients = addClients(clientDescriptions)
      .then((data) => {data})
      .catch((error) => {console.error('Error adding clients:', error);}
    );

    const pUpdateProfile = updateCurrentBusinessProfile(companyName, contactInfo[0], contactInfo[1], contactInfo[2], companyDescription, categoryId)
      .then((data) => {data})
      .catch((error) => {console.error('Error fetching username:', error);}
    );

    // Wait until promises are returned for all three axios calls before rerouting
    Promise.all([pRemoveServices, pRemoveClients, pAddServices, pAddClients, pUpdateProfile])
      .then(() => {
        window.scrollTo(0, 0);
        navigate(`/manage/profile/view`)
      })
      .catch((error) => {console.error('Error fetching promises:', error);}
    );
  }

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
    <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Services and Clients</h2>
    <div className="grid grid-cols-3 pb-20 gap-x-20">
        <div className="form-group flex flex-col gap-y-6">
                <p className="pt-4 pb-1 text-md font-semibold text-blue-600">SERVICES</p>
                {whatwedoData.map((item, index) => (
                  <div key={index} className="flex w-full justify-between gap-x-2">
                    <input
                      key={index} 
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
                    >+ Add new service
                </SecondaryButton>

        </div>
        <div className="form-group flex flex-col gap-y-6">
                <p className="pt-4 pb-1 text-md font-semibold text-blue-600">CLIENTS</p>
                {clientData.map((item, index) => (
                  <div key={index} className="flex w-full justify-between gap-x-2">
                  <input
                    key={index} 
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
                    >+ Add new client
                </SecondaryButton>
        </div>
    </div>
      <div className="pt-20 flex gap-x-6 items-center">
          <SecondaryButton className="px-20" onClick={() => {window.scrollTo(0, 0); navigate("/manage/profile/view")}}>Cancel</SecondaryButton>
          <PrimaryButton 
            className="px-20" 
            onClick={() => {handleSave()}}>Save</PrimaryButton>
          {saving && <p>Saving...</p>}
      </div>
  </div>
)
};

export default EditView;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClients, addServices, getCurrentBusinessInfo, removeClients, removeServices, updateCurrentBusinessProfile } from "../../../api/business.js";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";
import DeleteIcon from "../../Icons/DeleteIcon.jsx";

const EditView = () => {

  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [companyName, setCompanyName] = useState("Loading...");
  const [contactInfo, setContactInfo] = useState(["Loading...", "Loading...", "Loading..."]);
  const [companyDescription, setCompanyDescription] = useState("Loading...");
  const [whatwedoData, setWhatWeDoData] = useState([{description: "Loading..."}]);
  const [clientData, setClientData] = useState([{description: "Loading..."}]);

  const [originalWhatWeDoData, setOriginalWhatWeDoData] = useState([{}]);
  const [originalClientData, setOriginalClientData] = useState([{}]);

  useEffect(() => {
    getCurrentBusinessInfo()
      .then((res) => {
        setCompanyDescription(res.data.businessDescription);
        setContactInfo([res.data.contactName, res.data.contactPhone, res.data.contactEmail]);
        setCompanyName(res.data.businessName);
        setWhatWeDoData(res.data.services.map(service => ({description: service.description})));
        setClientData(res.data.clients.map(client => ({description: client.description})));

        setOriginalWhatWeDoData(res.data.services);
        setOriginalClientData(res.data.clients);
      })
      .catch((error) => {console.error('Error fetching username:', error);});
  }, []);

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
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

    console.log(originalWhatWeDoData);
    console.log([serviceIds, clientIds, serviceDescriptions, clientDescriptions]);

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

    const pUpdateProfile = updateCurrentBusinessProfile(companyName, contactInfo[0], contactInfo[1], contactInfo[2], companyDescription)
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
                autoComplete="new-password" 
                required
            />
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
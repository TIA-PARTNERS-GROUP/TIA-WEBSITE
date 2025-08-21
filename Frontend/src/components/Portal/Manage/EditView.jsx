import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";

const EditView = () => {

  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('DyCom Group');
  const [contactInfo, setContactInfo] = useState(["Mark Stecher", "123 456 7890", "mark@dycom.com.au"]);
  const [companyDescription, setCompanyDescription] = useState('DyCom is a seasoned and experienced Network Services\
 company that takes great pride in offering a wide-range of sophisticated IT products\
  and services designed to meet the ever-growing and ever-expanding needs of our clients\
   and the businesses they operate.');
  const [whatWeDoData, setWhatWeDoData] = useState([
    {description: "DyCom Wireless - Wireless solutions"},
    {description: "DyCom SmartStaff - Staff provision"},
    {description: "DyCom Security - Security, surveillance and alarm services"},
    {description: "DyCom Technology - Network services for IT products"},
    {description: "DyCom Cloud - Compute cloud environments"},
  ]);
  const [clientData, setClientData] = useState([
    {description: "Small technology businesses"}
  ]);

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
    const updatedData = [...whatWeDoData];
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
    setWhatWeDoData([...whatWeDoData, { description: ""}]);
  };
  const handleAddClient = () => {
    setClientData([...clientData, { description: ""}]);
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
                {whatWeDoData.map((item, index) => (
                  <input
                    key={index} 
                    type="text"
                    value={item.description} 
                    onChange={(e) => handleWhatWeDoChange(index, e.target.value)}
                    className="border-b-2 placeholder-gray-300" 
                    placeholder="What does your company do?..." 
                  />
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
                  <input
                    key={index} 
                    type="text"
                    value={item.description} 
                    onChange={(e) => handleClientChange(index, e.target.value)}
                    className="border-b-2 placeholder-gray-300" 
                    placeholder="What type of client does your company serve?..." 
                  />
                ))}
                <SecondaryButton 
                    className="relative -translate-y-4 text-sm block text-center py-0.5 mt-2 max-w-[185px]"
                    onClick={handleAddClient}
                    >+ Add new client
                </SecondaryButton>
        </div>
    </div>
    <div className="pt-20 flex gap-x-6">
        <SecondaryButton className="px-20" onClick={() => {window.scrollTo(0, 0); navigate("/manage/profile/view")}}>Cancel</SecondaryButton>
        <PrimaryButton 
          className="px-20" 
          onClick={() => {window.scrollTo(0, 0);
          navigate(`/manage/profile/view`, {
          state: { 
          companyName: companyName,
          companyDescription: companyDescription,
          whatWeDoData: whatWeDoData,
          clientData: clientData,
          contactInfo: contactInfo
          },
      })}}>Save</PrimaryButton>
    </div>
  </div>
)
};

export default EditView;
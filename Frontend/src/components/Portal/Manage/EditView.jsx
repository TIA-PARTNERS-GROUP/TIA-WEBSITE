import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Button/PrimaryButton";
import SecondaryButton from "../../Button/SecondaryButton";

const companyName = "DyCom Group";
const contactInfo = ["Mark Stecher", "123 456 7890", "mark@dycom.com.au"];
const companyDescription = 'DyCom is a seasoned and experienced Network Services\
 company that takes great pride in offering a wide-range of sophisticated IT products\
  and services designed to meet the ever-growing and ever-expanding needs of our clients\
   and the businesses they operate.';

const EditView = () => {

  const navigate = useNavigate();

  return (
  <div className="bg-white rounded-xl px-8 py-2">
    <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800 pb-4">Edit Profile</h2>
    <div className="form-group">
            <p className="pt-4 pb-1 text-md font-semibold text-blue-600">COMPANY NAME</p>
            <input 
                type="text" 
                value={companyName}
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
                    className="border-2 placeholder-gray-300 w-full" 
                    placeholder="Give a brief description of your company..." 
                    autoComplete="new-password" 
                    required
                />
    </div>
    <h2 className="pt-10 text-xl @md:text-xl font-bold text-black-800 pb-4">Services and Clients</h2>
    <div className="grid grid-cols-3 pb-20">
        <div className="form-group">
                <p className="pt-4 pb-1 text-md font-semibold text-blue-600">SERVICES</p>
        </div>
        <div className="form-group">
                <p className="pt-4 pb-1 text-md font-semibold text-blue-600">CLIENTS</p>
        </div>
    </div>
    <div className="pt-20 flex gap-x-6">
        <SecondaryButton className="px-20" onClick={() => navigate("/manage/profile/view")}>Cancel</SecondaryButton>
        <PrimaryButton className="px-20">Save</PrimaryButton>
    </div>
  </div>
)
};

export default EditView;
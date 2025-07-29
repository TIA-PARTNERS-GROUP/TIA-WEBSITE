import ContactPersonIcon from "../../Icons/ContactPersonIcon";
import EmailIcon from "../../Icons/Emailicon";
import PhoneIcon from "../../Icons/PhoneIcon";

const ContactInfo = ({ contactInfo }) => (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <div className="grid grid-cols-3 gap-20 pt-10">
        <div>
            <div className="flex gap-2 pl-10">
                <ContactPersonIcon className="w-6 h-6" />
                <p className="pt-0.5 pl-2 text-sm font-semibold">CONTACT PERSON</p>
            </div>
            <p className="pl-10 pt-1 text-2xl">{contactInfo[0]}</p>
        </div>
        <div>
            <div className="flex gap-2 pl-10">
                <PhoneIcon className="w-6 h-6" />
                <p className="pt-0.5 pl-2 text-sm font-semibold">CALL US AT</p>
            </div>
            <p className="pl-10 pt-1 text-2xl">{contactInfo[1]}</p>
        </div>
        <div>
            <div className="flex gap-2 pl-10">
                <EmailIcon className="w-6 h-6" />
                <p className="pt-0.5 pl-2 text-sm font-semibold">EMAIL US AT</p>
            </div>
            <p className="pl-10 pt-1 text-2xl">{contactInfo[2]}</p>
        </div>
    </div>
  </div>
)

export default ContactInfo;
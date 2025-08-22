import ContactPersonIcon from "../../Icons/ContactPersonIcon";
import EmailIcon from "../../Icons/Emailicon";
import PhoneIcon from "../../Icons/PhoneIcon";

const ContactInfo = ({ contactInfo }) => (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <div className="grid grid-cols-3 sm:gap-0 2xl:gap-20 sm:py-2 2xl:pt-10">
        <div>
            <div className="flex gap-2 sm:pl-2 2xl:pl-10">
                <ContactPersonIcon className="sm:w-3 sm:h-3 2xl:w-6 2xl:h-6 sm:translate-y-1" />
                <p className="pt-0.5 2xl:pl-2 sm:text-xs 2xl:text-sm font-semibold">CONTACT PERSON</p>
            </div>
            <p className="sm:pl-2 2xl:pl-10 pt-1 sm:text-xs md:text-sm lg:text-lg 2xl:text-2xl">{contactInfo[0]}</p>
        </div>
        <div>
            <div className="flex gap-2 sm:pl-2 2xl:pl-10">
                <PhoneIcon className="sm:w-3 sm:h-3 2xl:w-6 2xl:h-6 sm:translate-y-1" />
                <p className="pt-0.5 2xl:pl-2 sm:text-xs 2xl:text-sm font-semibold">CALL US AT</p>
            </div>
            <p className="sm:pl-2 2xl:pl-10 pt-1 sm:text-xs md:text-sm lg:text-lg 2xl:text-2xl">{contactInfo[1]}</p>
        </div>
        <div>
            <div className="flex gap-2 sm:pl-2 2xl:pl-10">
                <EmailIcon className="sm:w-3 sm:h-3 2xl:w-6 2xl:h-6 sm:translate-y-1" />
                <p className="pt-0.5 2xl:pl-2 sm:text-xs 2xl:text-sm font-semibold">EMAIL US AT</p>
            </div>
            <p className="sm:pl-2 2xl:pl-10 pt-1 sm:text-xs md:text-sm lg:text-lg 2xl:text-2xl">{contactInfo[2]}</p>
        </div>
    </div>
  </div>
)

export default ContactInfo;
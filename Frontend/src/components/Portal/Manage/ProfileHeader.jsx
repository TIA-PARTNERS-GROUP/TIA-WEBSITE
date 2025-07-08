import Banner from "../../../assets/images/manage-profile-placeholder.jpg";

const companyName = "DyCom Group";


const ProfileHeader = () => (
  <div className="container mx-auto flex flex-col items-start px-0 py-4 text-left">
    <img
      src={Banner}
      alt="Profile Banner"
      className="w-full h-[350px] object-cover object-[0%_20%]"
    />
    <h2 className="pt-10 text-4xl @md:text-3xl font-semibold text-black-800">{companyName}</h2>
  </div>
)

export default ProfileHeader;
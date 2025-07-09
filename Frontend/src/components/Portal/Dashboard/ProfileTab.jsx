import ProfileIcon from "../../Icons/ProfileIcon";

// Placeholder variable for username and progress bar value
const username = "Mark";
const progress = 80;

const ProfileTab = () => (
  <div className="container mx-auto flex flex-col items-start px-0 pb-4 text-left">
    <div className="flex items-start gap-4 w-full">
      <ProfileIcon className="w-20 h-20 @md:w-14 @md:h-14 text-black mt-0.5" />
      <div className="flex-1">
        <h2 className="pt-1 text-2xl @md:text-3xl font-semibold text-black-800">Welcome back, {username}!</h2>
        <div className="flex items-center gap-3 max-w-[24%]">
          <div className="flex-1 bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }} // Width based on progress
            ></div>
          </div>
          <p className="text-right text-sm text-gray-500 mt-1">
            {progress}% complete
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default ProfileTab;
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../Icons/ProfileIcon";

const progress = 80;

const ProfileTab = (props) => {

  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto flex flex-col items-start pt-4 pb-4 text-left">
      <div className="flex items-start sm:gap-0 2xl:gap-3 w-full">
        <button onClick={() => (navigate("/manage/profile"))}><ProfileIcon className="sm:w-10 sm:h-10 2xl:w-14 2xl:h-14 md:w-14 md:h-14 text-black mt-0.5" /></button>
        
        <div className="flex-1">
          <h2 className="2xl:pt-1 sm:text-xs md:text-sm 2xl:text-lg font-semibold text-black-800">Welcome back, {props.data.firstName}!</h2>
          <div className="flex items-center gap-3 sm:w-[50%] 2xl:w-[26%]">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }} // Width based on progress
              ></div>
            </div>
            <p className="text-right sm:text-xs text-sm text-gray-500 mt-1">
              {progress}% complete
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileTab;
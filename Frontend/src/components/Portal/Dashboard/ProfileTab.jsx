import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCurrentUserInfo } from "../../../api/user";
import { useLoading } from "../../../utils/LoadingContext";
import ProfileIcon from "../../Icons/ProfileIcon";

const ProfileTab = () => {

  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const progress = 80;

  useEffect(() => {
    const fetchUserInfo = async () => {
      startLoading();
      
      try {
        const res = await getCurrentUserInfo();
        setUsername(res.data.data.firstName);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        stopLoading();
      }
    };

    fetchUserInfo();
  }, []);
  
  return (
    <div className="container mx-auto flex flex-col items-start pt-4 pb-4 text-left">
      <div className="flex items-start sm:gap-0 2xl:gap-3 w-full">
        <button onClick={() => (navigate("/manage/profile"))}><ProfileIcon className="sm:w-10 sm:h-10 2xl:w-14 2xl:h-14 md:w-14 md:h-14 text-black mt-0.5" /></button>
        
        <div className="flex-1">
          <h2 className="2xl:pt-1 sm:text-xs md:text-sm 2xl:text-lg font-semibold text-black-800">
            Welcome back{userName ? `, ${userName}` : ''}!
          </h2>
          <div className="flex items-center gap-3 sm:w-[50%] 2xl:w-[26%]">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }} // Width based on progress
              ></motion.div>
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
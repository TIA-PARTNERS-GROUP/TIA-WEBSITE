import { useParams } from 'react-router-dom';
import { useState } from 'react';
import SecondaryButton from "../../Button/SecondaryButton";
import DeleteIcon from "../../Icons/DeleteIcon";
import SquareSelectIcon from "../../Icons/SquareSelectIcon";
import TickIcon from "../../Icons/TickIcon";

const UserArtifactsList = () => {
    const { manageType } = useParams();
    const [isChecked, setIsChecked] = useState(false);

    return (
    <div>
      <div className="grid grid-cols-[6fr_0.7fr_0.7fr] gap-4 w-full my-auto">
          <SecondaryButton
              onClick={() => (window.location.href = `/manage/${manageType}/write`)}
              className="text-sm block text-center py-0.5 mt-2 max-w-[130px]"
              >
              + Add new
          </SecondaryButton>
        <div className="grid grid-cols-[1fr_2fr] items-center justify-center">
          
          <div className="relative">
            
            <button 
            onClick={() => setIsChecked(!isChecked)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center w-8 h-8"
            aria-label="Notifications"
            >
              <SquareSelectIcon className="w-5 h-5 @md:w-5 @md:h-5 text-black" />
              {isChecked && (
                                <TickIcon className="absolute w-5 h-5 text-black" />
                            )}
            </button>
          </div>
          <p>Mark all</p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] items-center justify-center">
          <button 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center w-8 h-8s"
            aria-label="Notifications"
            >
              <DeleteIcon className="w-5 h-5 @md:w-5 @md:h-5 text-black" />
            </button>
          <p>Delete</p>
        </div>
      </div>     
    </div>
    )
};

export default UserArtifactsList;
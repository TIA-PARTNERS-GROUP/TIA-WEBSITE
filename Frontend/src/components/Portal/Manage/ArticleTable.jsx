import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUserCaseStudies, removeCaseStudy } from "../../../api/caseStudies";
import { getCurrentUserTestimonials, removeTestimonial } from "../../../api/testimonials";
import { getCurrentUserBlogs, removeBlog } from "../../../api/blogs";

import { useLoading } from "../../../utils/LoadingContext";

import SecondaryButton from "../../Button/SecondaryButton";
import DeleteIcon from "../../Icons/DeleteIcon";
import SquareSelectIcon from "../../Icons/SquareSelectIcon";
import TickIcon from "../../Icons/TickIcon";

const ArticleTable = () => {

  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const { manageType } = useParams();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [ tableData, setTableData ] = useState([{title: "Loading...", date: "Loading..."}]);

  useEffect(() => {
  const fetchData = async () => {
    startLoading();
    
    try {
      let response;
      switch (manageType) {
        case "case-studies":
          response = await getCurrentUserCaseStudies();
          break;
        case "testimonials":
          response = await getCurrentUserTestimonials();
          break;
        case "blogs":
          response = await getCurrentUserBlogs();
          break;
        default:
          return;
      }
      
      const data = manageType === "blogs" ? response.data.posts : 
                  manageType === "testimonials" ? response.data.testimonials : 
                  response.data.caseStudies;
      
      setTableData(data);
      
      const initialCheckedState = data.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});
      
      setCheckedItems(initialCheckedState);
    } catch (error) {
      console.error(`Error fetching ${manageType}:`, error);
    } finally {
      stopLoading();
    }
  };

  fetchData();
}, []);

  useEffect(() => {
    const allChecked = Object.values(checkedItems).length > 0 && 
                      Object.values(checkedItems).every(isChecked => isChecked);
    setIsAllChecked(allChecked);
  }, [checkedItems]);
  
  const formatDate = (dateString) => {
    if (dateString === "Loading..."){return dateString};
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
  };

  const formatStatus = (status) => {
    switch (status) {
      case "published":
        return "Published";
      case "draft":
        return "Draft";
      default:
        return "Draft";
    }
  }

  const handleAddNewClick = () => {
    navigate(`/manage/${manageType}/write`);
  }

  const handleCheckboxClick = (id, e) => {
    e.stopPropagation(); // Prevent row click event
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRowClick = (row) => {
    navigate(`/manage/${manageType}/individual-view`, {
      state: {
        id: row.id,
        title: row.title,
        date: row.date,
        content: row.content,
        status: row.status
      },
    });
  };

  const handleMarkAll = () => {
    const newAllCheckedState = !isAllChecked;
    setIsAllChecked(newAllCheckedState);

    const updatedCheckedItems = {};
    Object.keys(checkedItems).forEach(id => {
      updatedCheckedItems[id] = newAllCheckedState;
    });
    setCheckedItems(updatedCheckedItems);
  }

  const handleDeleteSelected = async () => {

    const selectedIds = Object.entries(checkedItems)
    .filter(([id, isSelected]) => isSelected)
    .map(([id]) => Number(id));
  
    console.log('Deleting items with IDs:', selectedIds);
    
    if (selectedIds.length === 0) return;
    
    try {
      // Make all API calls first
      const deletePromises = selectedIds.map(id => {
        switch (manageType) {
          case "case-studies":
            return removeCaseStudy(id);
          case "testimonials":
            return removeTestimonial(id);
          case "blogs":
            return removeBlog(id);
          default:
            return Promise.resolve();
        }
      });
    
    // Wait for all delete operations to complete
    await Promise.all(deletePromises);
    
    // Only update state if API calls succeed
    setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setCheckedItems(prev => {
      const updatedCheckedItems = { ...prev };
      selectedIds.forEach(id => {
        delete updatedCheckedItems[id];
      });
      return updatedCheckedItems;
    });
    
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-[6fr_0.7fr_0.7fr] gap-4 w-full my-auto">
          <SecondaryButton
              onClick={() => (handleAddNewClick())}
              className="sm:text-xs text-sm block text-center py-0.5 mt-2 sm:max-w-[120px] max-w-[130px]"
              >
              + Add new
          </SecondaryButton>
        <div className="grid grid-cols-[1fr_2fr] items-center justify-center">   
          <div className="relative">
            <button 
            onClick={() => handleMarkAll()}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center w-8 h-8"
            aria-label="Notifications"
            >
              <SquareSelectIcon className="w-5 h-5 @md:w-5 @md:h-5 text-black" />
              {isAllChecked && (
                <TickIcon className="absolute w-5 h-5 text-black" />
              )}
            </button>
          </div>
          <p className="sm:text-xs">Mark all</p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] items-center justify-center">
          <button
            onClick={handleDeleteSelected} 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center w-8 h-8s"
            aria-label="Notifications"
            >
              <DeleteIcon className="w-5 h-5 @md:w-5 @md:h-5 text-black" />
            </button>
          <p className="sm:text-xs">Delete</p>
        </div>   
      </div>
  <div className="sm:p-4 md:p-6 lg:p-8">
    <table className="relative w-full sm:text-xs text-left border-y table-auto"> 
      <thead>
        <tr>
          <th className="border-y-2 border-black py-2">Title</th>
          <th className="border-y-2 border-black py-2">Date</th>
          <th className="border-y-2 border-black py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((row, index) => (
          <tr 
            key={index}
            className="group hover:bg-gray-100 hover:cursor-pointer" 
            onClick={() => {handleRowClick(row)}}>
            <td className="items-center border-y py-2 font-medium">{row.title}</td>
            <td className="items-center border-y py-2 font-medium">{formatDate(row.date)}</td>
            <td className="flex items-center justify-between border-y font-medium">
              <div>{formatStatus(row.status)}</div>
              <div className="relative">  
                <button 
                onClick={(e) => handleCheckboxClick(row.id, e)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center w-8 h-8"
                aria-label="Notifications"
                >
                  <SquareSelectIcon className="w-5 h-5 @md:w-5 @md:h-5 text-black" />
                  {checkedItems[row.id] && (
                    <TickIcon className="absolute w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
  )
}

export default ArticleTable;
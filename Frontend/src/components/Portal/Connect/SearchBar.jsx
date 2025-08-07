import { useState } from "react";
import SearchIcon from "../../Icons/SearchIcon";
import SecondaryButton from "../../Button/SecondaryButton";
import PlusIcon from "../../Icons/PlusIcon";
import FilterIcon from "../../Icons/FilterIcon";

const SearchBar = () => {
    const [searchText, setSearchText] = useState();
    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    }

    return (
    <form className="text-black pb-20 pr-10 w-full">
        <div className="flex justify-between"> 
            <div className="flex gap-x-2 border-b-2 border-gray-500 pb-1 w-1/2">
                <SearchIcon /> 
                <input 
                            type="search" 
                            value={searchText}
                            onChange={handleSearchTextChange}
                            className="placeholder w-full focus:outline-none" 
                            placeholder="Search..." 
                            autoComplete="new-password" 
                        />
            </div>
            <div className="flex gap-x-2">
                <div className="flex">
                    <SecondaryButton className="px-2 py-0 flex gap-x-1 items-center">
                        SORT BY
                        <PlusIcon className="w-5 h-5"/>
                    </SecondaryButton>
                </div>
                <div className="flex">
                    <SecondaryButton className="px-2 py-0 flex gap-x-1 items-center">
                        FILTER
                        <FilterIcon className="w-5 h-5"/>
                    </SecondaryButton>    
                </div>
            </div>
        </div>  
    </form>
    )
}

export default SearchBar;

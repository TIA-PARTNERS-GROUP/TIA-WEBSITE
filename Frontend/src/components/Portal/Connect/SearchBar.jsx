import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import SearchIcon from "../../Icons/SearchIcon";
import SecondaryButton from "../../Button/SecondaryButton";
import PlusIcon from "../../Icons/PlusIcon";
import FilterIcon from "../../Icons/FilterIcon";

const SearchBar = () => {
    const navigate = useNavigate();
    const { partnerType, searchType } = useParams();

    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [queryEntered, setQueryEntered] = useState(false);
    const [searchText, setSearchText] = useState('');
    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/connect/${partnerType}/${searchType}?q=${searchText}`);
    };

    useEffect(() => {
            const urlQuery = searchParams.get('q') || '';
            setSearchText(urlQuery);
            setQueryEntered(!!urlQuery);
        }, [location.search]);

    return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="text-black pb-10 pr-10 w-full">
            <div className="flex justify-between"> 
                <div className="flex gap-x-2 border-b-2 border-gray-500 pb-1 w-1/2 items-center">
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
        {queryEntered && <p className="pb-8 text-lg">Showing results for: <strong>{searchParams.get('q') || ''}</strong></p>}
    </div>
    )
}

export default SearchBar;

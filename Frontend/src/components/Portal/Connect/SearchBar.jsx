import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { useLoading } from "../../../utils/LoadingContext";
import SearchIcon from "../../Icons/SearchIcon";
import SecondaryButton from "../../Button/SecondaryButton";
import PlusIcon from "../../Icons/PlusIcon";
import FilterIcon from "../../Icons/FilterIcon";
import CloseIcon from "../../Icons/CloseIcon";
import ChevronDownIcon from "../../Icons/ChevronDownIcon";
import ChevronUpIcon from "../../Icons/ChevronUpIcon";
import PrimaryButton from "../../Button/PrimaryButton";
import { getCategoriesList } from "../../../api/categories";

const SearchBar = () => {
    const navigate = useNavigate();
    const { partnerType, searchType } = useParams();

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { startLoading, stopLoading } = useLoading();
    const [queryEntered, setQueryEntered] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [openSections, setOpenSections] = useState({});
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            setLoading(true);
            startLoading();
            const categoriesData = await getCategoriesList();
            setCategories(categoriesData.data.categories);
          } catch (err) {
            console.error("Error fetching categories:", err);
          } finally {
            stopLoading();
            setLoading(false);
          }
        };
    
        fetchCategories();
      }, []);

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
    
        if (searchText) {
            params.append('q', searchText);
        }
        
        const selectedCategories = selectedFilters['business-category'];
        if (selectedCategories && selectedCategories.length > 0) {
            params.append('categories', selectedCategories.join(','));
        }
        
        const connectionStatus = selectedFilters['connection-status'];
        if (connectionStatus) {
            const statusParam = connectionStatus.toLowerCase().replace(/\s+/g, '-');
            params.append('status', statusParam);
        }
        
        params.append('sort', selectedSort);

        navigate(`/connect/${partnerType}/${searchType}?${params.toString()}`);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        const urlQuery = searchParams.get('q') || '';
        const categoriesParam = searchParams.get('categories') || '';
        const urlCategories = categoriesParam ? categoriesParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id)) : [];
        const urlStatus = searchParams.get('status') || '';
        
        setSearchText(urlQuery);
        setQueryEntered(!!urlQuery || urlCategories.length > 0 || !!urlStatus);
        
        setSelectedFilters(prev => ({
            ...prev,
            'business-category': urlCategories,
            'connection-status': urlStatus 
                ? urlStatus.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                : null
        }));
    }, [location.search]);

    const sortOptions = [
        { value: 'name-asc', label: 'Business Name (A-Z)' },
        { value: 'name-desc', label: 'Business Name (Z-A)' }
    ];

    const filterCategories = [
        {
            id: 'business-category',
            title: 'Business Category',
            options: loading 
                ? [{ id: 'loading', label: 'Loading categories...' }] : ''
                    ? [{ id: 'error', label: 'Failed to load categories' }]
                    : categories.map(cat => ({ 
                        id: cat.id, 
                        label: formatString(cat.name || cat.title || `Category ${cat.id}`)
                    })),
            type: 'checkbox'
        },
        {
            id: 'connection-status',
            title: 'Connection Status',
            options: ['Connected', 'Not Connected'],
            type: 'radio'
        }
    ];

    const toggleSort = () => {
        setIsSortOpen(!isSortOpen);
    };

    const handleSortSelect = (value) => {
        setSelectedSort(value);
        setIsSortOpen(false);

        const params = new URLSearchParams();
        
        if (searchText) {
            params.append('q', searchText);
        }
        
        const selectedCategories = selectedFilters['business-category'];
        if (selectedCategories && selectedCategories.length > 0) {
            params.append('categories', selectedCategories.join(','));
        }
        
        const connectionStatus = selectedFilters['connection-status'];
        if (connectionStatus) {
            const statusParam = connectionStatus.toLowerCase().replace(/\s+/g, '-');
            params.append('status', statusParam);
        }
        
        params.append('sort', value);
        
        navigate(`/connect/${partnerType}/${searchType}?${params.toString()}`);
    };

    const [selectedFilters, setSelectedFilters] = useState(
        filterCategories.reduce((acc, category) => {
            acc[category.id] = category.type === 'radio' ? null : [];
            return acc;
        }, {})
    );

    const handleFilterChange = (categoryId, optionId, isChecked, inputType) => {

        if (loading) return;

        setSelectedFilters(prev => {
            if (inputType === 'radio') {
                return {
                    ...prev,
                    [categoryId]: isChecked ? optionId : null
                };
            } else {
                if (isChecked) {
                    return {
                        ...prev,
                        [categoryId]: [...prev[categoryId], optionId]
                    };
                } else {
                    return {
                        ...prev,
                        [categoryId]: prev[categoryId].filter(id => id !== optionId)
                    };
                }
            }
        });
    };

    const resetFilters = () => {
        setSelectedFilters(
            filterCategories.reduce((acc, category) => {
                acc[category.id] = category.type === 'radio' ? null : [];
                return acc;
            }, {})
        );
        
        navigate(`/connect/${partnerType}/${searchType}?q=${searchText}`);
        setIsFilterOpen(false);
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        
        if (searchText) {
            params.append('q', searchText);
        }
        
        const selectedCategories = selectedFilters['business-category'];
        if (selectedCategories && selectedCategories.length > 0) {
            // Send as comma-separated string
            params.append('categories', selectedCategories.join(','));
        }

        const connectionStatus = selectedFilters['connection-status'];
        if (connectionStatus) {
            const statusParam = connectionStatus.toLowerCase().replace(/\s+/g, '-');
            params.append('status', statusParam);
        }

        params.append('sort', selectedSort);
        
        setIsFilterOpen(false);
        navigate(`/connect/${partnerType}/${searchType}?${params.toString()}`);
    };

    const getCategoryLabelById = (id) => {
        const category = categories.find(cat => cat.id === id);
        return formatString(category ? (category.name || category.title || `Category ${id}`) : `Category ${id}`);
    };

    function formatString(str) {
        if (!str) {return null};
        return str
            .split('-') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
            .join(' '); 
    }


    return (
    <div className="w-full">
        <div onSubmit={handleSubmit} className="text-black sm:text-xs pb-10 pr-10 w-full">
            <div className="flex justify-between"> 
                <form onSubmit={handleSubmit} className="flex lg:translate-x-4 2xl:translate-x-10 gap-x-2 border-b-2 border-gray-500 pb-1 w-1/2 items-center">
                    <SearchIcon /> 
                    <input 
                                type="search" 
                                value={searchText}
                                onChange={handleSearchTextChange}
                                className="placeholder w-full focus:outline-none" 
                                placeholder="Search..." 
                                autoComplete="new-password" 
                            />
                </form>
                <div className="flex gap-x-2 relative">
                    <div className="flex relative">
                        <SecondaryButton className="sm:px-1 lg:px-2 py-0 flex gap-x-1 items-center" onClick={toggleSort}>
                            SORT BY
                            <PlusIcon className="sm:w-3 sm:h-3 w-5 h-5"/>
                        </SecondaryButton>
                        {/* Sort Dropdown */}
                    {isSortOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                            {sortOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                        selectedSort === option.value ? 'bg-blue-50 text-blue-600' : ''
                                    }`}
                                    onClick={() => handleSortSelect(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                    </div>
                    <div className="flex">
                        <SecondaryButton className="sm:px-1 lg:px-2 py-0 flex gap-x-1 items-center" onClick={toggleFilter}>
                            FILTER
                            <FilterIcon className="sm:w-3 sm:h-3 w-5 h-5"/>
                            {loading && (
                                <span className="ml-1 text-xs">Loading...</span>
                            )}
                        </SecondaryButton>    
                    </div>
                </div>
            </div>  
        </div>
        {queryEntered && (
            <p className="pb-8 sm:text-xs 2xl:text-lg">
                Showing results for: 
                {searchParams.get('q') && <strong> {searchParams.get('q')}</strong>}
                <br></br>
                {searchParams.get('categories') && (
                    <span> <br></br>Business Categories: <strong>
                        {searchParams.get('categories').split(',').map(id => {
                            const categoryId = parseInt(id);
                            return getCategoryLabelById(categoryId);
                        }).join(', ')}
                    </strong></span>
                )}
                <br></br>
                {searchParams.get('status') && (
                    <span> Connection Status: <strong>{searchParams.get('status') === "connected" ? "Connected" : "Not Connected"}</strong></span>
                )}
            </p>
        )}

        {/* Filter Sidebar */}
            <div className={`fixed inset-0 z-50 ${isFilterOpen ? 'block' : 'hidden'}`}>
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={toggleFilter}
                ></div>
                
                <div className="absolute right-0 top-0 h-full 2xl:w-[24%] bg-white shadow-xl overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filter</h2>
                            <button onClick={toggleFilter} className="p-1">
                                <CloseIcon className="w-4 h-4" />
                            </button>
                        </div>
                        
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-2">Loading categories...</span>
                            </div>
                        ) : (
                        <div className="space-y-4">
                            {filterCategories.map(category => (
                                <div key={category.id} className="border-b border-gray-200 pb-4">
                                    <button 
                                        className="flex justify-between items-center w-full text-left font-medium py-2 focus:outline-none"
                                        onClick={() => toggleSection(category.id)}
                                    >
                                        <span>{category.title}</span>
                                        {openSections[category.id] ? (
                                            <ChevronUpIcon className="w-5 h-5" />
                                        ) : (
                                            <ChevronDownIcon className="w-5 h-5" />
                                        )}
                                    </button>

                                    {openSections[category.id] && (
                                        <div className="pl-2 space-y-2 mt-2">
                                            {category.options.map(option => {
                                                const optionValue = typeof option === 'object' ? option.id : option;
                                                const optionLabel = typeof option === 'object' ? option.label : option;
                                                
                                                return (
                                                    <label key={optionValue} className="flex items-center py-1">
                                                        <input 
                                                            type={category.type}
                                                            name={category.type === 'radio' ? category.id : undefined}
                                                            className="mr-3 h-4 w-4 text-blue-600 rounded"
                                                            checked={
                                                                category.type === 'radio' 
                                                                    ? selectedFilters[category.id] === optionValue
                                                                    : selectedFilters[category.id].includes(optionValue)
                                                            }
                                                            onChange={(e) => handleFilterChange(
                                                                category.id, 
                                                                optionValue, 
                                                                e.target.checked,
                                                                category.type
                                                            )}
                                                        />
                                                        <span>{optionLabel}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        )}
                        
                        <div className="mt-8 flex space-x-4">
                            <SecondaryButton className="px-4 py-2" onClick={resetFilters}>
                                Reset
                            </SecondaryButton>
                            <PrimaryButton className="px-4 py-2" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    applyFilters();
                                }}>
                                Apply
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default SearchBar;
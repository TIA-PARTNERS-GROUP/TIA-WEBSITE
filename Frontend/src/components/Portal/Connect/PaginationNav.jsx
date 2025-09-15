import React from 'react';

const PaginationNav = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
    const generatePaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);
            
            if (currentPage <= 3) {
                endPage = 4;
            }
            
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }
            
            if (startPage > 2) {
                pages.push('...');
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            
            pages.push(totalPages);
        }
        
        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-8 mb-4 w-full">
            <nav className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    &lt;
                </button>
                
                {/* Page Numbers */}
                {generatePaginationNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 py-1">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded border ${
                                currentPage === page
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    )
                ))}
                
                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    &gt;
                </button>
            </nav>
            
            {/* Optional: Show total results */}
            <span className="ml-4 text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </span>
        </div>
    );
};

export default PaginationNav;
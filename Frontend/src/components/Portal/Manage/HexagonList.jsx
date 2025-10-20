const HexagonList = ({ listData }) => {
  // Group items by category if categories exist
  const hasCategories = listData.some(item => item.category);
  
  if (hasCategories) {
    // Group by category
    const groupedData = listData.reduce((acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    let globalIndex = 0;

    return (
      <div className="space-y-6">
        {Object.entries(groupedData).map(([category, items]) => (
          <div key={category} className="space-y-4">
            {/* Category Header */}
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {category}
              </h3>
            </div>
            
            {/* Items for this category */}
            <div className="space-y-0">
              {items.map((item, categoryIndex) => {
                globalIndex++;
                const isLastInCategory = categoryIndex === items.length - 1;
                const isLastOverall = globalIndex === listData.length;
                
                return (
                  <div 
                    key={categoryIndex} 
                    className={`py-3 ${!isLastInCategory ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-6 w-full items-center">
                      {/* Hexagon with number */}
                      <div className="relative w-10 h-12 min-w-[14px]">
                        <div className="
                          absolute inset-0 bg-violet-600
                          [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
                        "></div>
                        
                        <div className="
                          absolute inset-[2px] bg-white
                          [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
                          flex items-center justify-center
                          text-violet-600 font-bold text-sm
                        ">
                          {globalIndex}
                        </div>
                      </div>
                      
                      {/* Item content */}
                      <div>
                        <p className="sm:text-xs lg:text-sm 2xl:text-md text-gray-800 font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Original layout for non-categorized data with lines
  return (
    <div className="space-y-0">
      {listData.map((item, index) => (
        <div 
          key={index} 
          className={`py-3 ${index < listData.length - 1 ? 'border-b border-gray-100' : ''}`}
        >
          <div className="grid grid-cols-[auto_1fr] gap-6 w-full items-center">
            {/* Hexagon with number */}
            <div className="relative w-10 h-12 min-w-[14px]">
              <div className="
                absolute inset-0 bg-violet-600
                [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
              "></div>
              
              <div className="
                absolute inset-[2px] bg-white
                [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
                flex items-center justify-center
                text-violet-600 font-bold text-sm
              ">
                {index + 1}
              </div>
            </div>
            
            {/* Item content */}
            <div>
              <p className="sm:text-xs lg:text-sm 2xl:text-md text-gray-800 font-medium">
                {item.description}
              </p>
              {item.category && (
                <p className="sm:text-xs lg:text-sm 2xl:text-sm text-gray-500 mt-1">
                  {item.category}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HexagonList;
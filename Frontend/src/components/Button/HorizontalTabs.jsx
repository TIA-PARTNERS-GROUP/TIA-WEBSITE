import { useState } from 'react';

const HorizontalTabs = ({tabData}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
    <ul className="flex flex-wrap text-md font-medium text-center text-gray-500 border-b border-gray-200">
      {tabData.map((tab, index) => (
        <li key={index} className="me-2">
          <button 
            onClick={() => setActiveTab(index)}
            className={`inline-block py-2 px-6 text-white rounded-t-lg ${
              activeTab === index
                ? 'bg-blue-600'
                : 'bg-hero_portal-side_bar hover:bg-gray-700'
            }`}>
                {tab.description}</button>
        </li>
        
      ))}
    </ul>
    );
};

export default HorizontalTabs;
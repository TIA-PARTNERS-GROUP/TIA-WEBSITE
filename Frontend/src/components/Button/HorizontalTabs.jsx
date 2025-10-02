import { Link } from 'react-router-dom';

const tabHierarchy = {
  'profile': 1,
  'connections': 2,
  'case-studies': 3,
  'testimonials': 4,
  'blogs': 5,
  'mastermind': 6,

  'alliance': 1,
  'complementary': 2,

  'smartconnect': 1,
  'quick-search': 2,

  'find': 1,
  'submit': 2,
  'history': 3
};

const HorizontalTabs = ({tabData, basePath = '', activePath = '', activeTab, setActiveTab, setTabDirection}) => {

  const handleTabClick = (match) => {
    const prevPath = tabHierarchy[activeTab] ?? 1;
    const currentPath = tabHierarchy[match] ?? 2;

    setTabDirection(currentPath > prevPath ? "right" : "left"); // Determine direction of transition from hierarchy
    setActiveTab(match);
  }

  return (
    <ul className="flex flex-wrap sm:text-xs xl:text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      {tabData.map((tab, index) => {
        const isActive = activePath === tab.path || (index === 0 && !activePath);
        return (
          <li key={index} className="me-2">
            <Link to={`${basePath.replace(/\/$/, '')}/${tab.path}`} onClick={() => {handleTabClick(tab.path)}}>
              <button
                className={`inline-block py-2 sm:px-0.5 md:px-2 lg:px-4 2xl:px-6 text-white rounded-t-lg ${
                  isActive
                    ? 'bg-blue-600'
                    : 'bg-hero_portal-side_bar hover:bg-gray-700'
                }`}
              >
                {tab.description}
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HorizontalTabs;
import { Link } from 'react-router-dom';

const HorizontalTabs = ({tabData, basePath = '', activePath = ''}) => {
  const normalizedBasePath = basePath.replace(/\/$/, '');

  return (
    <ul className="flex flex-wrap text-md font-medium text-center text-gray-500 border-b border-gray-200">
      {tabData.map((tab, index) => {
        const isActive = activePath === tab.path || (index === 0 && !activePath);
        return (
          <li key={index} className="me-2">
            <Link to={`${basePath.replace(/\/$/, '')}/${tab.path}`}>
              <button
                className={`inline-block py-2 px-6 text-white rounded-t-lg ${
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
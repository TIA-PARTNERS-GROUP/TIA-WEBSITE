import { Outlet } from 'react-router-dom';

const CaseStudies = () => {
  return (
    <div className="bg-white rounded-xl sm:px-6 lg:px-6 2xl:px-8 py-2">
      <h2 className="pt-10 sm:text-xl 2xl:text-3xl md:text-2xl font-semibold text-black-800 pb-4">Case Studies</h2>
      <Outlet />
    </div>
  );
};

export default CaseStudies;
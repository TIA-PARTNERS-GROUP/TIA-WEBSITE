const Breadcrumb = () => {
  return (
    <nav className="bg-gray-100 py-2 px-4 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="text-blue-600 hover:underline">Home</a>
        <span className="mx-2">›</span>
        <span className="font-medium">TIA Benefits</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;

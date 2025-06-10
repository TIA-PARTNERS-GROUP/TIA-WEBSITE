const GhostButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        bg-transparent text-blue-600 border border-blue-600 font-medium
        rounded-lg
        hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
        transition duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GhostButton;

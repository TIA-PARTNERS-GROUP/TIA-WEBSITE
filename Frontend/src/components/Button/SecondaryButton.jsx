const SecondaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        bg-gray-200 text-gray-800 font-medium
        rounded-lg shadow-sm
        hover:bg-gray-300 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75
        transition duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;

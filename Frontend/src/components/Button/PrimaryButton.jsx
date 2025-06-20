const PrimaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        bg-blue-600 text-white font-semibold
        rounded-lg shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
        transition duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

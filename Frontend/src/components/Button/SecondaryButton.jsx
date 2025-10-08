const SecondaryButton = ({ children, onClick, className = "", disabled}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        font-medium rounded-lg shadow-sm transition duration-300 ease-in-out
        ${disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-20' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md'
        }
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;

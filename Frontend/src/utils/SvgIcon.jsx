const SvgIcon = ({
  pathData, // Required: The 'd' attribute for the SVG path
  iconPath,
  className = "",
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = "2",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  ...props // Allows passing any other SVG attributes (e.g., width, height)
}) => (
  <svg
    xmlns={iconPath}
    className={className}
    fill={fill}
    viewBox={viewBox}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    {...props}
  >
    <path d={pathData} />
  </svg>
);

export default SvgIcon;

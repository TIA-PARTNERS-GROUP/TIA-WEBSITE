import { ReactComponent as ManageSVG } from "../../assets/icons/manage.svg";

export default function ManageIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Manage Icon",
}) {
  return (
    <ManageSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

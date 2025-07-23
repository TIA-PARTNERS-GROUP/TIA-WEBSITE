import { ReactComponent as DashboardSVG } from "../../assets/icons/dashboard.svg";

export default function DashboardIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Dashboard Icon",
}) {
  return (
    <DashboardSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

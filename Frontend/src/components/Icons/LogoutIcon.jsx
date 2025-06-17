import { ReactComponent as LogoutSVG } from "../../assets/icons/logout.svg";

export default function LogoutIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Logout Icon",
}) {
  return (
    <LogoutSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

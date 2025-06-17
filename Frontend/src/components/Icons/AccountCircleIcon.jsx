import { ReactComponent as AccountCircleSVG } from "../../assets/icons/account_circle.svg";

export default function AccountCircleIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Account Circle Icon",
}) {
  return (
    <AccountCircleSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

import { ReactComponent as AccountCircleSVG } from "../../assets/icons/account_circle.svg";

export default function AccountCircleIcon({
  fillColor,
  width,
  height,
  alt = AccountCircleIcon().name,
  className,
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

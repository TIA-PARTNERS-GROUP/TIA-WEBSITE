import { ReactComponent as NotificationSVG } from "../../assets/icons/notification.svg";

export default function NotificationIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Notification Icon",
}) {
  return (
    <NotificationSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
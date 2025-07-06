import { ReactComponent as ProfileSVG } from "../../assets/icons/profile.svg";

export default function ProfileIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Notification Icon",
}) {
  return (
    <ProfileSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
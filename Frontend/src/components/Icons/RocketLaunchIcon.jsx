import { ReactComponent as RocketLaunchSVG } from "../../assets/icons/rocket_launch.svg";

export default function RocketLaunchIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Rocket Launch Icon",
}) {
  return (
    <RocketLaunchSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

import { ReactComponent as SettingsSVG } from "../../assets/icons/settings.svg";

export default function SettingsIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Settings Icon",
}) {
  return (
    <SettingsSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

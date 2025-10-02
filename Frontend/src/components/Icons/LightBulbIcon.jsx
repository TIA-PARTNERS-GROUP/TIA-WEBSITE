import { ReactComponent as LightBulbSVG } from "../../assets/icons/lightbulb.svg";

export default function LightBulbIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Light Bulb Icon",
}) {
  return (
    <LightBulbSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

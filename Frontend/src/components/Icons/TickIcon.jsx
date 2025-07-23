import { ReactComponent as TickSVG } from "../../assets/icons/tick.svg";

export default function TickIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Tick Icon",
}) {
  return (
    <TickSVG
      width={width}
      height={height}
      stroke={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

import { ReactComponent as ChevronDownSVG } from "../../assets/icons/chevron-down.svg";

export default function ChevronDownIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Chevron Down Icon",
}) {
  return (
    <ChevronDownSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

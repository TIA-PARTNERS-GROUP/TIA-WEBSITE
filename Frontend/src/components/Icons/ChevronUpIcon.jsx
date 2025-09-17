import { ReactComponent as ChevronUpSVG } from "../../assets/icons/chevron-up.svg";

export default function ChevronUpIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Chevron Up Icon",
}) {
  return (
    <ChevronUpSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

import { ReactComponent as ArrowForwardSVG } from "../../assets/icons/arrow_forward.svg";

export default function ArrowForwardIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Arrow Forward Icon",
}) {
  return (
    <ArrowForwardSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

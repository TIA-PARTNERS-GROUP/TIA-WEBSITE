import { ReactComponent as ArrowForwardSVG } from "../../assets/icons/arrow_forward.svg";

export default function ArrowForwardIcon({
  fillColor,
  width,
  height,
  alt = ArrowForwardIcon().name,
  className,
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

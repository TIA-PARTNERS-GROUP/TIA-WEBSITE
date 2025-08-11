import { ReactComponent as UpArrowSVG } from "../../assets/icons/up_arrow.svg";

export default function UpArrowIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Up Arrow Icon",
}) {
  return (
    <UpArrowSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

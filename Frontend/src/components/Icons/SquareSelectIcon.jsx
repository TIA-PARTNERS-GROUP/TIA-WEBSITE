import { ReactComponent as SquareSelectSVG } from "../../assets/icons/squareselect.svg";

export default function SquareSelectIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Sqaure Select Icon",
}) {
  return (
    <SquareSelectSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

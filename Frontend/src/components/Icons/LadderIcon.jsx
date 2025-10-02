import { ReactComponent as LadderSVG } from "../../assets/icons/ladder.svg";

export default function LadderIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Ladder Icon",
}) {
  return (
    <LadderSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

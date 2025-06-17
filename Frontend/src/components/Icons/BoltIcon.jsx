import { ReactComponent as BoltSVG } from "../../assets/icons/bolt.svg";

export default function BoltIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Bolt Icon",
}) {
  return (
    <BoltSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

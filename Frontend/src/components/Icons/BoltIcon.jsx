import { ReactComponent as BoltSVG } from "../../assets/icons/bolt.svg";

export default function BoltIcon({
  fillColor,
  width,
  height,
  alt = BoltIcon().name,
  className,
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

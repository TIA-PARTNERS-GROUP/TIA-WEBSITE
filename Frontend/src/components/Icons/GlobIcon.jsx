import { ReactComponent as GlobeSVG } from "../../assets/icons/globe.svg";

export default function GlobeIcon({
  fillColor,
  width,
  height,
  alt = GlobeIcon().name,
  className,
}) {
  return (
    <GlobeSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

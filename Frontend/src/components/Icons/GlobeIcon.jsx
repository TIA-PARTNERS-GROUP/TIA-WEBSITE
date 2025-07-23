import { ReactComponent as GlobeSVG } from "../../assets/icons/globe.svg";

export default function GlobeIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Globe Icon",
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

import { ReactComponent as BuildSVG } from "../../assets/icons/build.svg";

export default function BuildIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Build Icon",
}) {
  return (
    <BuildSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

import { ReactComponent as MetaSVG } from "../../assets/icons/meta.svg";

export default function MetaIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Meta Icon",
}) {
  return (
    <MetaSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

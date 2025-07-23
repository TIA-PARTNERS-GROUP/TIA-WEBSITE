import { ReactComponent as LinkedinSVG } from "../../assets/icons/linkedin.svg";

export default function LinkedinIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Linkedin Icon",
}) {
  return (
    <LinkedinSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

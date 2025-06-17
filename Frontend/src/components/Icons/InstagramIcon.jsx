import { ReactComponent as InstagramSVG } from "../../assets/icons/instagram.svg";

export default function InstagramIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Instagram Icon",
}) {
  return (
    <InstagramSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

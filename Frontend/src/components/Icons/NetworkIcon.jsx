import { ReactComponent as NetworkSVG } from "../../assets/icons/network.svg";

export default function NetworkIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Network Icon",
}) {
  return (
    <NetworkSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

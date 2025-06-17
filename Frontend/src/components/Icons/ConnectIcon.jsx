import { ReactComponent as ConnectSVG } from "../../assets/icons/connect.svg";

export default function ConnectIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Connect Icon",
}) {
  return (
    <ConnectSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

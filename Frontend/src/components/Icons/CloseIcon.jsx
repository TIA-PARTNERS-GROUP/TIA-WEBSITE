import { ReactComponent as CloseSVG } from "../../assets/icons/close.svg";

export default function CloseIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Close Icon",
}) {
  return (
    <CloseSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

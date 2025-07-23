import { ReactComponent as MessageSVG } from "../../assets/icons/message.svg";

export default function MessageIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Message Icon",
}) {
  return (
    <MessageSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
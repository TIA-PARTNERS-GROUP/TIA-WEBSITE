import { ReactComponent as ChatSVG } from "../../assets/icons/chat.svg";

export default function ChatIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Chat Icon",
}) {
  return (
    <ChatSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

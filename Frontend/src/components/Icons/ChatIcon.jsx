import { ReactComponent as ChatSVG } from "../../assets/icons/chat.svg";

export default function ChatIcon({
  fillColor,
  width,
  height,
  alt = ChatIcon().name,
  className,
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

import { ReactComponent as HandshakeSVG } from "../../assets/icons/handshake.svg";

export default function HandshakeIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Handshake Icon",
}) {
  return (
    <HandshakeSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

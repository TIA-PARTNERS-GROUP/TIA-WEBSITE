import { ReactComponent as EmailSVG } from "../../assets/icons/email.svg";

export default function EmailIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Email Icon",
}) {
  return (
    <EmailSVG
      width={width}
      height={height}
      stroke={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
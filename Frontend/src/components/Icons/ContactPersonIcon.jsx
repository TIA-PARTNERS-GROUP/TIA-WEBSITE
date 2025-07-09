import { ReactComponent as ContactPersonSVG } from "../../assets/icons/contactperson.svg";

export default function ContactPersonIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Edit Icon",
}) {
  return (
    <ContactPersonSVG
      width={width}
      height={height}
      stroke={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
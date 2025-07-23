import { ReactComponent as PhoneSVG } from "../../assets/icons/phone.svg";

export default function PhoneIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Phone Icon",
}) {
  return (
    <PhoneSVG
      width={width}
      height={height}
      stroke={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
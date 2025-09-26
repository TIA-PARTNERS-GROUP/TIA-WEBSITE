import { ReactComponent as RegisterSVG } from "../../assets/icons/register.svg";

export default function RegisterIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Register Icon",
}) {
  return (
    <RegisterSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
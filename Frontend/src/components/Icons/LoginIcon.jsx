import { ReactComponent as LoginSVG } from "../../assets/icons/login.svg";

export default function LoginIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Login Icon",
}) {
  return (
    <LoginSVG
      width={width}
      height={height}
      fill={fillColor}
      className={className}
      aria-label={alt}
    />
  );
}

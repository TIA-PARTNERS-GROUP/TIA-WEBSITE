import { ReactComponent as LoginSVG } from "../../assets/icons/login.svg";

export default function LoginIcon({
  fillColor,
  width,
  height,
  alt = LoginIcon().name,
  className,
}) {
  return (
    <LoginSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

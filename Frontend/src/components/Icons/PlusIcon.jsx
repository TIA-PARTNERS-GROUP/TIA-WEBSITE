import { ReactComponent as PlusSVG } from "../../assets/icons/plus.svg";

export default function PlusIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Plus Icon",
}) {
  return (
    <PlusSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

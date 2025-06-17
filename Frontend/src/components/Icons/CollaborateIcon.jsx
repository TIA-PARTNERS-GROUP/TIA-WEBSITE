import { ReactComponent as CollaborateSVG } from "../../assets/icons/collaborate.svg";

export default function CollaborateIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Collaborate Icon",
}) {
  return (
    <CollaborateSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

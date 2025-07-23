import { ReactComponent as DeleteSVG } from "../../assets/icons/delete.svg";

export default function DeleteIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Delete Icon",
}) {
  return (
    <DeleteSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

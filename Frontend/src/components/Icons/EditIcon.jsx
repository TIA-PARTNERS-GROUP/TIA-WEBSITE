import { ReactComponent as EditSVG } from "../../assets/icons/edit.svg";

export default function EditIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Edit Icon",
}) {
  return (
    <EditSVG
      width={width}
      height={height}
      stroke={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}
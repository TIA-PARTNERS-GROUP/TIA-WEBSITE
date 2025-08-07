import { ReactComponent as FilterSVG } from "../../assets/icons/filter.svg";

export default function FilterIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Filter Icon",
}) {
  return (
    <FilterSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

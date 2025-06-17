import { ReactComponent as SearchSVG } from "../../assets/icons/search.svg";

export default function SearchIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Search Icon",
}) {
  return (
    <SearchSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

import { ReactComponent as TrendingUpSVG } from "../../assets/icons/trending_up.svg";

export default function TrendingUpIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Trending Up Icon",
}) {
  return (
    <TrendingUpSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

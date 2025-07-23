import { ReactComponent as TeamBuildingSVG } from "../../assets/icons/team_building.svg";

export default function TeamBuildingIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Team Building Icon",
}) {
  return (
    <TeamBuildingSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

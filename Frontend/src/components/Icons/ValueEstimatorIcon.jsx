import { ReactComponent as ValueEstimatorSVG } from "../../assets/icons/value-estimator.svg";

export default function ValueEstimatorIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Value Estimator Icon",
}) {
  return (
    <ValueEstimatorSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

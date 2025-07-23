import { ReactComponent as SubscriptionsSVG } from "../../assets/icons/subscriptions.svg";

export default function SubscriptionsIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Subscriptions Icon",
}) {
  return (
    <SubscriptionsSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

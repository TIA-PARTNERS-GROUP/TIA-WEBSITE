import { ReactComponent as TradeSVG } from "../../assets/icons/trade.svg";

export default function TradeIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Trade Icon",
}) {
  return (
    <TradeSVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

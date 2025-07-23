import { ReactComponent as CurrencySVG } from "../../assets/icons/currency.svg";

export default function CurrencyIcon({
  fillColor = "currentColor",
  width = 24,
  height = 24,
  className,
  alt = "Currency Icon",
}) {
  return (
    <CurrencySVG
      width={width}
      height={height}
      fill={fillColor}
      aria-label={alt}
      className={className}
    />
  );
}

import TradeIcon from "../../components/Icons/TradeIcon";

export default {
  title: "Components/Icons",
  component: TradeIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Trade = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Trade Icon",
  },
};

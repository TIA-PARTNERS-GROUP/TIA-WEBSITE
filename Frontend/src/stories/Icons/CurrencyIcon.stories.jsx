import CurrencyIcon from "../../components/Icons/CurrencyIcon";

export default {
  title: "Components/Icons",
  component: CurrencyIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Currency = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Currency Icon",
  },
};

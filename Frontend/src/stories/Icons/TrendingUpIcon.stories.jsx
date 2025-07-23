import TrendingUpIcon from "../../components/Icons/TrendingUpIcon";

export default {
  title: "Components/Icons",
  component: TrendingUpIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const TrendingUp = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "TrendingUp Icon",
  },
};

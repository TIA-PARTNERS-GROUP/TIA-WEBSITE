import ArrowFowardIcon from "../components/Icons/ArrowFoward";

export default {
  title: "Components/Icons",
  component: ArrowFowardIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const ArrowFoward = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "ArrowFoward Icon",
  },
};

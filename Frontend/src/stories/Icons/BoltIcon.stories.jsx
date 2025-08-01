import BoltIcon from "../../components/Icons/BoltIcon";

export default {
  title: "Components/Icons",
  component: BoltIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Bolt = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Bolt Icon",
  },
};

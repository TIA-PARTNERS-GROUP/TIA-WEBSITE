import BuildIcon from "../../components/Icons/BuildIcon";

export default {
  title: "Components/Icons",
  component: BuildIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Build = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Build Icon",
  },
};

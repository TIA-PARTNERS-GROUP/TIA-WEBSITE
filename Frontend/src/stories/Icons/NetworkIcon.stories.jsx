import NetworkIcon from "../../components/Icons/NetworkIcon";

export default {
  title: "Components/Icons",
  component: NetworkIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Network = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Network Icon",
  },
};

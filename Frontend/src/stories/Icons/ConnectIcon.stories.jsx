import ConnectIcon from "../../components/Icons/ConnectIcon";

export default {
  title: "Components/Icons",
  component: ConnectIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Connect = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Connect Icon",
  },
};

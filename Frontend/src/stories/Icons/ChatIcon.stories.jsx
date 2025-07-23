import ChatIcon from "../../components/Icons/ChatIcon";

export default {
  title: "Components/Icons",
  component: ChatIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Chat = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Chat Icon",
  },
};

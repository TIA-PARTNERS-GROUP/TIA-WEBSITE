import HandshakeIcon from "../../components/Icons/HandshakeIcon";

export default {
  title: "Components/Icons",
  component: HandshakeIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Handshake = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Handshake Icon",
  },
};

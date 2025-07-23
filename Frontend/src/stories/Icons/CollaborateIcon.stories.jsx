import CollaborateIcon from "../../components/Icons/CollaborateIcon";

export default {
  title: "Components/Icons",
  component: CollaborateIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const Collaborate = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "Collaborate Icon",
  },
};

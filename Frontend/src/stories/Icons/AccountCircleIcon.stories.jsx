import AccountCircleIcon from "../../components/Icons/AccountCircleIcon";

export default {
  title: "Components/Icons",
  component: AccountCircleIcon,
  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 100, step: 1 } },
    height: { control: { type: "range", min: 16, max: 100, step: 1 } },
  },
};

export const AccountCircle = {
  args: {
    fillColor: "#333333",
    width: 32,
    height: 32,
    alt: "AccountCircle Icon",
  },
};

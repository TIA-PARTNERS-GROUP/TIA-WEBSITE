import HeroHeading from "../../components/Hero/HeroHeading"; // Adjust the import path as needed

/**
 * Storybook configuration for the HeroHeading component.
 * This defines the component's metadata in Storybook, such as its title and the component itself.
 */
export default {
  title: "Components/Hero/HeroHeading", // This creates a "Components" folder in the Storybook UI
  component: HeroHeading,
  // Optional: You can add argTypes for props to generate controls in Storybook
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

/**
 * A "template" for the story. This is a standard pattern in Storybook.
 * It allows you to create multiple variations of the component from the same base.
 * @param {object} args - The props to pass to the component.
 */
const Template = (args) => <HeroHeading {...args} />;

/**
 * The primary or default story for the HeroHeading component.
 * This is what will be rendered in the Storybook UI.
 */
export const Default = Template.bind({});

// If your component had props, you could define them here.
// For example:
// Default.args = {
//   primary: true,
//   label: 'Button',
// };

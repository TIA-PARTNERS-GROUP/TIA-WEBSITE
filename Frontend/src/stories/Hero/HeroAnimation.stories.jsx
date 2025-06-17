import "../../App.css";

import HeroAnimation from "../../components/Hero/HeroAnimation";

export default {
  // This title determines the component's name and location in the Storybook sidebar.
  title: "Showcase/Hero Animation",

  // This connects the story to the component, enabling docs and controls.
  component: HeroAnimation,

  // Use the 'fullscreen' layout for components that are designed to take up the whole screen.
  // This removes Storybook's default padding around the component.
  parameters: {
    layout: "fullscreen",
  },
};

// This is the simplest way to create a story for a component that takes no props.
// It will render the HeroAnimation component in its default state.
export const Default = {};

import LandingPage from "../../pages/LandingPage";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter to provide routing context

export default {
  title: "Pages/LandingPage",
  component: LandingPage,
  parameters: {
    // The layout parameter tells Storybook how to position the component in the canvas.
    // 'fullscreen' is best for page-level components.
    layout: "fullscreen",
  },
  // Add a decorator to wrap the story in a MemoryRouter
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <LandingPage {...args} />;

export const Default = Template.bind({});
Default.args = {};

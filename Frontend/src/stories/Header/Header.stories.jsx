import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header/Header";

import "../../App.css";

//const lazyImports = {
// Add paths you expect to lazy load, with dummy functions
//"/benefits": () => console.log("Preloading /benefits route (mocked)"),
//"/membership": () => console.log("Preloading /membership route (mocked)"),
// Add other lazy-loaded paths as needed for testing preload behavior
//};
//
export default {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls the mobile menu open/close state",
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  args: {
    isOpen: false,
  },
};

export const MobileOpen = {
  args: {
    isOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// export const LoggedInUser = {
//   args: {
//     userName: 'John Doe',
//     showLogin: false, // assuming a prop to hide login when logged in
//   },
// };

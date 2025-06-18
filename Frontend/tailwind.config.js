/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0075E2",
        secondary: "#6C757D",
        accent: "#17A2B8",
        success: "#28A745",
        danger: "#DC3545",
        warning: "#FFC107",
        text: {
          dark: "#212529",
          light: "#FFFFFF",
          muted: "#000000C2",
        },
        background: {
          light: "#FFFFFF",
          dark: "#111827",
        },
        hero_portal: {
          side_bar: "#111827",
          mac_icons: {
            first: "#ED6B5E",
            second: "#F4C04F",
            third: "#60C553",
          },
          card_widgets: {
            settings: "#ec4899",
            connect: "#fb923c",
            build: "#84cc16",
            network: "#3b82f6",
            trade: "#facc15",
            collaborate: "#22d3ee",
          },
          circle_widgets: {
            first: "#22c55e",
            secondary: "#f97316",
            third: "#3b82f6",
          },
          manage_widgets: {
            first: "#374151",
            second: "#212529",
            third: "#374151",
          },
          bar_widget: {
            progress: "#2563eb",
            progress_left: "#e5e7eb",
          },
        },
      },
    },
  },
  plugins: [],
};

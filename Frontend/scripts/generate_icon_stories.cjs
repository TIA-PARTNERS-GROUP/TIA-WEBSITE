// scripts/generate-icon-stories.js

const fs = require("fs");
const path = require("path");

// --- Configuration ---
// Source directory where your icon components are located
const iconsDir = path.join(__dirname, "..", "src", "components", "Icons");
// Destination directory where the story files will be created
const storiesDir = path.join(__dirname, "..", "src", "stories");

// --- Template ---
// The import path is now updated to correctly point from src/stories/ to src/components/Icons/
const storyTemplate = (iconName, storyName) => `
import ${iconName} from '../components/Icons/${iconName}';

export default {
  title: 'Components/Icons',
  component: ${iconName},
  argTypes: {
    fillColor: { control: 'color' },
    width: { control: { type: 'range', min: 16, max: 100, step: 1 } },
    height: { control: { type: 'range', min: 16, max: 100, step: 1 } },
  },
};

export const ${storyName} = {
  args: {
    fillColor: '#333333',
    width: 32,
    height: 32,
    alt: '${storyName} Icon',
  },
};
`;

// --- Main Script Logic ---
try {
  // Ensure the destination stories directory exists, create it if not.
  if (!fs.existsSync(storiesDir)) {
    fs.mkdirSync(storiesDir, { recursive: true });
    console.log(`📂 Created stories directory at: ${storiesDir}`);
  }

  // Read all files from the source icons directory
  const files = fs.readdirSync(iconsDir);

  files.forEach((file) => {
    // We only care about .jsx component files
    if (file.endsWith(".jsx") && !file.endsWith(".stories.jsx")) {
      const iconName = file.replace(".jsx", ""); // e.g., "LoginIcon"
      const storyName = iconName.replace("Icon", ""); // e.g., "Login"

      // The path for the new story file is now in the 'src/stories' directory
      const storyFilePath = path.join(storiesDir, `${iconName}.stories.jsx`);

      // Check if a story file for this icon already exists in the destination
      if (!fs.existsSync(storyFilePath)) {
        console.log(`✨ Creating story for ${iconName}...`);

        // Generate the story content from the updated template
        const storyContent = storyTemplate(iconName, storyName);

        // Write the new story file to the 'src/stories' directory
        fs.writeFileSync(storyFilePath, storyContent.trim());
        console.log(`✅ Created ${iconName}.stories.jsx in src/stories`);
      }
    }
  });

  console.log("\nAutomation complete. All icon stories are up to date.");
} catch (error) {
  console.error("❌ Error generating icon stories:", error);
}

const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "..", "src", "components", "Icons");
const storiesDir = path.join(__dirname, "..", "src", "stories", "Icons");

const storyTemplate = (iconName, storyName) => `
import ${iconName} from '../../components/Icons/${iconName}';

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

try {
  if (!fs.existsSync(storiesDir)) {
    fs.mkdirSync(storiesDir, { recursive: true });
    console.log(`📂 Created stories directory at: ${storiesDir}`);
  }

  const files = fs.readdirSync(iconsDir);

  files.forEach((file) => {
    if (file.endsWith(".jsx") && !file.endsWith(".stories.jsx")) {
      const iconName = file.replace(".jsx", "");
      const storyName = iconName.replace("Icon", "");

      const storyFilePath = path.join(storiesDir, `${iconName}.stories.jsx`);

      if (!fs.existsSync(storyFilePath)) {
        console.log(`✨ Creating story for ${iconName}...`);

        const storyContent = storyTemplate(iconName, storyName);

        fs.writeFileSync(storyFilePath, storyContent.trim());
        console.log(`✅ Created ${iconName}.stories.jsx in src/stories`);
      }
    }
  });

  console.log("\nAutomation complete. All icon stories are up to date.");
} catch (error) {
  console.error("❌ Error generating icon stories:", error);
}

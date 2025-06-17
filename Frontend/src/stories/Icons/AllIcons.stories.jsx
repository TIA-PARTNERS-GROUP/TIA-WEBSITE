const iconModules = import.meta.glob("../../components/Icons/*.jsx", {
  eager: true,
});

const IconDisplay = ({ icons, fillColor, width, height }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "2rem",
    padding: "1rem",
  };

  const itemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "sans-serif",
    color: "#333",
    fontSize: "14px",
  };

  return (
    <div style={gridStyle}>
      {Object.entries(icons).map(([path, module]) => {
        if (path.includes(".stories.jsx")) {
          return null;
        }

        const IconComponent = module.default;
        const name = path.split("/").pop().replace(".jsx", "");

        return (
          <div key={name} style={itemStyle}>
            <IconComponent
              fillColor={fillColor}
              width={width}
              height={height}
            />
            <code>{name}</code>
          </div>
        );
      })}
    </div>
  );
};

export default {
  title: "Components/Icons/All Icons Gallery",

  argTypes: {
    fillColor: { control: "color" },
    width: { control: { type: "range", min: 16, max: 150, step: 1 } },
    height: { control: { type: "range", min: 16, max: 150, step: 1 } },
  },
};

export const AllIcons = {
  render: (args) => <IconDisplay icons={iconModules} {...args} />,

  args: {
    fillColor: "#333333",
    width: 48,
    height: 48,
  },
};

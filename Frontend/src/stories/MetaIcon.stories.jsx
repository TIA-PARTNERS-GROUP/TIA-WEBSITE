import MetaIcon from '../components/Icons/MetaIcon';

export default {
  title: 'Components/Icons',
  component: MetaIcon,
  argTypes: {
    fillColor: { control: 'color' },
    width: { control: { type: 'range', min: 16, max: 100, step: 1 } },
    height: { control: { type: 'range', min: 16, max: 100, step: 1 } },
  },
};

export const Meta = {
  args: {
    fillColor: '#333333',
    width: 32,
    height: 32,
    alt: 'Meta Icon',
  },
};
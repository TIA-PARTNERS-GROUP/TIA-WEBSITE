import ManegIcon from '../../components/Icons/ManegIcon';

export default {
  title: 'Components/Icons',
  component: ManegIcon,
  argTypes: {
    fillColor: { control: 'color' },
    width: { control: { type: 'range', min: 16, max: 100, step: 1 } },
    height: { control: { type: 'range', min: 16, max: 100, step: 1 } },
  },
};

export const Maneg = {
  args: {
    fillColor: '#333333',
    width: 32,
    height: 32,
    alt: 'Maneg Icon',
  },
};
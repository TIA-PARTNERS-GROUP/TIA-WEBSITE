import LinkedinIcon from '../components/Icons/LinkedinIcon';

export default {
  title: 'Components/Icons',
  component: LinkedinIcon,
  argTypes: {
    fillColor: { control: 'color' },
    width: { control: { type: 'range', min: 16, max: 100, step: 1 } },
    height: { control: { type: 'range', min: 16, max: 100, step: 1 } },
  },
};

export const Linkedin = {
  args: {
    fillColor: '#333333',
    width: 32,
    height: 32,
    alt: 'Linkedin Icon',
  },
};
import LoginIcon from '../components/Icons/LoginIcon';

export default {
  title: 'Components/Icons',
  component: LoginIcon,
  argTypes: {
    fillColor: { control: 'color' },
    width: { control: { type: 'range', min: 16, max: 100, step: 1 } },
    height: { control: { type: 'range', min: 16, max: 100, step: 1 } },
  },
};

export const Login = {
  args: {
    fillColor: '#333333',
    width: 32,
    height: 32,
    alt: 'Login Icon',
  },
};
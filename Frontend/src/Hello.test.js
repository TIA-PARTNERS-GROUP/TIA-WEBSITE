import React from 'react'
import { render, screen } from '@testing-library/react';
import Hello from './components/Hello';


test('renders hello message', () => {
  render(<Hello />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});

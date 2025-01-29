import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Admin Dashboard', () => {
  render(<App />);
  const headerElement = screen.getByText(/Admin Dashboard/i);
  expect(headerElement).toBeInTheDocument();
});


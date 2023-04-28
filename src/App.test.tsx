import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input empty', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please input value to search movie/i);
  expect(linkElement).toBeInTheDocument();
});


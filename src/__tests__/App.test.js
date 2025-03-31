import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('shows title "Reaction Time Game', () => {
  render(<App />);
  const titleElement = screen.getByText(/Reaction Time Game/i);
  expect(titleElement).toBeInTheDocument();
});

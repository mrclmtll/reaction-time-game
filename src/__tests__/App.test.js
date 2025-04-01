import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import Game from '../Game';

test('shows title "Reaction Time Game', () => {
  render(<App />);
  const titleElement = screen.getByText(/Reaction Time Game/i);
  expect(titleElement).toBeInTheDocument();
});

test('shows "start game" button', () => {
  render(<Game />);
  const startButton = screen.getByText(/start game/i); // find button to start game
  fireEvent.click(startButton); // click start-button

  expect(startButton).toBeDisabled(); // check if button disappears
})
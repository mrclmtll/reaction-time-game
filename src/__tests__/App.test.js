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

test('gameArea is visible', () => {
  render(<Game />);
  const gameArea = screen.getByTestId("gameArea");

  expect(gameArea).toBeInTheDocument();
})

test('when game is running, make a seconds count visible', () => {
  render(<Game />);
  // start the game
  const startButton = screen.getByText(/start game/i);
  fireEvent.click(startButton);
  // look for "sec"
  const seconds = screen.getByText("0sec");
  expect(seconds).toBeVisible();
})

test('when game started, make the target button visible', () => {
  render(<Game />);
  // start the game
  const startButton = screen.getByText(/start game/i);
  fireEvent.click(startButton);

  const targetButton = screen.getByTestId("target");
  expect(targetButton).toBeVisible();
})

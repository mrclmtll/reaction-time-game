import { render, screen, fireEvent, act } from '@testing-library/react';
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

test('when ending game, make start button clickable', () => {
  render(<Game />);
  // start the game
  const startButton = screen.getByText("Start Game");
  fireEvent.click(startButton);
  // end the game
  const targetButton = screen.getByTestId("target");
  fireEvent.click(targetButton);

  expect(startButton).not.toBeDisabled();
})

test('measures reaction time using setInterval', async () => {
  jest.useFakeTimers(); // activate fake timer

  render(<Game />);

  const startButton = screen.getByText("Start Game");
  fireEvent.click(startButton); // start game

  const targetButton = screen.getByTestId("target");

  // simulate time passing
  act(() => {
    jest.advanceTimersByTime(2000); // advance time by 2secs
  });

  fireEvent.click(targetButton); // end game

  const timerText = screen.getByText(/sec/i).textContent;
  const seconds = parseFloat(timerText);

  expect(seconds).toBeGreaterThanOrEqual(2);
  expect(seconds).toBeLessThan(2.5);

  jest.useRealTimers(); // reset fake timer
});

test('try more games in a row', async () => {
  jest.useFakeTimers(); // activate fake timer

  render(<Game />);

  const startButton = screen.getByText("Start Game");
  fireEvent.click(startButton); // start game

  const targetButton = screen.getByTestId("target");


  fireEvent.click(targetButton); // end game



  // 2nd game

  fireEvent.click(startButton); // start 2nd game

  // simulate time passing
  act(() => {
    jest.advanceTimersByTime(2000); // advance time by 2secs
  });

  fireEvent.click(targetButton); // end game

  const timerText = screen.getByText(/sec/i).textContent;
  const seconds = parseFloat(timerText);

  expect(seconds).toBeGreaterThanOrEqual(2);
  expect(seconds).toBeLessThan(2.5);

  jest.useRealTimers(); // reset fake timer
})
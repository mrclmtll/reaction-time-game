import { useEffect, useRef, useState } from "react";

function Game() {
  const [gameActive, setGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(true);
  const [passedTime, setPassedTime] = useState(0);
  const [targetVisible, setTargetVisible] = useState(false);
  const [missClickNotify, setMissClickNotify] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [highscores, setHighscores] = useState([]);
  const [availibleNames, setAvailibleNames] = useState([]);

  const intervalRef = useRef(null);
  const targetButton = useRef(null);
  const gameStartTimeStamp = useRef(0);
  const missClickCount = useRef(0);
  const nameInput = useRef();

  async function startGame() {
    setTargetVisible(false);
    let delay = Math.random() * 4 * 1000; // random delay between 0 and 4 seconds (0 and 4000 ms)
    setGameActive(true);
    setGameEnded(false);
    setPassedTime(0); // reset timer
    missClickCount.current = 0;

    await new Promise((r) => setTimeout(r, delay)); // wait delay seconds

    setTargetVisible(true);

    var date = new Date();
    gameStartTimeStamp.current = date.getTime();
  }

  async function endGame(event) {
    // when button was clicked, do not trigger missclick function
    event.stopPropagation();

    playSound("success");

    var date = new Date();
    var reactionTimeInMs = (date.getTime() - gameStartTimeStamp.current) / 1000;
    var timeWithPenalties = reactionTimeInMs + missClickCount.current * 0.5;
    setPassedTime(timeWithPenalties);

    setGameEnded(true);
    clearInterval(intervalRef.current);

    // only save highscore, if name was provided
    if (nameInput.current.value) {
      saveHighscore(nameInput.current.value, timeWithPenalties);
    }

    let _highScores = await getHighscores();
    setHighscores(_highScores);

    let _names = await getNames();
    setAvailibleNames(_names);
  }

  async function saveHighscore(name, score) {
    try {
      const response = await fetch("http://localhost:4000/api/highscores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, time: score }),
      });

      const data = await response.json();
      console.log("✅ Saved highscore: ", data);
    } catch (error) {
      console.error("Error saving highscore");
    }
  }

  async function getHighscores() {
    try {
      const response = await fetch("http://localhost:4000/api/highscores", {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching highscores");
      return [];
    }
  }

  async function getNames() {
    try {
      const response = await fetch("http://localhost:4000/api/names", {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fething names");
      return [];
    }
  }

  function registerMissClick(e) {
    if (!gameEnded) {
      playSound("missclick");
      setPassedTime((prev) => prev + 0.5);
      missClickCount.current += 1;

      setMousePosition({ x: e.clientX, y: e.clientY });
      // first set to false and then reset, so it can appear even if the timer did not reset
      setMissClickNotify(false);
      setMissClickNotify(true);
    }
  }

  function playSound(soundName) {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.play();
  }

  // run on mount
  useEffect(() => {
    async function _setHighscores() {
      let _highScores = await getHighscores();
      setHighscores(_highScores);
    }
    async function _setNames() {
      let _names = await getNames();
      setAvailibleNames(_names);
    }
    _setHighscores();
    _setNames();
  }, []);

  useEffect(() => {
    if (missClickNotify) {
      setTimeout(() => {
        setMissClickNotify(false);
      }, 1000);
    }
  }, [missClickNotify]);

  useEffect(() => {
    if (targetButton.current && !gameEnded) {
      let top = Math.random() * 100;
      let left = Math.random() * 100;
      targetButton.current.style.top = `${top}%`;
      targetButton.current.style.left = `${left}%`;
    }
  }, [gameEnded, targetVisible]);

  useEffect(() => {
    if (!gameEnded && targetVisible) {
      intervalRef.current = setInterval(() => {
        setPassedTime(
          (prev) => Math.round((prev + 0.01) * 10000) / 10000 // round it to 2 decimals
        );
      }, 10);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [gameEnded, targetVisible]);

  return (
    <>
      <div>
        <button
          className="start-button poppins-light"
          disabled={!gameEnded}
          onClick={startGame}
        >
          Start Game
        </button>

        <input
          className="poppins-regular name-input"
          placeholder="Input name"
          list="names"
          ref={nameInput}
        ></input>
        <datalist id="names">
          {availibleNames.map((name) => {
            console.log(name);

            return <option value={name} />;
          })}
        </datalist>

        {gameActive && (
          <span className="poppins-light timer" data-testid="timer">
            {passedTime}sec
          </span>
        )}
      </div>
      <div className="flex-box">
        <div
          className="game-area"
          data-testid="gameArea"
          onClick={registerMissClick}
        >
          {targetVisible && (
            <button
              ref={targetButton}
              data-testid="target"
              onClick={endGame}
              className="target-button"
            ></button>
          )}
          {missClickNotify && (
            <span
              className="poppins-light missclick-notify"
              style={{
                position: "absolute",
                left: mousePosition.x,
                top: mousePosition.y,
                color: "red",
              }}
            >
              +0.5sec
            </span>
          )}
        </div>
        <div>
          <p className="highscore-heading poppins-extralight">Highscores</p>
          <table className="highscore-table poppins-extralight">
            <thead>
              <tr>
                <th className="table-padding">Name</th>
                <th className="table-padding">Time</th>
              </tr>
            </thead>
            <tbody>
              {highscores.map((element) => {
                return (
                  <tr key={element._id}>
                    <td className="table-padding">{element.name}</td>
                    <td className="table-padding">{element.reaction_time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Game;

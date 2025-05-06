import { useEffect, useRef, useState } from "react";
import { VolumeX, Volume2, Moon, Sun } from "lucide-react";

import ClassicGame from "./gameModes/ClassicGame/ClassicGame";

function Game() {
  const [gameActive, setGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(true);
  const [passedTime, setPassedTime] = useState(0);
  const [targetVisible, setTargetVisible] = useState(false);
  const [missClickNotify, setMissClickNotify] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [highscores, setHighscores] = useState([]);
  const [availibleNames, setAvailibleNames] = useState([]);
  const [muted, setMuted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState("classic");

  const intervalRef = useRef(null);
  const gameStartTimeStamp = useRef(0);
  const missClickCount = useRef(0);
  const nameInput = useRef();

  async function startGame() {
    if (selectedGameMode === "classic") {
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
    } else if (selectedGameMode === "order") {
    } else if (selectedGameMode === "fakes") {
    }
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

    let _highScores = await getHighscores(selectedGameMode);
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
        body: JSON.stringify({
          name: name,
          time: score,
          gamemode: selectedGameMode,
        }),
      });

      const data = await response.json();
      console.log("✅ Saved highscore: ", data);
    } catch (error) {
      console.error("Error saving highscore");
    }
  }

  async function getHighscores(gamemode) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/highscores?gamemode=${gamemode}`,
        {
          method: "GET",
        }
      );
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
    if (!muted) {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.play();
    }
  }

  // run on mount and gamemode change
  useEffect(() => {
    async function _setHighscores() {
      let _highScores = await getHighscores(selectedGameMode);
      setHighscores(_highScores);
    }
    async function _setNames() {
      let _names = await getNames();
      setAvailibleNames(_names);
    }
    _setHighscores();
    _setNames();
  }, [selectedGameMode]);

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

  useEffect(() => {
    if (darkMode) {
      // set whole html to darkmode
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div>
        {muted ? (
          <VolumeX
            className="volume-icon"
            onClick={() => {
              setMuted(false);
            }}
          />
        ) : (
          <Volume2
            className="volume-icon"
            onClick={() => {
              setMuted(true);
            }}
          />
        )}
        {darkMode ? (
          <Sun
            className="darkmode-toggle"
            data-testid="darkmode-toggle"
            onClick={() => {
              setDarkMode(false);
            }}
          />
        ) : (
          <Moon
            className="darkmode-toggle"
            data-testid="darkmode-toggle"
            onClick={() => {
              setDarkMode(true);
            }}
          />
        )}
      </div>
      <div className="flex-box">
        <button
          className="start-button poppins-light"
          disabled={!gameEnded}
          onClick={startGame}
        >
          Start Game
        </button>

        <div className="mode-selector">
          <button
            className={selectedGameMode === "classic" ? "active" : ""}
            onClick={() => setSelectedGameMode("classic")}
          >
            Classic
          </button>
          <button
            className={selectedGameMode === "order" ? "active" : ""}
            onClick={() => setSelectedGameMode("order")}
          >
            Order
          </button>
          <button
            className={selectedGameMode === "fakes" ? "active" : ""}
            onClick={() => setSelectedGameMode("fakes")}
          >
            Fakes
          </button>
        </div>

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
          {selectedGameMode === "classic" && (
            <ClassicGame
              setPassedTime={setPassedTime}
              setMissClickNotify={setMissClickNotify}
              endGame={endGame}
              targetVisible={targetVisible}
              gameEnded={gameEnded}
              missClickNotify={missClickNotify}
              mousePosition={mousePosition}
            />
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

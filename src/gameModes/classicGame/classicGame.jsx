import { useEffect, useRef } from "react";

function ClassicGame({
  // functions
  setPassedTime,
  setMissClickNotify,
  endGame,

  // states
  targetVisible,
  gameEnded,
  missClickNotify,
  mousePosition,
}) {
  const targetButton = useRef(null);

  useEffect(() => {
    if (targetButton.current && !gameEnded) {
      let top = Math.random() * 100;
      let left = Math.random() * 100;
      targetButton.current.style.top = `${top}%`;
      targetButton.current.style.left = `${left}%`;
    }
  }, [gameEnded, targetVisible]);

  useEffect(() => {
    if (missClickNotify) {
      setTimeout(() => {
        setMissClickNotify(false);
      }, 1000);
    }
  }, [missClickNotify, setMissClickNotify]);
  return (
    <>
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
    </>
  );
}

export default ClassicGame;

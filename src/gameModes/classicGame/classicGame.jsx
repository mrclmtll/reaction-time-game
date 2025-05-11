import { useEffect, useRef } from "react";

function ClassicGame({
  // functions
  endGame,

  // states
  targetVisible,
  gameEnded,
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

  return (
    <>
      {targetVisible && (
        <button
          ref={targetButton}
          data-testid="target"
          onClick={endGame}
          className="button"
        ></button>
      )}
    </>
  );
}

export default ClassicGame;

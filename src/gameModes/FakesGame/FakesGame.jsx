import "./FakesGame.css";
import { useEffect, useState } from "react";

function FakesGame({ endGame, registerWrongTarget, targetVisible, gameEnded }) {
  const [buttonPositions, setButtonPositions] = useState([]);

  useEffect(() => {
    if (targetVisible && !gameEnded) {
      let positions = [];
      for (let i = 0; i < 4; i++) {
        let topPos = Math.random() * 90;
        let leftPos = Math.random() * 90;
        positions.push({ position: "absolute", top: `${topPos}%`, left: `${leftPos}%` });
      }
      setButtonPositions(positions);
    }
  }, [gameEnded, targetVisible]);

  return (
    <>
      {targetVisible && (
        <>
          {/* prettier-ignore */}
          <TargetButton style = {buttonPositions[0]} onClick={endGame} />
          {/* prettier-ignore */}
          <TargetButton style = {buttonPositions[1]} fake={true} onClick={registerWrongTarget} />
          {/* prettier-ignore */}
          <TargetButton style = {buttonPositions[2]} fake={true} onClick={registerWrongTarget} />
          {/* prettier-ignore */}
          <TargetButton style = {buttonPositions[3]} fake={true} onClick={registerWrongTarget} />
        </>
      )}
    </>
  );
}

function TargetButton({ style, fake, onClick }) {
  return (
    <button
      // ref={targetButton}
      data-testid="target"
      onClick={onClick}
      className={fake ? "fake-button button" : "target-button button"}
      style={fake ? style : { ...style, zIndex: 10 }}
    ></button>
  );
}

export default FakesGame;

import "./FakesGame.css";

function FakesGame({ endGame, registerWrongTarget, targetVisible }) {
  return (
    <>
      {targetVisible && (
        <>
          <TargetButton onClick={endGame} />
          <TargetButton fake={true} onClick={registerWrongTarget} />
          <TargetButton fake={true} onClick={registerWrongTarget} />
          <TargetButton fake={true} onClick={registerWrongTarget} />
        </>
      )}
    </>
  );
}

function TargetButton({ fake, onClick }) {
  return (
    <button
      // ref={targetButton}
      data-testid="target"
      onClick={onClick}
      className={fake ? "fake-button button" : "target-button button"}
    ></button>
  );
}

export default FakesGame;

function FakesGame({ endGame, registerWrongTarget, targetVisible }) {
  return (
    <>
      {targetVisible && (
        <>
          <TargetButton fake={true} onClick={endGame} />
          <TargetButton onClick={registerWrongTarget} />
          <TargetButton onClick={registerWrongTarget} />
          <TargetButton onClick={registerWrongTarget} />
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
      className={fake ? "fake-button" : "target-button"}
    ></button>
  );
}

export default FakesGame;

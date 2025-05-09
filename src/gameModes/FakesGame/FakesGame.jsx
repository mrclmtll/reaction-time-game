function FakesGame({ endGame, targetVisible }) {
  return (
    <>
      {targetVisible && (
        <>
          <TargetButton fake={true} onClick={endGame} />
          <TargetButton />
          <TargetButton />
          <TargetButton />
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

function FakesGame() {
  return (
    <>
      <TargetButton fake={true} />
      <TargetButton />
      <TargetButton />
      <TargetButton />
    </>
  );
}

function TargetButton({ fake }) {
  return (
    <button
      // ref={targetButton}
      data-testid="target"
      // onClick={endGame}
      className={fake ? "fake-button" : "target-button"}
    ></button>
  );
}

export default FakesGame;

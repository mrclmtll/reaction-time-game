import "./OrderGame.css";

function OrderGame() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        let topPos = Math.random() * 90;
        let leftPos = Math.random() * 90;
        return (
          <TargetButton
            index={i + 1}
            style={{ position: "absolute", top: `${topPos}%`, left: `${leftPos}%` }}
          />
        );
      })}
    </>
  );
}

function TargetButton({ style, index }) {
  return (
    <button style={style} className="button">
      {index}
    </button>
  );
}

export default OrderGame;

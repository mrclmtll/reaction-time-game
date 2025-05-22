import { useEffect, useState } from "react";
import "./OrderGame.css";

function OrderGame({ targetVisible, endGame }) {
  const [buttonStyles, setButtonStyles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick(event) {
    const clickedIndex = parseInt(event.currentTarget.dataset.index, 10);
    if (clickedIndex === currentIndex) {
      event.stopPropagation();

      event.currentTarget.disabled = true;
      setCurrentIndex((prevIndex) => prevIndex + 1);
      if (currentIndex === 4) {
        endGame(event);
      }
    }
  }

  useEffect(() => {
    let positions = [];
    for (let i = 0; i < 5; i++) {
      let topPos = Math.random() * 90;
      let leftPos = Math.random() * 90;
      let randomColor = cssColors[Math.floor(Math.random() * cssColors.length)];

      positions.push({
        position: "absolute",
        top: `${topPos}%`,
        left: `${leftPos}%`,
        backgroundColor: randomColor,
      });
    }
    setButtonStyles(positions);
  }, []);
  return (
    <>
      {targetVisible &&
        buttonStyles.map((btnStyle, index) => {
          return <TargetButton index={index} style={btnStyle} handleClick={handleClick} />;
        })}
    </>
  );
}

function TargetButton({ style, index, handleClick }) {
  return (
    <button style={style} onClick={handleClick} className="button" data-index={index}>
      {index + 1}
    </button>
  );
}

export default OrderGame;

const cssColors = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];

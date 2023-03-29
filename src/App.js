import React, { useState, useEffect } from "react";
import "./styles.css";

var boardArray = Array(10)
  .fill(null)
  .map(() => Array(10).fill(null));
// function eventHandler(){

// }
const Board = (props) => {
  return boardArray.map((row, i) => {
    return row.map((col, j) => {
      return (
        <Cell
          key={[j, i]}
          coordinates={[j, i]}
          player={props.player}
          treasure={props.treasure}
        />
      );
    });
  });
};
const compare = (obj1, obj2) => {
  if (obj1.length !== obj2.length) {
    return false;
  } else {
    for (let i = 0; i <= obj1.length; i++) {
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
  }
  return true;
};
function Cell(props) {
  function setPlayerColor() {
    let color;
    if (compare(props.coordinates, props.player)) {
      color = "red";
    } else if (compare(props.coordinates, props.treasure)) {
      color = "yellow";
    } else {
      color = "grey";
    }
    return color;
  }
  return <div className={`${setPlayerColor()} square`}></div>;
}
export default function App() {
  const [player, setPlayer] = useState([4, 4]);
  const [treasure, setTreasure] = useState([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  ]);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(20);
  const [active, setActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const treasureCaught = (players) => {
    if (compare(players, treasure)) {
      setScore(score + 1);
      setTreasure([
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]);
    }
  };
  const handleReset = () => {
    setScore(0);
    setActive(false);
    setSeconds(20);
  };
  useEffect(() => {
    const interval = setTimeout(() => {
      if (active && seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        setActive(false);
        setHighScore(Math.max(score, highScore));
        handleReset();
      }
    }, 1000);
    return () => clearTimeout(interval);
  }, [seconds, active]);

  const handleKey = (e) => {
    if (e.key === "ArrowDown") {
      if (player[1] < 9) {
        setPlayer([player[0], player[1] + 1]);
        treasureCaught([player[0], player[1] + 1]);
      }
    } else if (e.key === "ArrowUp") {
      if (player[1] > 0) {
        setPlayer([player[0], player[1] - 1]);
        treasureCaught([player[0], player[1] - 1]);
      }
    } else if (e.key === "ArrowLeft") {
      if (player[0] > 0) {
        setPlayer([player[0] - 1, player[1]]);
        treasureCaught([player[0] - 1, player[1]]);
      }
    } else if (e.key === "ArrowRight") {
      if (player[0] < 9) {
        setPlayer([player[0] + 1, player[1]]);
        treasureCaught([player[0] + 1, player[1]]);
      }
    }
  };
  return (
    <body tabIndex={0} onKeyDown={handleKey} className="body">
      <div className="grid">
        <Board player={player} treasure={treasure} />
      </div>
      <div className="game">
        <div className="button">
          <button
            onClick={() => {
              handleReset();
              setActive(true);
            }}
            className="start"
          >
            Start
          </button>
        </div>
        <div className="button">
          <button onClick={handleReset}>Reset</button>
        </div>
        <h1 className="time">
          {String(Math.floor(seconds / 60))}:
          {String(Math.floor(seconds % 60)).padStart(2, "0")}
        </h1>
        <p>Score: {score}</p>

        <p>Record: {highScore}</p>
      </div>
    </body>
  );
}

//1. Creating a square component
//give it a color property
//2. have a grid that can hold the squares
//3. have states to keep track of current score
//4. have a current row and current column state keeps track of where you are
//5. have a function to check if the current square = the winner square
//6. have a score state that incremenents when currentsquare = winner square

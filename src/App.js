import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [twistIt, setTwistIt] = useState(false);
  const [pressIt, setPressIt] = useState(false);
  const [pullIt, setPullIt] = useState(false);
  const [move, setMove] = useState("");
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [hScore, setHScore] = useState(0);
  const moves = ["Twist It!", "Press It!", "Pull It!"];

  useEffect(() => {
    if (!started || move === "You Lose") return; // Do not set a timeout if the game hasn't started or is already lost.

    const timer = setTimeout(() => {
      if (!twistIt && !pressIt && !pullIt) {
        // If no action has been taken, force a loss.
        setStarted(false);
        setMove("You Lose");
        setScore(0);
        setTwistIt(false);
        setPressIt(false);
        setPullIt(false);
      }
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or the dependencies change.
  }, [move, started, twistIt, pressIt, pullIt]);

  const getRandomMove = () => {
    const randomIndex = Math.floor(Math.random() * moves.length);
    setMove(moves[randomIndex]);
  };

  const startGame = () => {
    setStarted(true);
    getRandomMove();
    setScore(0);
    setTwistIt(false);
    setPressIt(false);
    setPullIt(false);
  };

  const checkAction = (action) => {
    if (action === move) {
      setScore((prevScore) => prevScore + 1);
      if (score + 1 > hScore) {
        setHScore(score + 1);
      }
      getRandomMove();
      setTwistIt(false);
      setPressIt(false);
      setPullIt(false);
    } else {
      setStarted(false);
      setMove("You Lose");
      setScore(0);
      setTwistIt(false);
      setPressIt(false);
      setPullIt(false);
    }
  };

  const twist = () => {
    if (!started) return;
    setTwistIt(true);
    if (move === "Twist It!") {
      checkAction("Twist It!");
    } else {
      checkAction("");
    }
  };

  const press = () => {
    if (!started) return;
    setPressIt(true);
    if (move === "Press It!") {
      checkAction("Press It!");
    } else {
      checkAction("");
    }
  };

  const pull = () => {
    if (!started) return;
    setPullIt(true);
    if (move === "Pull It!") {
      checkAction("Pull It!");
    } else {
      checkAction("");
    }
  };

  return (
    <div className="App">
      <h4>Score: {score}</h4>
      <h4>High Score: {hScore}</h4>
      <h3>Move: {move}</h3>

      <div className="twist-container">
        <h1 className="twist-h1">Twist It</h1>
        <button className="twist-bar" onClick={twist}>
          twister
        </button>
      </div>
      <div className="center-press">
        <div className="press-container">
          {started ? (
            <button className="press-button" onClick={press}>
              <h1>Press It</h1>
            </button>
          ) : (
            <button className="press-button" onClick={startGame}>
              <h1> Start</h1>
            </button>
          )}
        </div>
      </div>
      <div className="pull-container">
        <h1 className="pull-h1">Pull It</h1>
        <button className="pull-bar" onClick={pull}>
          pull it
        </button>
      </div>
    </div>
  );
}

export default App;

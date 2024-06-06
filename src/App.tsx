import { useState,useEffect } from 'react'
import PressMP3 from "./assets/sound/press-it-effect.mp3";
import PullMP3 from "./assets/sound/pull-effect.mp3";
import TwistMP3 from "./assets/sound/twist-it-effect.mp3";
import TwistIMG from "./assets/twistGear.png";
import PullIMG from "./assets/pulled-1.png";
import PullIMG2 from "./assets/pulled-0.png";
import PressInst from "./assets/sound/Press-it.mp3";
import PullInst from "./assets/sound/Pull-it.mp3";
import TwistInst from "./assets/sound/twist-it.mp3";
import LoseMP3 from "./assets/sound/gameover.mp3";
import './App.css'

function App() {
  const [twistIt, setTwistIt] = useState<boolean>(false);
  const [pressIt, setPressIt] = useState<boolean>(false);
  const [pullIt, setPullIt] = useState<boolean>(false);
  const [pullAni,setPullAni]=useState<any>(PullIMG2);
  const [move, setMove] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [hScore, setHScore] = useState<number>(0);
  const [pressAudio] = useState<any>(new Audio(PressMP3));
  const [pullAudio] = useState<any>(new Audio(PullMP3));
  const [twistAudio] = useState<any>(new Audio(TwistMP3));
  const [pressInsAudio] = useState<any>(new Audio(PressInst));
  const [pullInsAudio] = useState<any>(new Audio(PullInst));
  const [twistInsAudio] = useState<any>(new Audio(TwistInst));
  const [loseAudio] = useState(new Audio(LoseMP3));
  const moves = ["Twist It!", "Press It!", "Pull It!"];


  const pressNoise = (e:number) => {
    if (e === 1) {
      pressAudio.play();
    } else if (e === 2) {
      pullAudio.play();
    } else if (e === 3) {
      twistAudio.play();
    }
  };

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
    if (move === "Press It!") {
      pressInsAudio.play();
    } else if (move === "Pull It!") {
      pullInsAudio.play();
    } else if (move === "Twist It!") {
      twistInsAudio.play();
    }
  };

  const startGame = () => {
    setStarted(true);
    getRandomMove();
    setScore(0);
    setTwistIt(false);
    setPressIt(false);
    setPullIt(false);
    pressNoise(1);
  };

  const checkAction = (action:any) => {
    if (action === move) {
      setScore((prevScore) => prevScore + 1);
      if (score + 1 > hScore) {
        setHScore(score + 1);
      }
      getRandomMove();
      // setTwistIt(false);
      // setPressIt(false);
      // setPullIt(false);
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
    setPressIt(false);
    setPullIt(false);
    pressNoise(3);
    setTwistIt(true);
    if (move === "Twist It!") {
      checkAction("Twist It!");
    } else {
      checkAction("");
    }
  };

  const press = () => {
    if (!started) return;
    setTwistIt(false);
    setPullIt(false);
    setPressIt(true);
    pressNoise(1);
    if (move === "Press It!") {
      checkAction("Press It!");
    } else {
      checkAction("");
    }
  };

  const pull = () => {
    if (!started) return;
     setTwistIt(false);
      setPressIt(false);
    setPullIt(true);
    pressNoise(2);
    setPullAni(PullIMG);
    setTimeout(() => {
      setPullAni(PullIMG2);
    }, 500);
    if (move === "Pull It!") {
      checkAction("Pull It!");
    } else {
      checkAction("");
    }
  };

  useEffect(() => {
    // This code will run every time the `move` state changes, which happens after `getRandomMove` is called.
    if (score) {
      console.log(`New move is: ${move}`);

      // If you want to play the instructional audio based on the move, uncomment the following lines:
      if (move === "Press It!") {
        pressInsAudio.play();
      } else if (move === "Pull It!") {
        pullInsAudio.play();
      } else if (move === "Twist It!") {
        twistInsAudio.play();
      }
    } else if (move) {
      if (move === "You Lose") {
        loseAudio.play();
      }
    }
  }, [score, move]);

  return (
    <div className="App">
   
      <h4>Score: {score}</h4>
      <h4>High Score: {hScore}</h4>
      <h3>Move: {move}</h3>

      <div className="twist-container" >
        <img className={twistIt===true ? "twist-spin" : "twist-img"}    onClick={twist} src={TwistIMG} />
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
        <img className="pull-img"
        //  style={{height: pullIt ? "210px": "150px"}}
         onClick={pull} src={pullAni} />
      </div>
    </div>
  )
}

export default App;

import { useEffect } from 'react'
import Header from './components/Header';
import Spin from "./components/Spin";
import Smash from "./components/Smash";
import Pull from "./components/Pull";
import { usePageContext } from './PageContext';

import SmashInst from "./assets/sound/Press-it.mp3";
import PullInst from "./assets/sound/Pull-it.mp3";
import TwistInst from "./assets/sound/twist-it.mp3";
import LoseMP3 from "./assets/sound/gameover.mp3";
import './App.css'

function Game() {

  const {setPullIt,setSmashIt,setSpinIt,spinIt,smashIt,pullIt,move,setMove,started,setStarted,score,setScore}=usePageContext();

  const smashInsAudio:any = new Audio(SmashInst);
  const pullInsAudio:any = new Audio(PullInst);
  const twistInsAudio:any = new Audio(TwistInst);
  const loseAudio:any = new Audio(LoseMP3);
  
  useEffect(() => {
    if (!started || move === "You Lose") return; 

    const timer = setTimeout(() => {
      if (!spinIt && !smashIt && !pullIt) {
        setStarted(false);
        setMove("You Lose");
        setScore(0);
        setSpinIt(false);
        setSmashIt(false);
        setPullIt(false);
      }
    }, 3000);
    
    return () => clearTimeout(timer); 
  }, [score,started]);
  
  useEffect(() => {
     if (move === "Smash It!") {
       smashInsAudio.play();
     } else if (move === "Pull It!") {
       pullInsAudio.play();
     } else if (move === "Twist It!") {
       twistInsAudio.play();
     }
     else if (move === "You Lose") {
       loseAudio.play();
     }
     
 }, [score, move]);

return (
  <div className="App">
    <Header/>
    <Spin /> 
    <Smash/>
    <Pull /> 
  </div>
  )
}

export default Game;

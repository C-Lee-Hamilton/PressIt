import { useEffect } from 'react'
import Header from './components/Header';
import Spin from "./components/Spin";
import Smash from "./components/Smash";
import Pull from "./components/Pull";
import { usePageContext } from './PageContext';

import SmashInst from "./assets/sound/SmashIt.mp3";
import PullInst from "./assets/sound/PullIt.mp3";
import SpinInst from "./assets/sound/SpinIt.mp3";
import LoseMP3 from "./assets/sound/gameover.mp3";
import './Game.css'

function Game() {

  const {setPullIt,setSmashIt,setSpinIt,spinIt,smashIt,pullIt,move,setMove,started,setStarted,score,setScore}=usePageContext();

  const smashInsAudio:any = new Audio(SmashInst);
  const pullInsAudio:any = new Audio(PullInst);
  const spinInsAudio:any = new Audio(SpinInst);
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
     } else if (move === "Spin It!") {
       spinInsAudio.play();
     }
     else if (move === "You Lose") {
       loseAudio.play();
     }
     
 }, [score, move]);

return (
  <div className="Game">
    <Header/>
   <div className="Game-div">
      <div className="Game-container">
        <Spin /> 
        <Smash/>
        <Pull /> 
      </div>
      </div>
    
   
  </div>
  )
}

export default Game;

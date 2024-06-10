import { useState } from "react";
import SpinIMG from "../assets/images/spinWheel.png";
import SpinSound from "../assets/sound/spinIt-effect.mp3";
import { usePageContext } from "../PageContext";
import "../styles/Spin.css";


    const Spinner: React.FC= () => {
      const {started,move,setSmashIt,setPullIt,setSpinIt,checkAction}=usePageContext();
      const [spinClass,setSpinClass]=useState<string>("spin-img");
      const spinAudio:any = new Audio(SpinSound);
      
      const spinClick = () => {
        if (!started) return;
        setSmashIt(false);
        setPullIt(false);
        spinAudio.volume=.2;
        spinAudio.play();
        setSpinIt(true);
        setSpinClass("spin-animation");
        setTimeout(() => {
          setSpinClass("spin-img");
        }, 500);
        if (move === "Spin It!") {
          checkAction("Spin It!");
        } else {
          checkAction("");
        }
      };

      return (
        <div className="spin-container">
               <img className={spinClass}    onClick={spinClick} src={SpinIMG} />

        
        </div>
      );
    };
    export default Spinner;
    
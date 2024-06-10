import { useState } from "react";
import SpinIMG from "../assets/twistGear.png";
import SpinSound from "../assets/sound/twist-it-effect.mp3";
import { usePageContext } from "../PageContext";



    const Spinner: React.FC= () => {
      const {started,move,setSmashIt,setPullIt,setSpinIt,checkAction}=usePageContext();
      const [spinClass,setSpinClass]=useState<string>("twist-img");
      const spinAudio:any = new Audio(SpinSound);
      const spinAudioTrigger=spinAudio.play;
      const spinClick = () => {
        if (!started) return;
        setSmashIt(false);
        setPullIt(false);
        spinAudioTrigger;
        setSpinIt(true);
        setSpinClass("twist-spin");
        setTimeout(() => {
          setSpinClass("twist-img");
        }, 500);
        if (move === "Twist It!") {
          checkAction("Twist It!");
        } else {
          checkAction("");
        }
      };

      return (
        <div className="twist-container">
               <img className={spinClass}    onClick={spinClick} src={SpinIMG} />

        
        </div>
      );
    };
    export default Spinner;
    
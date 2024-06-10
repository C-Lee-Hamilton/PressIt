import { useState } from "react";
import PullIMG from "../assets/pulled-1.png";
import PullIMG2 from "../assets/pulled-0.png";
import PullSound from "../assets/sound/pull-effect.mp3";
import { usePageContext } from "../PageContext";





    const Pull: React.FC = () => {
        const {started,move,setSmashIt,setPullIt,setSpinIt,checkAction}=usePageContext();
        const pullAudio:any = new Audio(PullSound);
        const [pullImgSrc,setPullImgSrc]=useState<any>(PullIMG2);

        const pull = () => {
            if (!started) return;
             setSpinIt(false);
            setSmashIt(false);
            setPullIt(true);
            pullAudio.volume=.2;
            pullAudio.play();
            setPullImgSrc(PullIMG);
            setTimeout(() => {
              setPullImgSrc(PullIMG2);
            }, 500);
            if (move === "Pull It!") {
              checkAction("Pull It!");
            } else {
              checkAction("");
            }
          };

      return (
        

     <div className="pull-container">
        <img className="pull-img"
         onClick={pull} src={pullImgSrc} />
      </div>
        
      );
    };
    export default Pull;
    
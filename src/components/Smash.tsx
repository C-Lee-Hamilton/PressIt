import SmashSound from "../assets/sound/press-it-effect.mp3";
import { usePageContext } from "../PageContext";



    const Smash: React.FC = () => {
        const {checkAction,setSmashIt,setPullIt,setSpinIt,started,move,startGame}=usePageContext();

        const smashAudio:any = new Audio(SmashSound);
        const smashAudioTrigger=smashAudio.play;
        const press = () => {
            if (!started) return;
            setSpinIt(false);
            setPullIt(false);
            setSmashIt(true);
            smashAudioTrigger;
            if (move === "Smash It!") {
              checkAction("Smash It!");
            } else {
              checkAction("");
            }
          };



        return (
         <div className="center-press">
        <div className="press-container">
           <button className="press-button" onClick={started ? press : startGame}>
              <h1>{started? "Smash It" : "Start"}</h1>
            </button>
       </div>
      </div>
        );
      };
      export default Smash;
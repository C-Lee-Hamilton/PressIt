import SmashSound from "../assets/sound/smashIt-effect.mp3";
import { usePageContext } from "../PageContext";
import "../styles/Smash.css";


    const Smash: React.FC = () => {
        const {checkAction,setSmashIt,setPullIt,setSpinIt,started,move,startGame}=usePageContext();

        const smashAudio:any = new Audio(SmashSound);
       
        const press = () => {
            if (!started) return;
            setSpinIt(false);
            setPullIt(false);
            setSmashIt(true);
            smashAudio.volume=.2;
            smashAudio.play();
            if (move === "Smash It!") {
              checkAction("Smash It!");
            } else {
              checkAction("");
            }
          };

      return (
        <div className="smash-container">
            <div className="button-outline">
              <button className="smash-button" onClick={started ? press : startGame}>
                <h1>{started? "Smash It!" : "START"}</h1>
              </button>
            </div>
        </div>
        );
      };

   export default Smash;
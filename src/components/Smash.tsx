import SmashSound from "../assets/sound/smashIt-effect.mp3";
import { usePageContext } from "../PageContext";



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
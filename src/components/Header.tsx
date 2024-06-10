import { usePageContext } from "../PageContext";

const Header: React.FC = () => {
const {move,score,highScore}=usePageContext();

  return (
    <div className="header">
    <h1>  High Score : {highScore} </h1>
    <h1>{move ? "Move: "+move : "Start"}</h1>
    <h1>Score:{score}</h1>
    </div>
  );
};
export default Header;

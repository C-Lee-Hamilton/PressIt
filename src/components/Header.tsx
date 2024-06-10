import { usePageContext } from "../PageContext";
import Logo from "../assets/images/SmashLogo.png";
import "../styles/Header.css";

const Header: React.FC = () => {
const {move,score,highScore}=usePageContext();

  return (
    <div className="header">
    <div className="header-1">
    <h1 >  High Score: {highScore} </h1>
    <h2 style={{borderTop:"none"}}><img src={Logo} alt="logo"/></h2>
    <h1  style={{justifyContent:"right"}}  >Score: {score}</h1>
    </div>
    <h2 className="header-2">{move ? move : "Press Start"}</h2>
    </div>
  );
};
export default Header;

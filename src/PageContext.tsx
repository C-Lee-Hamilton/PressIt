import React, { createContext, useContext, useState, ReactNode } from "react";

interface PageContextType {
 spinIt:boolean;
 smashIt:boolean;
 pullIt:boolean;
 setSmashIt: React.Dispatch<React.SetStateAction<boolean>>;
 setPullIt: React.Dispatch<React.SetStateAction<boolean>>;
 setSpinIt:React.Dispatch<React.SetStateAction<boolean>>;
 move:string;
 score:number;
 highScore:number;
 setMove:React.Dispatch<React.SetStateAction<string>>;
 setScore:React.Dispatch<React.SetStateAction<number>>;
 setHighScore:React.Dispatch<React.SetStateAction<number>>;
 setStarted:React.Dispatch<React.SetStateAction<boolean>>;
 started:boolean;
 getRandomMove:()=>void;
 checkAction:(action:string)=>void;
 startGame:()=>void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("add PageProvider");
  }
  return context;
};

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
    const [spinIt, setSpinIt] = useState<boolean>(false);
    const [smashIt, setSmashIt] = useState<boolean>(false);
    const [pullIt, setPullIt] = useState<boolean>(false);
    const [move, setMove] = useState<string>("");
    const [started, setStarted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);
    const moves = ["Spin It!", "Smash It!", "Pull It!"];

    const startGame = () => {
        setStarted(true);
        getRandomMove();
      };

    const getRandomMove= () => {
 
        const randomIndex = Math.floor(Math.random() * moves.length);
        setMove(moves[randomIndex]);
        setPullIt(false);
        setSmashIt(false);
        setSpinIt(false);
    
      };

    const checkAction = (action:string) => {
      setTimeout(() => {
        if (action === move) {
          setScore((prevScore) => prevScore + 1);
            if (score + 1 > highScore) {
            setHighScore(score + 1);
          }
          getRandomMove();
        } else {
          setStarted(false);
          setMove("You Lose");
          setScore(0);
          setSpinIt(false);
          setSmashIt(false);
          setPullIt(false);
        }
      }, 500);
      
     };
    

  return (
    <PageContext.Provider
      value={{
       startGame,checkAction,spinIt,setSpinIt,
       smashIt,setSmashIt,pullIt,setPullIt,
       setMove,move,started,setStarted,score,
       setScore,highScore,setHighScore,getRandomMove
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
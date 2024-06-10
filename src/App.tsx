import React from "react";
import { PageProvider } from "./PageContext";
import Game from "./Game";

const App: React.FC = () => {
  return (
    <PageProvider>
      <Game />
    </PageProvider>
  );
};

export default App;
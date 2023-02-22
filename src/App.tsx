import React from "react";
import "./App.css";
import { Application } from "./Component/greet/application/Application";
import { Skills } from "./Component/skills/Skills";
import { Counter } from "./Component/counter/Counter";
import { AppProviders } from "./Component/provider/AppProviders";
import { MuiMode } from "./Component/mui/MuiMode";
import { Users } from "./Component/users/users";

function App() {
  const skills = ["HTML", "CSS", "JAVASCRIPT"];
  return (
    <div className="App">
      {/* <Application/>
     <Skills skills={skills}/> */}
      {/* <Counter/> */}
      {/* <AppProviders>
        <div className="App">
          <MuiMode />
        </div>
      </AppProviders> */}
      <Users/>
    </div>
  );
}

export default App;

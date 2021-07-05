import React from 'react';
import { CombineProviders } from "./ui";
import { RouterBuilder } from "./routes";
import './App.css';
import { Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <CombineProviders>
        <Switch>
          <RouterBuilder />
        </Switch>
      </CombineProviders>
    </div>
  );
}

export default App;

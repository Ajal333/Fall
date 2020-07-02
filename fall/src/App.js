import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import PNF from "./Components/Something";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/404" component={PNF} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

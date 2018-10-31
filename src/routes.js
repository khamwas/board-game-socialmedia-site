import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Quiz from "./components/Quiz/Quiz";
import Game from "./components/Game/Game";
import Gamer from "./components/Gamer/Gamer";
import AllGames from "./components/AllGames/AllGames";
import About from "./components/About/About";

export default (
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/game/:id" component={Game} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/gamer/:id" component={Gamer} />
    <Route path="/allgames" component={AllGames} />
    <Route exact path="/" component={Quiz} />
  </Switch>
);

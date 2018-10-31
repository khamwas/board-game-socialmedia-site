import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import routes from "./routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from "react";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      sensory: null,
      fantasy: null,
      narrative: null,
      challenge: null,
      fellowship: null,
      discovery: null,
      expression: null,
      abnegation: null,
      reviewText: "",
      reviewed: false,
      played: false,
      favorite: false
    };
  }

  render() {
    return <div>GAME</div>;
  }
}

export default Game;

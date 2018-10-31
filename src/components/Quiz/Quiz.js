import React, { Component } from "react";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      sensory: 0,
      fantasy: 0,
      narrative: 0,
      challenge: 0,
      fellowship: 0,
      discovery: 0,
      expression: 0,
      abnegation: 0
    };
  }

  render() {
    return <div>Quiz</div>;
  }
}

export default Quiz;

import React, { Component } from 'react';

class Icon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			abnegation: (
				<img
					className="icon"
					alt="abnegation"
					src="https://s3.us-east-2.amazonaws.com/boardashell/abnegation.svg"
				/>
			),
			challenge: (
				<img
					className="icon"
					alt="challenge"
					src="https://s3.us-east-2.amazonaws.com/boardashell/challenge.svg"
				/>
			),
			expression: (
				<img
					className="icon"
					alt="expression"
					src="https://s3.us-east-2.amazonaws.com/boardashell/expression.svg"
				/>
			),
			discovery: (
				<img
					className="icon"
					alt="discovery"
					src="https://s3.us-east-2.amazonaws.com/boardashell/discovery.svg"
				/>
			),
			fellowship: (
				<img
					className="icon"
					alt="fellowship"
					src="https://s3.us-east-2.amazonaws.com/boardashell/fellowship.svg"
				/>
			),
			fantasy: (
				<img
					className="icon"
					alt="fantasy"
					src="https://s3.us-east-2.amazonaws.com/boardashell/fantasy.svg"
				/>
			),
			sensory: (
				<img
					className="icon"
					alt="sensory"
					src="https://s3.us-east-2.amazonaws.com/boardashell/sensory.svg"
				/>
			),
			narrative: (
				<img
					className="icon"
					alt="narrative"
					src="https://s3.us-east-2.amazonaws.com/boardashell/narrative.svg"
				/>
			)
		};
	}
	render() {
		let icon = this.state[this.props.elem];
		return <div>{icon}</div>;
	}
}

export default Icon;

import React, { Component } from 'react';
import GamerDash from './GamerDash';
import axios from 'axios';

class GamerSuggested extends Component {
	constructor(props) {
		super(props);
		this.state = {
			suggested: []
		};
	}
	componentDidMount() {
		if (this.props.user.length === 1) {
		} else {
		}
	}

	setSuggested() {}
	sharedSuggested() {}

	render() {
		return (
			<div>
				<GamerDash match={this.props.match} />
			</div>
		);
	}
}

export default GamerSuggested;

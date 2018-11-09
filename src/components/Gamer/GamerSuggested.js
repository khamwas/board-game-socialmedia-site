import React, { Component } from 'react';
import GamerDash from './GamerDash';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
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
			this.sharedSuggested();
		}
	}

	sharedSuggested() {
		axios
			.get(`/api/both/suggestions/${this.props.match.params.id}`)
			.then((result) => this.setState({ suggested: result.data }));
	}

	render() {
		let display = this.state.suggested.map((elem, i) => {
			return <GameCard key={elem + i} elem={elem} />;
		});
		return (
			<div>
				<GamerDash match={this.props.match} />
				<div className="gameScreen">{display}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(GamerSuggested);

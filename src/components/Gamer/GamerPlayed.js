import React, { Component } from 'react';
import GamerDash from './GamerDash';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';

class GamerPlayed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			played: []
		};
	}
	componentDidMount() {
		if (this.props.user.length === 1) {
			this.sharedPlayed();
		} else {
			this.setPlayed();
		}
	}

	setPlayed() {
		axios
			.get(`/api/played/${this.props.match.params.id}`)
			.then((result) => this.setState({ played: result.data }));
	}
	sharedPlayed() {
		axios
			.get(`/api/both/played/${this.props.match.params.id}`)
			.then((result) => this.setState({ played: result.data }));
	}

	render() {
		let display = this.state.played.map((elem) => {
			return <GameCard elem={elem} />;
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

export default connect(mapStateToProps)(GamerPlayed);

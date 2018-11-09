import React, { Component } from 'react';
import GamerDash from './GamerDash';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';

class GamerFavs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favs: []
		};
	}
	componentDidMount() {
		if (this.props.user.length === 1) {
			this.sharedFavs();
		} else {
			this.setFavs();
		}
	}

	setFavs() {
		axios
			.get(`/api/favorites/${this.props.match.params.id}`)
			.then((result) => this.setState({ favs: result.data }));
	}
	sharedFavs() {
		axios
			.get(`/api/both/favorites/${this.props.match.params.id}`)
			.then((result) => this.setState({ favs: result.data }));
	}

	render() {
		let display = this.state.favs.map((elem, i) => {
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

export default connect(mapStateToProps)(GamerFavs);

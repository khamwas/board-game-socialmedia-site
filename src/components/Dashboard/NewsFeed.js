import React, { Component } from 'react';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
import Dash from './Dash';
// import GameReview from '../GameReview/GameReview';
import './Dashboard.css';
import '../GameCard/GameCard.css';
import axios from 'axios';

class NewsFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: []
		};
	}
	componentDidMount() {
		axios
			.get('/api/user/newsFeed')
			.then((result) => this.setState({ news: result.data }));
	}

	render() {
		let newsFeed = this.state.news.map((elem) => {
			return <GameCard key={elem.game_id} elem={elem} />;
		});

		return (
			<div>
				<Dash match={this.props.match.path} />
				<div className="gameScreen">{newsFeed}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { games, userFavs } = state;
	return {
		games,
		userFavs
	};
}

export default connect(mapStateToProps)(NewsFeed);

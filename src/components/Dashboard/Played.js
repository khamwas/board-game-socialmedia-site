import React from 'react';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
import Dash from './Dash';
// import GameReview from '../GameReview/GameReview';
import './Dashboard.css';
import '../GameCard/GameCard.css';

function Played(props) {
	let playedGames = props.userPlayed.map((elem) => {
		return <GameCard key={elem.game_id} elem={elem} />;
	});

	return (
		<div>
			<Dash match={props.match.path} />
			<div className="gameScreen">{playedGames}</div>
		</div>
	);
}

function mapStateToProps(state) {
	const { games, userPlayed } = state;
	return {
		games,
		userPlayed
	};
}

export default connect(mapStateToProps)(Played);

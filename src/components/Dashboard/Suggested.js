import React from 'react';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
// import GameReview from '../GameReview/GameReview';
import Dash from '../Dashboard/Dash';
import './Dashboard.css';
import '../GameCard/GameCard.css';

function Suggested(props) {
	let suggestedGames = props.userSuggested.map((elem) => {
		return <GameCard key={elem.game_id} elem={elem} />;
	});

	return (
		<div>
			<Dash match={props.match.path} />
			<div className="gameScreen">{suggestedGames}</div>
		</div>
	);
}

function mapStateToProps(state) {
	const { games, userSuggested } = state;
	return {
		games,
		userSuggested
	};
}

export default connect(mapStateToProps)(Suggested);

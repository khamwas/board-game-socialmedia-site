import React from 'react';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
import Dash from './Dash';
import './Dashboard.css';
import '../GameCard/GameCard.css';

function Favorites(props) {
	let favGames = props.userFavs.map((elem) => {
		return <GameCard key={elem.game_id} elem={elem} />;
	});

	return (
		<div>
			<Dash match={props.match.path} />
			<div className="gameScreen">{favGames}</div>
		</div>
	);
}

function mapStateToProps(state) {
	const { games, userFavs } = state;
	return {
		games,
		userFavs
	};
}

export default connect(mapStateToProps)(Favorites);

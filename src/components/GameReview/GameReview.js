import React from 'react';
import GameRating from '../GameRating/GameRating';
import './GameReview.css';

function GameReview(props) {
	return (
		<div className="reviewCard">
			<h3>{props.elem.handle || props.elem.title.toUpperCase()}</h3>
			<p>{props.elem.review}</p>
			<GameRating elem={props.elem} />
		</div>
	);
}

export default GameReview;

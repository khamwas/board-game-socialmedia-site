import React from 'react';
import './GameCard.css';

function GameCard(props) {
	return (
		<div key={props.elem.game_id} className="gameCardContainer">
			<img
				className="gameScrollImg"
				src={props.elem.img}
				alt={props.elem.title}
			/>
			<div>{props.elem.title.toUpperCase()}</div>
			<div>
				{props.elem.reviews} Review
				{props.elem.reviews > 1 ? 's' : null}
			</div>
		</div>
	);
}

export default GameCard;
